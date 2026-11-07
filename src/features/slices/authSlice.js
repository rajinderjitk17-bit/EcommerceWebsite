import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(sessionStorage.getItem("authUser")) || {
      name: "",
      password: "",
      authUser: false,
      image: "",
    },
    error: null,
  },
  reducers: {
    login(state, action) {
      const userId = action.payload;

      // Validation checks: 4-10 alphabetic letters for username
      const userValidation = /^[A-Za-z]{4,10}$/i.test(userId.name);
      // Password: 4-10 chars with at least one letter, one number, and one special char
      const passwordValidation = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,10}$/i.test(
        userId.password
      );

      state.user.name = userId.name;
      state.user.password = userId.password;
      state.user.image = userId.image || state.user.image || "";

      if (userValidation && passwordValidation) {
        state.user.authUser = true;
        state.error = null;

        const saveState = JSON.stringify(state.user);
        sessionStorage.setItem("authUser", saveState);
      } else {
        state.user.authUser = false;
        if (!userValidation) {
          state.error = "Username must be 4 to 10 alphabetic characters.";
        } else if (!passwordValidation) {
          state.error =
            "Password must be 4-10 characters and include at least one letter, one number, and one special character (!@#$%^&*).";
        }
      }
    },
    logout(state) {
      state.user = {
        name: "",
        password: "",
        authUser: false,
        image: "",
      };
      state.error = null;
      sessionStorage.clear();
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
});

export const { login, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
