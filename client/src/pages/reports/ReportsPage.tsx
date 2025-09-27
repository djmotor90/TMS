import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
} from '@mui/material';
import {
  Assessment,
  Timeline,
  MonetizationOn,
  LocalShipping,
  BarChart,
  PieChart,
} from '@mui/icons-material';

interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ReactElement;
  onGenerate: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ title, description, icon, onGenerate }) => (
  <Card>
    <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
        <Box
          sx={{
            backgroundColor: 'primary.main',
            borderRadius: '50%',
            p: 1,
            color: 'white',
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={onGenerate}>
        Generate Report
      </Button>
    </CardActions>
  </Card>
);

const ReportsPage: React.FC = () => {
  const reports = [
    {
      title: 'Fleet Performance',
      description: 'Analyze vehicle utilization, maintenance costs, and performance metrics.',
      icon: <LocalShipping />,
      onGenerate: () => console.log('Generate Fleet Performance Report'),
    },
    {
      title: 'Financial Summary',
      description: 'Revenue, costs, profit margins, and financial performance analysis.',
      icon: <MonetizationOn />,
      onGenerate: () => console.log('Generate Financial Summary Report'),
    },
    {
      title: 'Shipment Analytics',
      description: 'Shipment trends, delivery performance, and customer satisfaction metrics.',
      icon: <Assessment />,
      onGenerate: () => console.log('Generate Shipment Analytics Report'),
    },
    {
      title: 'Route Efficiency',
      description: 'Route optimization, fuel consumption, and delivery time analysis.',
      icon: <Timeline />,
      onGenerate: () => console.log('Generate Route Efficiency Report'),
    },
    {
      title: 'Driver Performance',
      description: 'Driver productivity, safety records, and performance evaluations.',
      icon: <BarChart />,
      onGenerate: () => console.log('Generate Driver Performance Report'),
    },
    {
      title: 'Customer Analysis',
      description: 'Customer satisfaction, retention rates, and service quality metrics.',
      icon: <PieChart />,
      onGenerate: () => console.log('Generate Customer Analysis Report'),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reports & Analytics
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Generate comprehensive reports to analyze your transportation operations and make data-driven decisions.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {reports.map((report, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <ReportCard {...report} />
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Custom Report Builder
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Create custom reports with specific date ranges, filters, and metrics tailored to your business needs.
        </Typography>
        <Button variant="outlined" disabled>
          Launch Report Builder (Coming Soon)
        </Button>
      </Paper>
    </Box>
  );
};

export default ReportsPage;