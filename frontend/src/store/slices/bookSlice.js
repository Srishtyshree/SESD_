import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE } from '../../api';

const API_URL = `${API_BASE}/books`;

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const fetchBookReadLink = createAsyncThunk('books/fetchReadLink', async (id) => {
  const token = localStorage.getItem('luminary_token');
  const response = await axios.get(`${API_URL}/${id}/read`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
});

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    currentReadLink: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => { state.loading = true; })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBookReadLink.fulfilled, (state, action) => {
        state.currentReadLink = action.payload.embedUrl;
      });
  }
});

export default bookSlice.reducer;
