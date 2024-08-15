const email = localStorage.getItem("email");
const DEFAULT_STATE = {
  email: email,
  isAuthenticated: !!email,
};
export const authReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        email: action.email,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return { ...state, email: null, isAuthenticated: false };
    case "CHECK_AUTH_STATUS":
      return {
        ...state,
        isAuthenticated: state.email ? true : false,
      };
    default:
      return state;
  }
};
