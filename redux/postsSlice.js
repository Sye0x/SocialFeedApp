import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPostsApi } from '../api/postApi';

const initialState = {
  posts: [],
  loading: false,
  error: null,
  likedPostIds: [],
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchPostsApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        error?.message || 'Failed to fetch posts. Please try again.',
      );
    }
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const postId = action.payload;
      const alreadyLiked = state.likedPostIds.includes(postId);

      if (alreadyLiked) {
        state.likedPostIds = state.likedPostIds.filter(id => id !== postId);
      } else {
        state.likedPostIds.push(postId);
      }
    },
    setLikedPosts: (state, action) => {
      state.likedPostIds = action.payload || [];
    },
    clearPostsState: state => {
      state.posts = [];
      state.loading = false;
      state.error = null;
      state.likedPostIds = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { toggleLike, setLikedPosts, clearPostsState } =
  postsSlice.actions;

export default postsSlice.reducer;
