import * as CONSTANTS from "./constants";

const initialState = {
  isOpen: false,
};

export default function ModalReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
      };
    case CONSTANTS.CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
}
