import { Router } from 'express';
import { DatabaseService } from '../services/DatabaseService';
import { asyncHandler } from '../middleware/errorHandler';
import { authorize, AuthRequest } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * /organizations/profile:
 *   get:
 *     summary: Get organization profile
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Organization profile retrieved successfully
 */
router.get('/profile', asyncHandler(async (req: AuthRequest, res) => {
  const db = DatabaseService.getInstance();
  
  const organization = await db('organizations')
    .where({ id: req.user!.organizationId })
    .first();
  
  if (!organization) {
    return res.status(404).json({ error: 'Organization not found' });
  }
  
  res.json({
    success: true,
    data: organization
  });
}));

/**
 * @swagger
 * /organizations/profile:
 *   put:
 *     summary: Update organization profile
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               contact_email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               postal_code:
 *                 type: string
 *               country:
 *                 type: string
 *               timezone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Organization updated successfully
 */
router.put('/profile', authorize(['admin', 'manager']), asyncHandler(async (req: AuthRequest, res) => {
  const db = DatabaseService.getInstance();
  
  const allowedFields = [
    'name', 'description', 'contact_email', 'phone', 'address',
    'city', 'state', 'postal_code', 'country', 'timezone'
  ];
  
  const updateData: any = {};
  Object.keys(req.body).forEach(key => {
    if (allowedFields.includes(key)) {
      updateData[key] = req.body[key];
    }
  });
  
  updateData.updated_at = new Date();
  
  const [updated] = await db('organizations')
    .where({ id: req.user!.organizationId })
    .update(updateData)
    .returning('*');
  
  res.json({
    success: true,
    message: 'Organization updated successfully',
    data: updated
  });
}));

/**
 * @swagger
 * /organizations/settings:
 *   get:
 *     summary: Get organization settings
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Organization settings retrieved successfully
 */
router.get('/settings', authorize(['admin']), asyncHandler(async (req: AuthRequest, res) => {
  const db = DatabaseService.getInstance();
  
  const organization = await db('organizations')
    .select('settings')
    .where({ id: req.user!.organizationId })
    .first();
  
  res.json({
    success: true,
    data: organization?.settings || {}
  });
}));

/**
 * @swagger
 * /organizations/settings:
 *   put:
 *     summary: Update organization settings
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Settings updated successfully
 */
router.put('/settings', authorize(['admin']), asyncHandler(async (req: AuthRequest, res) => {
  const db = DatabaseService.getInstance();
  
  await db('organizations')
    .where({ id: req.user!.organizationId })
    .update({ 
      settings: req.body,
      updated_at: new Date()
    });
  
  res.json({
    success: true,
    message: 'Settings updated successfully'
  });
}));

export default router;