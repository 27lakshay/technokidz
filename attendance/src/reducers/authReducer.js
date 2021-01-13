const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  role: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, [action.payload.id]: action.payload };
    case "SIGN_OUT":
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};
