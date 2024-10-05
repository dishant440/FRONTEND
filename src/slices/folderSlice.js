// folderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllFolders = createAsyncThunk('folder/fetchAllFolders', async () => {
  const response = await axios.get('http://192.168.29.65:7000/api/allContent');
  return response.data.Folders;
});

export const fetchFolderContent = createAsyncThunk('folder/fetchFolderContent', async (folderId) => {
  const response = await axios.get(`http://192.168.29.65:7000/api/content/${folderId}`);
  return response.data; // Assuming you return the content in the expected format
});

export const createFolder = createAsyncThunk('folder/createFolder', async (folderData) => {
  const response = await axios.post('http://192.168.29.65:7000/api/createFolder', folderData);
  return response.data; // Adjust based on your API response
});

export const deleteFolder = createAsyncThunk('folder/deleteFolder', async (folderId) => {
  await axios.delete(`http://192.168.29.65:7000/api/deleteFolder/${folderId}`);
  return folderId; // Return the id to remove it from the state
});

const folderSlice = createSlice({
  name: 'folder',
  initialState: {
    folders: [],
    currentFolderContent: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFolders.fulfilled, (state, action) => {
        state.folders = action.payload;
      })
      .addCase(fetchFolderContent.fulfilled, (state, action) => {
        state.currentFolderContent = action.payload; // Make sure it matches your data structure
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.folders.push(action.payload);
      })
      .addCase(deleteFolder.fulfilled, (state, action) => {
        state.folders = state.folders.filter(folder => folder._id !== action.payload);
      });
  },
});

export const { } = folderSlice.actions;

export default folderSlice.reducer;
