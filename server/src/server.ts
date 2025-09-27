import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import rateLimit from 'express-rate-limit';

// Import routes
import authRoutes from './routes/auth';
import organizationRoutes from './routes/organizations';
import userRoutes from './routes/users';
import fleetRoutes from './routes/fleet';
import shipmentRoutes from './routes/shipments';
import reportRoutes from './routes/reports';
import dashboardRoutes from './routes/dashboard';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { authenticateToken } from './middleware/auth';

// Import services
import { DatabaseService } from './services/DatabaseService';
import { RedisService } from './services/RedisService';
import { logger } from './utils/logger';

// Load environment variables
config();

const app = express();
const server = createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/organizations', authenticateToken, organizationRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/fleet', authenticateToken, fleetRoutes);
app.use('/api/shipments', authenticateToken, shipmentRoutes);
app.use('/api/reports', authenticateToken, reportRoutes);
app.use('/api/dashboard', authenticateToken, dashboardRoutes);

// Swagger documentation
if (process.env.NODE_ENV !== 'production') {
  const swaggerJSDoc = require('swagger-jsdoc');
  const swaggerUi = require('swagger-ui-express');
  
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'TMS SAAS API',
      version: '1.0.0',
      description: 'Transportation Management System SAAS API Documentation',
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
        description: 'Development server',
      },
    ],
  };

  const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts'],
  };

  const swaggerSpec = swaggerJSDoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// Socket.IO connection handling
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);
  
  socket.on('join-organization', (organizationId: string) => {
    socket.join(`org_${organizationId}`);
    logger.info(`Socket ${socket.id} joined organization ${organizationId}`);
  });

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Initialize services and start server
async function startServer() {
  try {
    // Initialize database connection
    await DatabaseService.initialize();
    logger.info('Database connected successfully');

    // Initialize Redis connection
    await RedisService.initialize();
    logger.info('Redis connected successfully');

    // Start server
    server.listen(PORT, () => {
      logger.info(`TMS SAAS Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
      if (process.env.NODE_ENV !== 'production') {
        logger.info(`API Documentation available at http://localhost:${PORT}/api-docs`);
      }
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
  });
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
  });
});

startServer();

export { io };