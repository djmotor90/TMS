import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
} from '@mui/material';

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = React.useState({
    emailNotifications: true,
    smsNotifications: false,
    realTimeTracking: true,
    autoDispatch: false,
    maintenanceReminders: true,
    customerPortal: true,
  });

  const handleSettingChange = (setting: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({
      ...prev,
      [setting]: event.target.checked,
    }));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Organization Profile
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Manage your organization's basic information and contact details.
              </Typography>
              <Button variant="outlined" fullWidth>
                Edit Organization Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Management
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Manage users, roles, and permissions within your organization.
              </Typography>
              <Button variant="outlined" fullWidth>
                Manage Users
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Notification Settings
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive important updates via email"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      onChange={handleSettingChange('emailNotifications')}
                      checked={settings.emailNotifications}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="SMS Notifications"
                    secondary="Receive urgent alerts via SMS"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      onChange={handleSettingChange('smsNotifications')}
                      checked={settings.smsNotifications}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Real-time Tracking"
                    secondary="Enable GPS tracking for vehicles"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      onChange={handleSettingChange('realTimeTracking')}
                      checked={settings.realTimeTracking}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Auto Dispatch"
                    secondary="Automatically assign shipments to available drivers"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      onChange={handleSettingChange('autoDispatch')}
                      checked={settings.autoDispatch}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Maintenance Reminders"
                    secondary="Get notified about vehicle maintenance schedules"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      onChange={handleSettingChange('maintenanceReminders')}
                      checked={settings.maintenanceReminders}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Customer Portal"
                    secondary="Allow customers to track their shipments online"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      onChange={handleSettingChange('customerPortal')}
                      checked={settings.customerPortal}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Integrations
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Connect with third-party services and APIs.
              </Typography>
              <Button variant="outlined" fullWidth disabled>
                Manage Integrations (Coming Soon)
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Billing & Subscription
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Manage your subscription plan and billing information.
              </Typography>
              <Button variant="outlined" fullWidth disabled>
                View Billing (Coming Soon)
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage;