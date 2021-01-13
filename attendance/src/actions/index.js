import auth from "../apis";
import backend from "../apis/index";

export const signIn = () => async (dispatch, formValues) => {
  const response = await backend.post("/api/user/login", formValues);
  dispatch({ type: "SIGN_IN", payload: response.data });
};

export const signOut = () => {};
