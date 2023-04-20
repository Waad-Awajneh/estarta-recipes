import * as CONSTANTS from "./constants";

const initialState = {
  allRecipes: [],
  loading: false,
  error: false,
  categories: new Set(),
  activeCategory: {},
  activeRecipe: {},
  updatedCategory: {},
  isCategoryUpdated: false,
};

export default function RecipesReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.LOADING:
      return {
        ...state,
        loading: true,
      };

    case CONSTANTS.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        allRecipes: action.payload,
      };

    case CONSTANTS.FETCH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CONSTANTS.GET_CATEGORY:
      let categorySet = new Set();

      state.allRecipes?.forEach((element) =>
        categorySet.add({
          category_name: element.name,
          category_picture: element.category_picture,
        })
      );

      return {
        ...state,
        categories: categorySet,
      };

    case CONSTANTS.GET_SINGLE_Recipes:
      return {
        ...state,
        singleRecipes: state.allRecipes?.filter(
          (element) => element.category_name == action.payload
        ),
      };

    case CONSTANTS.GET_ACTIVE_CATEGORY:
      const activeCategoryAsArray = state.allRecipes?.filter(
        (element) => element["name"]?.replace(" ", "") == action.payload
      );
      return {
        ...state,
        activeCategory: activeCategoryAsArray[0],
      };

    case CONSTANTS.GET_ACTIVE_RECIPE:
      const activeRecipeAsArray = state.activeCategory.recipes?.filter(
        (element) => element["name"]?.replace(" ", "") == action.payload
      );
      return {
        ...state,
        activeRecipe: activeRecipeAsArray[0],
      };

    case CONSTANTS.DELETE_ACTIVE_RECIPE:
      return {
        ...state,
        activeRecipe: {},
      };

    case CONSTANTS.HANDEL_ADD_RECIPE:
      const { categoryName, ...recipe } = action.payload;

      const CategoryToHandel = state.allRecipes?.filter(
        (element) => element["name"] == categoryName
      );

      CategoryToHandel[0].recipes.push({
        ...recipe,
        // picture: JSON.stringify(recipe.picture),
      });
      const newCategory = { ...CategoryToHandel[0] };
      console.log(newCategory);
      return {
        ...state,
        allRecipes: state.allRecipes.map((item) =>
          item["name"] == categoryName ? newCategory : item
        ),
        updatedCategory: newCategory,
        isCategoryUpdated: true,
      };

    case CONSTANTS.ADD_COMMENT:
      const RecipeToHandel = state.activeCategory?.recipes.filter(
        (element) => element["id"] == action.payload.post_id
      );
      console.log(action.payload);

      RecipeToHandel[0]?.comments?.push({
        ...action.payload,
      });
      console.log(RecipeToHandel[0]);
      const newCategoryComments = {
        ...state.activeCategory,
        recipes: state.activeCategory.recipes.map((item) =>
          item.id == action.payload.post_id ? RecipeToHandel[0] : item
        ),
      };

      return {
        ...state,
        allRecipes: state.allRecipes.map((item) =>
          item.id == state.activeCategory.id ? newCategoryComments : item
        ),
        updatedCategory: newCategoryComments,
        // activeRecipe: RecipeToHandel[0],
        isCategoryUpdated: true,
      };

    case CONSTANTS.RESET_UPDATE:
      return {
        ...state,
        updatedCategory: {},
        isCategoryUpdated: false,
      };

    default:
      return state;
  }
}
