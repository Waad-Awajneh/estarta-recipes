import * as CONSTANTS from "./constants";

export const openModal = () => (dispatch) => {
  dispatch({ type: CONSTANTS.OPEN_MODAL });
};
export const closeModal = () => (dispatch) => {
  dispatch({ type: CONSTANTS.CLOSE_MODAL });
};
