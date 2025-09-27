# TMS SAAS - Transportation Management System

A comprehensive, modern Transportation Management System (TMS) built as a Software-as-a-Service (SAAS) platform for multiple organizations.

## 🚀 Features

### Core TMS Functionality
- **Multi-tenant Architecture** - Support for multiple organizations with complete data isolation
- **Fleet Management** - Comprehensive vehicle and driver management
- **Shipment Management** - End-to-end shipment lifecycle tracking
- **Load Planning** - Optimize load assignments and route planning
- **Real-time Tracking** - GPS integration for live shipment tracking
- **Document Management** - Digital document storage and management
- **Billing & Invoicing** - Automated billing and invoice generation

### User Management & Security
- **Role-based Access Control** - Admin, Manager, Dispatcher, Driver, and User roles
- **JWT Authentication** - Secure token-based authentication
- **Organization Isolation** - Complete data separation between organizations
- **Audit Logging** - Comprehensive activity tracking

### Reporting & Analytics
- **Dashboard Analytics** - Real-time business metrics and KPIs
- **Custom Reports** - Flexible report generation
- **Financial Reports** - Revenue, cost, and profitability analysis
- **Performance Metrics** - Fleet utilization and efficiency tracking

### Modern Tech Stack
- **Backend**: Node.js, Express, TypeScript, PostgreSQL, Redis
- **Frontend**: React, TypeScript, Material-UI, Redux Toolkit
- **Database**: PostgreSQL with comprehensive schema design
- **Caching**: Redis for session management and caching
- **Containerization**: Docker with Docker Compose

## 🏗️ Architecture

### Backend Architecture
```
server/
├── src/
│   ├── controllers/     # API route handlers
│   ├── middleware/      # Authentication, validation, error handling
│   ├── models/          # Database models and types
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic and external services
│   ├── database/
│   │   ├── migrations/  # Database schema migrations
│   │   └── seeds/       # Sample data seeds
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions and helpers
```

### Frontend Architecture
```
client/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Common components
│   │   ├── forms/       # Form components
│   │   └── layout/      # Layout components
│   ├── pages/           # Application pages
│   │   ├── auth/        # Authentication pages
│   │   ├── dashboard/   # Dashboard page
│   │   ├── fleet/       # Fleet management pages
│   │   ├── shipments/   # Shipment management pages
│   │   ├── reports/     # Reporting pages
│   │   └── settings/    # Settings pages
│   ├── services/        # API service layer
│   ├── store/           # Redux store and slices
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
```

### Database Schema
The system includes 12+ comprehensive database tables:
- **organizations** - Multi-tenant organization data
- **users** - User accounts with role-based access
- **vehicles** - Fleet vehicle management
- **drivers** - Driver information and certifications
- **customers** - Customer relationship management
- **shipments** - Shipment lifecycle management
- **shipment_locations** - Pickup/delivery location details
- **loads** - Load planning and optimization
- **tracking_events** - Real-time tracking events
- **documents** - Document management system
- **invoices** - Billing and invoicing
- **load_shipments** - Many-to-many relationship for loads and shipments

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- PostgreSQL (if running locally)
- Redis (if running locally)

### Using Docker (Recommended)
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd TMS
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

3. Start the application:
   ```bash
   docker-compose up -d
   ```

4. The application will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Documentation: http://localhost:3001/api-docs

### Manual Setup

#### Backend Setup
```bash
cd server
cp ../.env.example .env
npm install
npm run migrate  # Run database migrations
npm run dev      # Start development server
```

#### Frontend Setup
```bash
cd client
npm install
npm start        # Start React development server
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file based on `.env.example` and configure the following:

- **Database Configuration**: PostgreSQL connection settings
- **Redis Configuration**: Redis connection for caching
- **JWT Configuration**: Secret key and token expiration
- **Email Configuration**: SMTP settings for notifications
- **API Keys**: External service integrations (Google Maps, etc.)

### Database Migrations
The system uses Knex.js for database migrations:
```bash
cd server
npm run migrate        # Run all migrations
npm run migrate:rollback  # Rollback last migration
npm run seed           # Seed sample data
```

## 📱 API Documentation

The API is fully documented using Swagger/OpenAPI 3.0. When running in development mode, visit:
- **API Docs**: http://localhost:3001/api-docs

### Key API Endpoints
- `POST /api/auth/register` - Organization registration
- `POST /api/auth/login` - User authentication
- `GET /api/dashboard/overview` - Dashboard metrics
- `GET /api/fleet/vehicles` - Vehicle management
- `GET /api/fleet/drivers` - Driver management
- `GET /api/shipments` - Shipment management
- `GET /api/reports/summary` - Report generation

## 🔐 Security Features

- **Multi-tenant Data Isolation** - Complete separation of organization data
- **JWT Authentication** - Secure token-based authentication
- **Role-based Access Control** - Granular permission system
- **Input Validation** - Comprehensive request validation
- **Rate Limiting** - API rate limiting to prevent abuse
- **CORS Protection** - Cross-origin request security
- **Helmet.js** - Additional security headers

## 🚀 Deployment

### Production Deployment
1. Set up production environment variables
2. Build the application:
   ```bash
   npm run build
   ```
3. Deploy using Docker:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Environment-specific Configurations
- **Development**: Full debugging, hot reload
- **Staging**: Production-like environment for testing
- **Production**: Optimized builds, security hardening

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Review the API documentation
- Check the troubleshooting guide in the wiki

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Multi-tenant architecture
- ✅ Core TMS functionality
- ✅ User management and authentication
- ✅ Fleet and shipment management
- ✅ Basic reporting and dashboard

### Phase 2 (Upcoming)
- 🚧 Real-time GPS tracking integration
- 🚧 Mobile app for drivers
- 🚧 Advanced route optimization
- 🚧 Customer portal
- 🚧 ELD integration
- 🚧 Advanced reporting and analytics

### Phase 3 (Future)
- 📋 Machine learning for demand forecasting
- 📋 IoT integration for smart fleet management
- 📋 Blockchain for supply chain transparency
- 📋 Advanced AI-powered insights

---

Built with ❤️ for the transportation industry