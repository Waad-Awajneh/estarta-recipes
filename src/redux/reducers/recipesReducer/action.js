import * as CONSTANTS from "./constants";
import Swal from "sweetalert2";
import { closeModal } from "../ModalReducer/action";

export const getAllSRecipes = () => async (dispatch) => {
  dispatch({ type: CONSTANTS.LOADING });
  try {
    const response = await fetch(
      // "https://foodrecipes.free.beeceptor.com/my/api/allRecipes"
      "http://localhost:8000/categories"
    );
    const data = await response.json();
    console.log(data);
    if (data) {
      dispatch({ type: CONSTANTS.FETCH_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: CONSTANTS.FETCH_FAILED, payload: error });
  }
};

export const getAllCategoryName = () => (dispatch) => {
  dispatch({ type: CONSTANTS.GET_CATEGORY });
};
export const getActiveCategory = (activeCategoryName) => (dispatch) => {
  dispatch({
    type: CONSTANTS.GET_ACTIVE_CATEGORY,
    payload: activeCategoryName,
  });
};
export const getActiveRecipe = (activeRecipeName) => (dispatch) => {
  dispatch({
    type: CONSTANTS.GET_ACTIVE_RECIPE,
    payload: activeRecipeName,
  });
};

export const deleteActiveRecipe = () => (dispatch) => {
  dispatch({
    type: CONSTANTS.DELETE_ACTIVE_RECIPE,
  });
};

//add a new recipe and add comment

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export const handleAddNewPost = (recipe) => async (dispatch) => {
  const result = await toBase64(recipe.picture);
  console.log(result);

  dispatch({
    type: CONSTANTS.HANDEL_ADD_RECIPE,
    payload: { ...recipe, id: crypto.randomUUID(), picture: result },
  });
};

export const addComment = (comment) => async (dispatch) => {
  console.log("fjkekrekhkjhejhjtjhrt");
  await dispatch({ type: CONSTANTS.ADD_COMMENT, payload: comment });
};

export const updateCategoryInAPI = (updatedCategory) => async (dispatch) => {
  await fetch(`http://localhost:8000/categories/${updatedCategory?.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedCategory),
  });
  dispatch(closeModal());

  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    iconColor: "green",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });
  Toast.fire({
    icon: "success",
    title: "your post published successfully",
  });
  dispatch({ type: CONSTANTS.RESET_UPDATE });
};
