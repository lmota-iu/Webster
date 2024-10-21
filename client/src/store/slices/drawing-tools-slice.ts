import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const DRAWING_TOOL_OBJECT_SLICE = 'drawingTool';

export const selectedObjectEntity = createEntityAdapter<{ id: string }>();

//array of ids
const initialState: { tool: string } = {
  tool: 'select',
};

export const drawingToolObjectSlice = createSlice({
  name: DRAWING_TOOL_OBJECT_SLICE,
  initialState,
  reducers: {
    setTool(state, { payload }) {
      state.tool = payload;
    },
  },
});

const drawingToolObjectReducer = drawingToolObjectSlice.reducer;

export const selectedObjectActions = drawingToolObjectSlice.actions;
export default drawingToolObjectReducer;
