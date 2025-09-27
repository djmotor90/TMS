import React from 'react';
import { useQuery } from 'react-query';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  LocalShipping,
  Person,
  Assignment,
  TrendingUp,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import { dashboardService } from '../../services/dashboardService';

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ReactElement;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color }) => (
  <Card>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography color="textSecondary" gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography variant="h4" component="h2">
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: color,
            borderRadius: '50%',
            p: 2,
            color: 'white',
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const DashboardPage: React.FC = () => {
  const { data, isLoading, error } = useQuery(
    'dashboard-overview',
    dashboardService.getOverview
  );

  if (isLoading) {
    return (
      <Box display="flex" justify="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !data?.success) {
    return (
      <Alert severity="error">
        Failed to load dashboard data. Please try again later.
      </Alert>
    );
  }

  const dashboardData = data.data;

  // Sample data for charts
  const chartData = [
    { name: 'Jan', shipments: 65, revenue: 28000 },
    { name: 'Feb', shipments: 59, revenue: 32000 },
    { name: 'Mar', shipments: 80, revenue: 45000 },
    { name: 'Apr', shipments: 81, revenue: 48000 },
    { name: 'May', shipments: 56, revenue: 35000 },
    { name: 'Jun', shipments: 55, revenue: 38000 },
  ];

  const pieData = [
    { name: 'Delivered', value: 400, color: '#4caf50' },
    { name: 'In Transit', value: 300, color: '#2196f3' },
    { name: 'Pending', value: 200, color: '#ff9800' },
    { name: 'Cancelled', value: 100, color: '#f44336' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Vehicles"
            value={dashboardData.fleet.totalVehicles}
            icon={<LocalShipping />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Available Vehicles"
            value={dashboardData.fleet.availableVehicles}
            icon={<LocalShipping />}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Drivers"
            value={dashboardData.fleet.totalDrivers}
            icon={<Person />}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Active Shipments"
            value={dashboardData.shipments.active}
            icon={<Assignment />}
            color="#9c27b0"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Shipments & Revenue
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="shipments" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipment Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Shipments */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recent Shipments
        </Typography>
        <Box sx={{ overflow: 'auto' }}>
          {dashboardData.shipments.recent.length > 0 ? (
            <Grid container spacing={2}>
              {dashboardData.shipments.recent.map((shipment) => (
                <Grid item xs={12} md={6} key={shipment.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {shipment.shipmentNumber}
                      </Typography>
                      <Typography color="text.secondary" gutterBottom>
                        {shipment.customerName}
                      </Typography>
                      <Typography variant="body2">
                        Status: <strong>{shipment.status.replace('_', ' ').toUpperCase()}</strong>
                      </Typography>
                      <Typography variant="body2">
                        Service: {shipment.serviceType}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography color="text.secondary">
              No recent shipments found.
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default DashboardPage;