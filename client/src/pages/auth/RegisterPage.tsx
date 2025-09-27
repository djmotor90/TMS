import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Grid,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useState } from 'react';

import { authService } from '../../services/authService';
import { RegisterRequest } from '../../types';

const schema = yup.object({
  organizationName: yup.string().required('Organization name is required'),
  domain: yup.string().required('Domain is required').matches(/^[a-zA-Z0-9-]+$/, 'Invalid domain format'),
  adminEmail: yup.string().email('Invalid email').required('Email is required'),
  adminPassword: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
});

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterRequest) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.register(data);
      
      if (response.success) {
        toast.success('Registration successful! Please log in.');
        navigate('/login');
      } else {
        setError(response.error || 'Registration failed');
      }
    } catch (error: any) {
      setError(error.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            TMS SAAS
          </Typography>
          <Typography component="h2" variant="h5" gutterBottom>
            Create Your Organization
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="organizationName"
                  label="Organization Name"
                  error={!!errors.organizationName}
                  helperText={errors.organizationName?.message}
                  {...register('organizationName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="domain"
                  label="Domain (e.g., yourcompany)"
                  error={!!errors.domain}
                  helperText={errors.domain?.message || 'This will be used for your organization URL'}
                  {...register('domain')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  {...register('firstName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  {...register('lastName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="adminEmail"
                  label="Admin Email Address"
                  type="email"
                  error={!!errors.adminEmail}
                  helperText={errors.adminEmail?.message}
                  {...register('adminEmail')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="adminPassword"
                  label="Password"
                  type="password"
                  error={!!errors.adminPassword}
                  helperText={errors.adminPassword?.message}
                  {...register('adminPassword')}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Organization'}
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/login">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;