import { Router } from 'express';
import { DatabaseService } from '../services/DatabaseService';
import { asyncHandler } from '../middleware/errorHandler';
import { authorize, AuthRequest } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * /fleet/vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Fleet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vehicles retrieved successfully
 */
router.get('/vehicles', asyncHandler(async (req: AuthRequest, res) => {
  const db = DatabaseService.getInstance();
  
  const vehicles = await db('vehicles')
    .where({ organization_id: req.user!.organizationId })
    .orderBy('vehicle_number');
  
  res.json({
    success: true,
    data: vehicles
  });
}));

/**
 * @swagger
 * /fleet/drivers:
 *   get:
 *     summary: Get all drivers
 *     tags: [Fleet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Drivers retrieved successfully
 */
router.get('/drivers', asyncHandler(async (req: AuthRequest, res) => {
  const db = DatabaseService.getInstance();
  
  const drivers = await db('drivers')
    .where({ organization_id: req.user!.organizationId })
    .orderBy('driver_code');
  
  res.json({
    success: true,
    data: drivers
  });
}));

export default router;