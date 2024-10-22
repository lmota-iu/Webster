import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const CAD_TOOLS_SLICE = 'cadTools';

export const selectedToolEntity = createEntityAdapter<{ id: string }>();

//array of ids
const initialState: { toolSelected: string } = {
  toolSelected: 'select',
};

export const cadToolsSlice = createSlice({
  name: CAD_TOOLS_SLICE,
  initialState,
  reducers: {
    setTool(state, { payload }) {
      state.toolSelected = payload;
    },
  },
});

const cadToolsReducer = cadToolsSlice.reducer;

export const cadToolsActions = cadToolsSlice.actions;
export default cadToolsReducer;
