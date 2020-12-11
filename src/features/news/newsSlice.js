import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api/api';

import { NUMBER_OF_STORIES } from '../../utils/constansts/constants';

export const fetchNews = createAsyncThunk('news/fetchNews', async (id) => {
  const response = await api.getItemById(id);
  return response;
})

export const fetchNewsIds = createAsyncThunk('news/fetchNewsIds', async () => {
  const response = await api.getNewStoriesIds();
  const newStoriesIds = response.slice(0, NUMBER_OF_STORIES);
  return newStoriesIds;
})

const initialState = {
  news: [],
  newsIds: [],
  status: 'idle',
  statusIds: 'idle',
  error: null,
  errorIds: null
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
      state.news = state.news.concat(action.payload);
    },
    [fetchNews.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [fetchNewsIds.pending]: (state, action) => {
      state.statusIds = 'loading';
    },
    [fetchNewsIds.fulfilled]: (state, action) => {
      state.statusIds = 'succeeded';
      state.newsIds = action.payload;
    },
    [fetchNewsIds.rejected]: (state, action) => {
      state.statusIds = 'failed';
      state.errorIds = action.error.message;
    }
  }
})

export default newsSlice.reducer;

export const selectAllNewsIds = state => state.news.newsIds;
export const selectNewsById = (state, newsId) => state.news.news.find(story => story.id === Number(newsId));
export const selectNewsStatus = state => state.news.status;
export const selectNewsError = state => state.news.error;

export const selectNewsIdsStatus = state => state.news.statusIds;
export const selectNewsIdsError = state => state.news.errorIds;
