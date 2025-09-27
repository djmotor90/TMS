import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DatabaseService } from '../services/DatabaseService';
import { asyncHandler } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new organization and admin user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - organizationName
 *               - domain
 *               - adminEmail
 *               - adminPassword
 *               - firstName
 *               - lastName
 *             properties:
 *               organizationName:
 *                 type: string
 *               domain:
 *                 type: string
 *               adminEmail:
 *                 type: string
 *               adminPassword:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Organization and admin user created successfully
 *       400:
 *         description: Invalid input or domain already exists
 */
router.post('/register', asyncHandler(async (req, res) => {
  const { organizationName, domain, adminEmail, adminPassword, firstName, lastName } = req.body;
  
  const db = DatabaseService.getInstance();
  
  // Check if domain already exists
  const existingOrg = await db('organizations').where({ domain }).first();
  if (existingOrg) {
    return res.status(400).json({ error: 'Domain already exists' });
  }
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(adminPassword, salt);
  
  // Create organization and admin user in transaction
  const result = await db.transaction(async (trx) => {
    // Create organization
    const [organization] = await trx('organizations').insert({
      name: organizationName,
      domain,
      contact_email: adminEmail,
      subscription_plan: 'trial'
    }).returning('*');
    
    // Create admin user
    const [user] = await trx('users').insert({
      organization_id: organization.id,
      email: adminEmail,
      password_hash: passwordHash,
      first_name: firstName,
      last_name: lastName,
      role: 'admin',
      email_verified: true,
      is_active: true
    }).returning('*');
    
    return { organization, user };
  });
  
  logger.info(`New organization registered: ${organizationName} (${domain})`);
  
  res.status(201).json({
    success: true,
    message: 'Organization registered successfully',
    data: {
      organization: {
        id: result.organization.id,
        name: result.organization.name,
        domain: result.organization.domain
      },
      user: {
        id: result.user.id,
        email: result.user.email,
        firstName: result.user.first_name,
        lastName: result.user.last_name,
        role: result.user.role
      }
    }
  });
}));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const db = DatabaseService.getInstance();
  
  // Find user with organization details
  const user = await db('users')
    .join('organizations', 'users.organization_id', 'organizations.id')
    .select('users.*', 'organizations.name as organization_name', 'organizations.domain')
    .where({ 'users.email': email, 'users.is_active': true, 'organizations.is_active': true })
    .first();
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Check password
  const isValidPassword = await bcrypt.compare(password, user.password_hash);
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Update last login
  await db('users').where({ id: user.id }).update({ last_login: new Date() });
  
  // Generate JWT token
  const token = jwt.sign(
    { 
      userId: user.id,
      organizationId: user.organization_id,
      role: user.role 
    },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
  
  logger.info(`User logged in: ${email}`);
  
  res.json({
    success: true,
    data: {
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        organizationId: user.organization_id,
        organizationName: user.organization_name,
        domain: user.domain
      }
    }
  });
}));

export default router;