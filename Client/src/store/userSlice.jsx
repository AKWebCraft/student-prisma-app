import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  username: "",
  email: "",
  password: "",
  image: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, name, username, email, password, image } = action.payload;

      (state.id = id),
        (state.name = name),
        (state.username = username),
        (state.email = email),
        (state.password = password),
        (state.image = image);
    },
    resetUser: (state, action) => {
      state.id = "";
      state.name = "";
      state.username = "";
      state.email = "";
      state.password = "";
      state.image = "";
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
