import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../api/api';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await api.getNewStoriesIds();
  const newStoriesIds = response.slice(0, 10);
  const news = [];
  for (let id of newStoriesIds) {
    const response = await api.getNewsById(id);
    news.push(response);
  }
  return news;
})

const initialState = {
  news: [],
  status: 'idle',
  error: null,
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchNews.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchNews.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.news = action.payload;
    },
    [fetchNews.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
})

export default newsSlice.reducer;

export const selectAllNews = state => state.news.news;
export const selectNewsById = (state, newsId) => state.news.news.find(story => story.id === Number(newsId));
export const selectNewsStatus = state => state.news.status;
export const selectNewsError = state => state.news.error;
