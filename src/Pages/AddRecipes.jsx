import { useEffect, useState } from "react";
//react-icon
import { RiImageEditFill } from "react-icons/ri";
import { FiUploadCloud } from "react-icons/fi";
import { FaRegSmileBeam } from "react-icons/fa";
//redux
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/reducers/ModalReducer/action";
import {
  handleAddNewPost,
  updateCategoryInAPI,
} from "../redux/reducers/recipesReducer/action";

//tailwind component
import { Button, TextInput, Textarea } from "flowbite-react";

export default function AddRecipes() {
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const [newPost, setNewPost] = useState({
    categoryName: "Indian Food",
    comments: [],
    instructions: "",
    picture: "",
    ingredients: "",
    description: "",
    name: "",
  });

  const { isCategoryUpdated, updatedCategory } = useSelector(
    (state) => state.RecipesReducer
  );

  useEffect(() => {
    if (isCategoryUpdated) dispatch(updateCategoryInAPI(updatedCategory));
  }, [isCategoryUpdated]);

  const handelChange = (e) => {
    setNewPost((pervs) => ({
      ...pervs,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="flex gap-y-3 cover:flex-wrap flex-nowrap  bg-white justify-center items-center  dark:bg-[#18191c] ">
        {newPost.picture == "" ? (
          <div className="flex justify-center items-center mr-16 pm720:mr-3 pm720:px-3 border-2 p-6 border-gray-400 text-center w-[50%] pm720:w-auto pm720:h-[80%]  cover:h-auto h-full  ">
            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center bg-gray-100 border-4 border-gray-500 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center p-5 pm720:p-0">
                <FiUploadCloud />
                <p className="mb-2 text-sm font-[Satisfy] text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-sm font-[Satisfy] text-gray-600 cover:hidden">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  setNewPost((pervs) => ({
                    ...pervs,
                    picture: e.target.files[0],
                  }));
                  setFlag(true);
                }}
              />
            </label>
          </div>
        ) : (
          <>
            <img
              className=" relative flex justify-center items-center mr-16 pm720:mr-0 cover:w-[150px] cover:h-[150px] rounded-lg pm720:p-0 border-2 p-6 border-gray-400 text-center w-[50%] h-[25rem]  "
              src={
                !flag
                  ? `data:image/jpeg;base64,${newPost.picture}`
                  : URL.createObjectURL(newPost.picture)
              }
              alt="Rounded avatar"
            />
            <label
              for="dropzone-file5"
              className=" absolute    shadow-xl rounded-full   align-middle border-none left-[14rem]  bottom-[6.25rem]  pm600:top-0 pm600:w-[75px] pm600:h-[75px]
                        bg-gray-600  opacity-95  w-[75px] h-[75px] max-w-[75px]
                        "
            >
              {
                <RiImageEditFill
                  className=" absolute w-[40px] h-[40px]  right-5 top-4 pm600:w-20 pm600:h-10 pm600:right-[-2px]"
                  color="#fff"
                />
              }
            </label>
            <input
              id="dropzone-file5"
              type="file"
              className="hidden"
              onChange={(e) => {
                setNewPost((pervs) => ({
                  ...pervs,
                  picture: e.target.files[0],
                }));
                setFlag(true);
              }}
            />
          </>
        )}
        <div className=" relative  flex  flex-col w-[24rem] cover:w-[80%] ">
          <form className="relative group flex flex-col gap-y-3 ">
            <div className="flex items-center gap-x-3">
              <h2>Add Your Recipe</h2> <FaRegSmileBeam size={20} />
            </div>
            <TextInput
              name="name"
              type="text"
              required={true}
              placeholder="Recipe Name"
              onChange={handelChange}
            />
            <span className=" mb-3 w-full p-1 rounded-lg bg-white  flex items-center justify-center  duration-200 group">
              <select
                className="border-0 px-2 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                aria-label="Default select example"
                style={{ transition: "all .15s ease" }}
                onChange={handelChange}
                name="categoryName"
              >
                <option name="categoryName" defaultValue="Indian Food">
                  Indian Food
                </option>
                <option name="categoryName" value="American Food">
                  American Food
                </option>
                <option name="categoryName" value="Chinese Food">
                  Chinese Food
                </option>
                <option name="categoryName" value="Mexican Food">
                  Mexican Food
                </option>
                <option name="categoryName" value="Italian Food">
                  Italian Food
                </option>
              </select>
            </span>

            <Textarea
              name="description"
              type="text"
              required={true}
              placeholder="Recipe Description"
              onChange={handelChange}
            />

            <Textarea
              name="ingredients"
              type="text"
              required={true}
              placeholder="Recipe Ingredients //input as ex: Ingredient1. Ingredients2."
              onChange={handelChange}
            />
            <Textarea
              name="instructions"
              type="text"
              required={true}
              placeholder="Recipe Instructions //input as  ex: Instruction1.  Instruction2."
              onChange={handelChange}
            />
          </form>

          <div className="flex justify-end py-8 mt-5 gap-5">
            <Button
              className="w-[100px] h-[40px] rounded-3xl border-[#ccc]
          
                hover:bg-red-700 hover:text-white text-gray-700   shadow-lg"
              color="light"
              onClick={() => {
                dispatch(closeModal());
              }}
            >
              Cancel
            </Button>
            <Button
              className="w-[100px] h-[40px] rounded-3xl  border-[#ccc] shadow-lg"
              color="gray"
              onClick={() => {
                dispatch(handleAddNewPost(newPost));
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
