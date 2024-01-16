import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  openSidenav: boolean;
}

const initialState: CounterState = {
  value: 0,
  openSidenav: false,
};

export const mainSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      console.log({ state });
      state.openSidenav = !state.openSidenav;
    },
    openSidebar: (state) => {
      state.openSidenav = true;
    },
    closeSidebar: (state) => {
      state.openSidenav = false;
    },

    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { openSidebar, closeSidebar, toggleSidebar } = mainSlice.actions;

export const { increment, decrement, incrementByAmount } = mainSlice.actions;

export default mainSlice.reducer;
