import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api/api';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await api.getNewStoriesIds();
  const newStoriesIds = response;
  const news = [];
  for (let id of newStoriesIds) {
    const response = await api.getItemById(id);
    news.push(response);
  }
  return news;
})

export const fetchRootComments = createAsyncThunk('news/fetchRootComments', async (ids) => {
  const map = {};
  for (const id of ids) {
    const response = await api.getItemById(id);
    map[id] = response;
  }
  return map
})

const initialState = {
  news: [],
  comments: {},
  status: 'idle',
  statusRootComments: 'idle',
  error: null,
  errorRootComments: null
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
    },
    [fetchRootComments.pending]: (state, action) => {
      state.statusRootComments = 'loading';
    },
    [fetchRootComments.fulfilled]: (state, action) => {
      state.statusRootComments = 'succeeded';
      const newComments = action.payload;
      const keysNewComments = Object.keys(newComments);
      const keysStateComments = Object.keys(state.comments);
      keysNewComments.forEach((key) => {
        state.comments[key] = newComments[key];
      })
    },
    [fetchRootComments.rejected]: (state, action) => {
      state.statusRootComments = 'failed';
      state.errorRootComments = action.error.message;
    }
  }
})

export default newsSlice.reducer;

export const selectAllNews = state => state.news.news;
export const selectNewsById = (state, newsId) => state.news.news.find(story => story.id === Number(newsId));
export const selectNewsStatus = state => state.news.status;
export const selectNewsError = state => state.news.error;

export const selectAllRootComments = state => state.news.comments;
export const selectRootCommentsStatus = state => state.news.statusRootComments;
export const selectRootCommentsError = state => state.news.errorRootComments;

