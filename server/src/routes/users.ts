import { Router } from 'express';
import { DatabaseService } from '../services/DatabaseService';
import { asyncHandler } from '../middleware/errorHandler';
import { authorize, AuthRequest } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users in organization
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 */
router.get('/', authorize(['admin', 'manager']), asyncHandler(async (req: AuthRequest, res) => {
  const db = DatabaseService.getInstance();
  const { page = 1, limit = 10, role, search } = req.query;
  
  let query = db('users')
    .where({ organization_id: req.user!.organizationId })
    .select('id', 'email', 'first_name', 'last_name', 'phone', 'role', 'is_active', 'last_login', 'created_at');
  
  if (role) {
    query = query.where({ role });
  }
  
  if (search) {
    query = query.where(function() {
      this.where('first_name', 'ilike', `%${search}%`)
          .orWhere('last_name', 'ilike', `%${search}%`)
          .orWhere('email', 'ilike', `%${search}%`);
    });
  }
  
  const offset = (Number(page) - 1) * Number(limit);
  const users = await query.limit(Number(limit)).offset(offset).orderBy('created_at', 'desc');
  
  const total = await db('users')
    .where({ organization_id: req.user!.organizationId })
    .count('* as count')
    .first();
  
  res.json({
    success: true,
    data: users,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: Number(total?.count || 0),
      pages: Math.ceil(Number(total?.count || 0) / Number(limit))
    }
  });
}));

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 */
router.get('/profile', asyncHandler(async (req: AuthRequest, res) => {
  const db = DatabaseService.getInstance();
  
  const user = await db('users')
    .select('id', 'email', 'first_name', 'last_name', 'phone', 'role', 'permissions', 'last_login', 'created_at')
    .where({ id: req.user!.id })
    .first();
  
  res.json({
    success: true,
    data: user
  });
}));

export default router;