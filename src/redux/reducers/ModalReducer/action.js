import * as CONSTANTS from "./constants";

export const openModal = () => (dispatch) => {
  dispatch({ type: CONSTANTS.OPEN_MODAL });
};
export const closeModal = () => (dispatch) => {
  console.log("test close modal");
  dispatch({ type: CONSTANTS.CLOSE_MODAL });
};
