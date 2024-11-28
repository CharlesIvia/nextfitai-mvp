// store/slices/uploadSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UploadStep = "idle" | "getting_url" | "uploading" | "processing" | "complete" | "error";

interface UploadState {
  step: UploadStep;
  progress: number;
  error: string | null;
  fileId: string | null;
}

const initialState: UploadState = {
  step: "idle",
  progress: 0,
  error: null,
  fileId: null,
};

export const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    setUploadStep: (state, action: PayloadAction<UploadStep>) => {
      state.step = action.payload;
      // Update progress based on step
      switch (action.payload) {
        case "getting_url":
          state.progress = 25;
          break;
        case "uploading":
          state.progress = 50;
          break;
        case "processing":
          state.progress = 75;
          break;
        case "complete":
          state.progress = 100;
          break;
        default:
          state.progress = 0;
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.step = "error";
    },
    setFileId: (state, action: PayloadAction<string>) => {
      state.fileId = action.payload;
    },
    resetUpload: (state) => {
      return initialState;
    },
  },
});

export const { setUploadStep, setError, setFileId, resetUpload } = uploadSlice.actions;
export default uploadSlice.reducer;
