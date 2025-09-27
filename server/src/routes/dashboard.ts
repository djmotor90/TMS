import { Router } from 'express';
import { DatabaseService } from '../services/DatabaseService';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * /dashboard/overview:
 *   get:
 *     summary: Get dashboard overview data
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 */
router.get('/overview', asyncHandler(async (req: AuthRequest, res) => {
  const db = DatabaseService.getInstance();
  
  // Get various metrics for dashboard
  const [
    totalVehicles,
    availableVehicles,
    totalDrivers,
    availableDrivers,
    activeShipments,
    recentShipments
  ] = await Promise.all([
    db('vehicles').where({ organization_id: req.user!.organizationId }).count('* as count').first(),
    db('vehicles').where({ organization_id: req.user!.organizationId, status: 'available' }).count('* as count').first(),
    db('drivers').where({ organization_id: req.user!.organizationId }).count('* as count').first(),
    db('drivers').where({ organization_id: req.user!.organizationId, status: 'available' }).count('* as count').first(),
    db('shipments').where({ organization_id: req.user!.organizationId, status: 'in_transit' }).count('* as count').first(),
    db('shipments')
      .leftJoin('customers', 'shipments.customer_id', 'customers.id')
      .select('shipments.*', 'customers.name as customer_name')
      .where({ 'shipments.organization_id': req.user!.organizationId })
      .orderBy('shipments.created_at', 'desc')
      .limit(5)
  ]);
  
  res.json({
    success: true,
    data: {
      fleet: {
        totalVehicles: Number(totalVehicles?.count || 0),
        availableVehicles: Number(availableVehicles?.count || 0),
        totalDrivers: Number(totalDrivers?.count || 0),
        availableDrivers: Number(availableDrivers?.count || 0)
      },
      shipments: {
        active: Number(activeShipments?.count || 0),
        recent: recentShipments
      }
    }
  });
}));

export default router;