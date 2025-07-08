import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';
import { Category } from '@custom-types/common';

export interface MovieState {
  filter: Category;
}

const initialState = {
  filter: Category.NowPlaying,
} satisfies MovieState as MovieState;

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Category>) {
      state.filter = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFilter } = movieSlice.actions;

export const selectFilter = (state: RootState) => state.movie.filter;

export default movieSlice.reducer;
