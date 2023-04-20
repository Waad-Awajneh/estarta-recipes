import { useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryName } from "../redux/reducers/recipesReducer/action";
//component
import Card from "../Components/Card/Card";
import Loading from "../Components/Loading/Loading";

export default function Home() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.RecipesReducer);

  useEffect(() => {
    dispatch(getAllCategoryName());
  }, []);

  if (categories?.length === 0) return <Loading />;
  return (
    <div className="workspace">
      <div>
        <p>
          Welcome to
          <span className=" text-[#ba0404]  font-semibold">Estarta </span>
          <br /> We are thrilled to have you on Estarta Recipes, Enjoy.
        </p>
        <div className="flex flex-wrap gap-6 m-auto justify-center items-center w-[80%]">
          {Array.from(categories)?.map((category) => (
            <Card category={category} key={category.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
