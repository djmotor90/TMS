import { Router } from 'express';
import { DatabaseService } from '../services/DatabaseService';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * /shipments:
 *   get:
 *     summary: Get all shipments
 *     tags: [Shipments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Shipments retrieved successfully
 */
router.get('/', asyncHandler(async (req: AuthRequest, res) => {
  const db = DatabaseService.getInstance();
  
  const shipments = await db('shipments')
    .leftJoin('customers', 'shipments.customer_id', 'customers.id')
    .select(
      'shipments.*',
      'customers.name as customer_name'
    )
    .where({ 'shipments.organization_id': req.user!.organizationId })
    .orderBy('shipments.created_at', 'desc');
  
  res.json({
    success: true,
    data: shipments
  });
}));

export default router;