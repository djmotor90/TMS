import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';

import { fleetService } from '../../services/fleetService';
import { Vehicle, Driver } from '../../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`fleet-tabpanel-${index}`}
      aria-labelledby={`fleet-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'success';
    case 'in_transit':
    case 'on_duty':
    case 'driving':
      return 'primary';
    case 'maintenance':
    case 'off_duty':
      return 'warning';
    case 'out_of_service':
      return 'error';
    default:
      return 'default';
  }
};

const FleetPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const { data: vehiclesData, isLoading: vehiclesLoading, error: vehiclesError } = useQuery(
    'vehicles',
    fleetService.getVehicles
  );

  const { data: driversData, isLoading: driversLoading, error: driversError } = useQuery(
    'drivers',
    fleetService.getDrivers
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (vehiclesLoading || driversLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (vehiclesError || driversError || !vehiclesData?.success || !driversData?.success) {
    return (
      <Alert severity="error">
        Failed to load fleet data. Please try again later.
      </Alert>
    );
  }

  const vehicles: Vehicle[] = vehiclesData.data || [];
  const drivers: Driver[] = driversData.data || [];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Fleet Management
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="fleet tabs">
          <Tab label={`Vehicles (${vehicles.length})`} />
          <Tab label={`Drivers (${drivers.length})`} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {vehicles.length > 0 ? (
          <Grid container spacing={3}>
            {vehicles.map((vehicle) => (
              <Grid item xs={12} md={6} lg={4} key={vehicle.id}>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Typography variant="h6" component="div">
                        {vehicle.vehicleNumber}
                      </Typography>
                      <Chip
                        label={vehicle.status.replace('_', ' ').toUpperCase()}
                        color={getStatusColor(vehicle.status) as any}
                        size="small"
                      />
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                      {vehicle.make} {vehicle.model} {vehicle.year}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>License Plate:</strong> {vehicle.licensePlate}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Type:</strong> {vehicle.vehicleType}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Fuel Type:</strong> {vehicle.fuelType}
                    </Typography>
                    {vehicle.capacityWeight && (
                      <Typography variant="body2" gutterBottom>
                        <strong>Capacity:</strong> {vehicle.capacityWeight} lbs
                      </Typography>
                    )}
                    {vehicle.notes && (
                      <Typography variant="body2" color="text.secondary">
                        {vehicle.notes}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography color="text.secondary">
            No vehicles found. Add some vehicles to get started.
          </Typography>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {drivers.length > 0 ? (
          <Grid container spacing={3}>
            {drivers.map((driver) => (
              <Grid item xs={12} md={6} lg={4} key={driver.id}>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Typography variant="h6" component="div">
                        {driver.firstName} {driver.lastName}
                      </Typography>
                      <Chip
                        label={driver.status.replace('_', ' ').toUpperCase()}
                        color={getStatusColor(driver.status) as any}
                        size="small"
                      />
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                      Code: {driver.driverCode}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Phone:</strong> {driver.phone}
                    </Typography>
                    {driver.email && (
                      <Typography variant="body2" gutterBottom>
                        <strong>Email:</strong> {driver.email}
                      </Typography>
                    )}
                    <Typography variant="body2" gutterBottom>
                      <strong>License:</strong> {driver.licenseNumber} ({driver.licenseClass})
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>License Expires:</strong> {new Date(driver.licenseExpiry).toLocaleDateString()}
                    </Typography>
                    {driver.notes && (
                      <Typography variant="body2" color="text.secondary">
                        {driver.notes}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography color="text.secondary">
            No drivers found. Add some drivers to get started.
          </Typography>
        )}
      </TabPanel>
    </Box>
  );
};

export default FleetPage;