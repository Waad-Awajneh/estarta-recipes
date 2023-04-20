import { useParams } from "react-router-dom";
import { useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getActiveCategory } from "../redux/reducers/recipesReducer/action";
//component
import Card from "../Components/Card/Card";

export default function SingleCategory() {
  const { category } = useParams();
  const dispatch = useDispatch();

  const { activeCategory } = useSelector((state) => state.RecipesReducer);

  useEffect(() => {
    dispatch(getActiveCategory(category));
  }, []);

  return (
    <div className="workspace">
      <div>
        <h1></h1>
        <div className="flex flex-wrap gap-6 m-auto justify-center items-center w-[80%]">
          {activeCategory?.recipes?.map((recipe) => (
            <Card
              recipe={recipe}
              key={recipe.id}
              activeCategory={activeCategory.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
