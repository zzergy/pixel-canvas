import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ModalStates } from "../types";

const initialModalStates: ModalStates = {
  deleteCanvasModal: false,
  createCanvasModal: false,
  clearCanvasModal: false,
  profileDropdown: false,
};

const modalsReducer = createSlice({
  name: "modalsOpenState",
  initialState: initialModalStates,
  reducers: {
    /**
     * Control the open state of all modals and popups
     * @param state
     * @param action
     * @returns
     */
    setOpenState: (
      state: typeof initialModalStates,
      action: PayloadAction<ModalStates>
    ) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setOpenState } = modalsReducer.actions;

export default modalsReducer.reducer;
