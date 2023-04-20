import { useParams } from "react-router-dom";
import { useEffect } from "react";
//icons
import { TiInputChecked } from "react-icons/ti";
import { BsPersonCircle } from "react-icons/bs";
//component
import AddComment from "../Components/AddComment/AddComment";
//redux
import {
  deleteActiveRecipe,
  getActiveRecipe,
} from "../redux/reducers/recipesReducer/action";
import { useDispatch, useSelector } from "react-redux";

export default function SingleRecipes() {
  const { recipe } = useParams();
  const dispatch = useDispatch();
  const { activeRecipe, activeCategory } = useSelector(
    (state) => state.RecipesReducer
  );
  console.log(activeRecipe);
  useEffect(() => {
    dispatch(getActiveRecipe(recipe));
    return () => dispatch(deleteActiveRecipe());
  }, []);
  if (!activeRecipe.id) return "loading";
  return (
    <div className=" lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 w-[80%] m-auto">
      <div className=" w-full">
        <h2 className=" w-full font-bold  lg:text-4xl text-3xl lg:leading-10 leading-9 mt-2 font-[Lato]">
          {activeRecipe.name}
        </h2>
        <p className="font-normal p-5 font-[Lato]  text-left leading-6 text-gray-600 mt-6">
          {activeRecipe.description}
        </p>
      </div>

      <div className="lg:mt-14 sm:mt-10 mt-12">
        <img
          className="lg:block hidden w-full h-[400px] rounded-lg"
          src={activeRecipe.picture}
          alt={activeRecipe.name}
        />
        <img
          className="lg:hidden sm:block hidden w-full h-[400px] rounded-lg"
          src={activeRecipe.picture}
          alt={activeRecipe.name}
        />
        <img
          className="sm:hidden block w-full h-[400px] rounded-lg"
          src={activeRecipe.picture}
          alt={activeRecipe.name}
        />
      </div>

      <div className="lg:mt-16 sm:mt-12 mt-16 flex  flex-nowrap flex-col justify-between  lg:gap-8 gap-12">
        <div className="w-full  text-left">
          <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 font-[Lato] ">
            Ingredients
          </h2>
          <p className="font-normal  font-[Lato] flex flex-wrap w-full justify-between text-base leading-6 text-gray-600 mt-4">
            {activeRecipe?.ingredients?.split(".")?.map(
              (recipe, i) =>
                activeRecipe?.ingredients?.split(".")?.length - 1 != i && (
                  <div
                    key={i}
                    className="my-5 text-left flex  gap-3 w-[16rem]  items-center"
                  >
                    <TiInputChecked size={30} />
                    <span className="font-[Lato] font-bold ">{recipe}</span>
                    <br />
                  </div>
                )
            )}
          </p>
        </div>

        <div className="w-full text-left">
          <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 font-[Lato]  ">
            Instructions
          </h2>
          <p className="font-normal text-base leading-6 text-gray-600 mt-4">
            {activeRecipe?.instructions?.split(".")?.map(
              (inst, i) =>
                activeRecipe?.instructions?.split(".")?.length - 1 != i && (
                  <div
                    key={i}
                    className="m-5 text-left flex gap-3 items-center"
                  >
                    <TiInputChecked size={30} />
                    <span className=" font-[Lato] font-bold">{inst}</span>
                    <br />
                  </div>
                )
            )}
          </p>

          <div className="w-full text-left">
            <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 font-[Lato] ">
              Comments
            </h2>
            <div className="font-normal text-base leading-6 text-gray-600 mt-4">
              {activeRecipe.comments?.length != 0 ? (
                activeRecipe.comments?.map((inst, i) => (
                  <div
                    key={i}
                    className="m-5 text-left flex flex-col  p-5 gap-y-3 border-gray-100 rounded-lg sh border-2"
                  >
                    <div className="flex gap-3 items-center">
                      <BsPersonCircle size={30} />
                      <span className="font-[Lato] font-bold">
                        {inst.userName}
                      </span>
                    </div>
                    <span className="font-[Lato] font-bold">
                      {inst.comment}
                    </span>
                    <br />
                  </div>
                ))
              ) : (
                <span className="m-5 text-left flex gap-3 items-center font-[Satisfy] font-bold">
                  No Comments yet ....
                </span>
              )}
            </div>
            <AddComment id={activeRecipe.id} categoryId={activeCategory.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
