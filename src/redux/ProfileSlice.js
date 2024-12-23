import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileData: {
      name: "user",
      username: "",
      email: "",
      profileImage: "", // Include profileImage
    },
    isEditing: false,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profileData = action.payload;
    },
    toggleEditMode: (state) => {
      state.isEditing = !state.isEditing;
    },
    updateProfile: (state, action) => {
      state.profileData = { ...state.profileData, ...action.payload };
    },
  },

});

export const { setProfile, toggleEditMode, updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
