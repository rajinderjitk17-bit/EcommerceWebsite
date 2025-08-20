// import { createSlice } from "@reduxjs/toolkit";

// export const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: JSON.parse(sessionStorage.getItem("authUser")) || {
//       name: "",
//       password: "",
//       authUser: false,
//     },
//   },
//   reducers: {
//     login(state, action) {
//       const userId = action.payload;

//       // Validation checks
//       const userValidation = /^[A-Za-z]{4,10}$/i.test(userId.name);
//       const passwordValidation = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,10}$/i.test(userId.password);

//       // Ensure we mutate the state correctly
//       state.user.name = userId.name;
//       state.user.password = userId.password;

//       // If both validations pass
//       if (userValidation && passwordValidation) {
//         state.user.authUser = true;

//         // Save valid user state to sessionStorage
//         const saveState = JSON.stringify(state.user);
//         sessionStorage.setItem("authUser", saveState);
//         console.log("User is authenticated:", state.user);
//       } else {
//         // If validations fail, reset the `authUser` flag
//         state.user.authUser = false;
//         console.log("Validation failed. User is not authenticated.");
//       }
//     },
//     logout(state) {
//       // Reset user state on logout
//       state.user = {
//         name: "",
//         password: "",
//         authUser: false,
//       };

//       // Clear sessionStorage
//       sessionStorage.clear();
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(sessionStorage.getItem("authUser")) || {
      name: "",
      password: "",
      authUser: false,
    },
  },
  reducers: {
    login(state, action) {
      const userId = action.payload;

      // Validation checks
      const userValidation = /^[A-Za-z]{4,10}$/i.test(userId.name);
      const passwordValidation = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,10}$/i.test(userId.password);

      // Update the state
      state.user.name = userId.name;
      state.user.password = userId.password;

      if (userValidation && passwordValidation) {
        state.user.authUser = true;

        // Save valid user state to sessionStorage
        const saveState = JSON.stringify(state.user);
        sessionStorage.setItem("authUser", saveState);
        alert("Login successful!"); // Success alert
      } else {
        state.user.authUser = false;

        // Validation error alerts
        if (!userValidation) {
          alert("Username must be 4-10 alphabetic characters.");
        }
        if (!passwordValidation) {
          alert("Password must be 4-10 characters long and include at least one number, one letter, and one special character.");
        }
      }
    },
    logout(state) {
      // Reset user state on logout
      state.user = {
        name: "",
        password: "",
        authUser: false,
      };

      // Clear sessionStorage
      sessionStorage.clear();
      alert("You have logged out successfully."); // Logout feedback
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
