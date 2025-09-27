import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Organization } from '../../types';

interface OrganizationState {
  organization: Organization | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrganizationState = {
  organization: null,
  loading: false,
  error: null,
};

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    setOrganization: (state, action: PayloadAction<Organization>) => {
      state.organization = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setOrganization,
  setLoading,
  setError,
  clearError,
} = organizationSlice.actions;

export default organizationSlice.reducer;