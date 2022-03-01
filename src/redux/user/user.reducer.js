const INIT_STATE = {
  currentUser: null,
};

const userReducer = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case "SET_CURRENT_USER":
      return { ...state, currentUser: payload };

    default:
      return state;
  }
};

export default userReducer;
