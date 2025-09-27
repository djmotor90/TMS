import { Router } from 'express';
import { DatabaseService } from '../services/DatabaseService';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * /reports/summary:
 *   get:
 *     summary: Get summary reports
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary reports retrieved successfully
 */
router.get('/summary', asyncHandler(async (req: AuthRequest, res) => {
  const db = DatabaseService.getInstance();
  
  // Get basic counts and metrics
  const [
    vehicleCount,
    driverCount,
    shipmentCount,
    customerCount
  ] = await Promise.all([
    db('vehicles').where({ organization_id: req.user!.organizationId }).count('* as count').first(),
    db('drivers').where({ organization_id: req.user!.organizationId }).count('* as count').first(),
    db('shipments').where({ organization_id: req.user!.organizationId }).count('* as count').first(),
    db('customers').where({ organization_id: req.user!.organizationId }).count('* as count').first()
  ]);
  
  res.json({
    success: true,
    data: {
      vehicles: Number(vehicleCount?.count || 0),
      drivers: Number(driverCount?.count || 0),
      shipments: Number(shipmentCount?.count || 0),
      customers: Number(customerCount?.count || 0)
    }
  });
}));

export default router;