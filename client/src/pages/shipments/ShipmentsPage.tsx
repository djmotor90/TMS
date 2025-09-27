import React from 'react';
import { useQuery } from 'react-query';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import { shipmentsService } from '../../services/shipmentsService';
import { Shipment } from '../../types';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'success';
    case 'in_transit':
      return 'primary';
    case 'assigned':
      return 'info';
    case 'pending':
      return 'warning';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

const ShipmentsPage: React.FC = () => {
  const { data, isLoading, error } = useQuery(
    'shipments',
    shipmentsService.getShipments
  );

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data?.success) {
    return (
      <Alert severity="error">
        Failed to load shipments. Please try again later.
      </Alert>
    );
  }

  const shipments: Shipment[] = data.data || [];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Shipments
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            // TODO: Implement add shipment functionality
            console.log('Add shipment clicked');
          }}
        >
          Add Shipment
        </Button>
      </Box>

      {shipments.length > 0 ? (
        <Grid container spacing={3}>
          {shipments.map((shipment) => (
            <Grid item xs={12} md={6} lg={4} key={shipment.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" component="div">
                      {shipment.shipmentNumber}
                    </Typography>
                    <Chip
                      label={shipment.status.replace('_', ' ').toUpperCase()}
                      color={getStatusColor(shipment.status) as any}
                      size="small"
                    />
                  </Box>
                  <Typography color="text.secondary" gutterBottom>
                    {shipment.customerName}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Service Type:</strong> {shipment.serviceType}
                  </Typography>
                  {shipment.poNumber && (
                    <Typography variant="body2" gutterBottom>
                      <strong>PO Number:</strong> {shipment.poNumber}
                    </Typography>
                  )}
                  {shipment.totalWeight && (
                    <Typography variant="body2" gutterBottom>
                      <strong>Weight:</strong> {shipment.totalWeight} lbs
                    </Typography>
                  )}
                  {shipment.totalPieces && (
                    <Typography variant="body2" gutterBottom>
                      <strong>Pieces:</strong> {shipment.totalPieces}
                    </Typography>
                  )}
                  {shipment.requestedPickupDate && (
                    <Typography variant="body2" gutterBottom>
                      <strong>Pickup Date:</strong> {new Date(shipment.requestedPickupDate).toLocaleDateString()}
                    </Typography>
                  )}
                  {shipment.requestedDeliveryDate && (
                    <Typography variant="body2" gutterBottom>
                      <strong>Delivery Date:</strong> {new Date(shipment.requestedDeliveryDate).toLocaleDateString()}
                    </Typography>
                  )}
                  {shipment.totalAmount && (
                    <Typography variant="body2" gutterBottom>
                      <strong>Total Amount:</strong> ${shipment.totalAmount}
                    </Typography>
                  )}
                  {shipment.hazmat && (
                    <Chip
                      label="HAZMAT"
                      color="error"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  )}
                  {shipment.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {shipment.description}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert severity="info">
          No shipments found. Create your first shipment to get started.
        </Alert>
      )}
    </Box>
  );
};

export default ShipmentsPage;