// redux/slices/userSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../api/axios"; // axios instance
import type{ IUser, UserState } from "./user.types";

// GET user by ID
export const fetchUserById = createAsyncThunk(
  "user/fetchById",
  async (id: string) => {
    const res = await API.get(`/users/${id}`);
    return res.data;
  }
);

// GET user by email
export const fetchUserByEmail = createAsyncThunk(
  "user/fetchByEmail",
  async (email: string) => {
    const res = await API.get(`/users?email=${email}`);
    return res.data;
  }
);

// CREATE user
export const createUser = createAsyncThunk(
  "user/create",
  async (data: Partial<IUser>) => {
    const res = await API.post(`/users`, data);
    return res.data;
  }
);

// UPDATE user
export const updateUser = createAsyncThunk(
  "user/update",
  async ({ id, data }: { id: string; data: Partial<IUser> }) => {
    const res = await API.put(`/users/${id}`, data);
    return res.data;
  }
);

// DELETE user
export const deleteUser = createAsyncThunk(
  "user/delete",
  async (id: string) => {
    await API.delete(`/users/${id}`);
    return id;
  }
);

// PROMOTE user
export const promoteUser = createAsyncThunk(
  "user/promote",
  async (id: string) => {
    const res = await API.patch(`/users/${id}/promote`);
    return res.data;
  }
);

// DEMOTE user
export const demoteUser = createAsyncThunk(
  "user/demote",
  async (id: string) => {
    const res = await API.patch(`/users/${id}/demote`);
    return res.data;
  }
);

const initialState: UserState = {
  user: null,
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add common handlers like pending, fulfilled, rejected
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user";
      })

      .addCase(fetchUserByEmail.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const idx = state.users.findIndex(u => u._id === action.payload._id);
        if (idx !== -1) state.users[idx] = action.payload;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(u => u._id !== action.payload);
      })

      .addCase(promoteUser.fulfilled, (state, action) => {
        const idx = state.users.findIndex(u => u._id === action.payload._id);
        if (idx !== -1) state.users[idx] = action.payload;
      })

      .addCase(demoteUser.fulfilled, (state, action) => {
        const idx = state.users.findIndex(u => u._id === action.payload._id);
        if (idx !== -1) state.users[idx] = action.payload;
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
