import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//component
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Loading from "./Components/Loading/Loading";
//redux
import { getAllSRecipes } from "./redux/reducers/recipesReducer/action";
import AddRecipeModal from "./Modal/AddRecipeModal";
//dynamicImport
const Home = lazy(() => import("./Pages/Home"));
const AddRecipes = lazy(() => import("./Pages/AddRecipes"));
const SingleRecipes = lazy(() => import("./Pages/SingleRecipes"));
const SingleCategory = lazy(() => import("./Pages/singleCategory"));

function App() {
  const dispatch = useDispatch();
  const { allRecipes, error, loading } = useSelector(
    (state) => state.RecipesReducer
  );

  useEffect(() => {
    if (!allRecipes?.length) dispatch(getAllSRecipes());
  }, []);

  if (error.length) return "error ";
  if (loading) return <Loading />;

  return (
    <div className="App">
      <AddRecipeModal />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addRecipes" element={<AddRecipes />} />
        <Route path="/:category" element={<SingleCategory />} />
        <Route path="/:category/:recipe" element={<SingleRecipes />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
