import React, { useEffect, useRef, useState } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  updateCategoryInAPI,
} from "../../redux/reducers/recipesReducer/action";

//tailwind component style
import { Button, TextInput, Textarea } from "flowbite-react";

export default function AddComment({ id, categoryId }) {
  const myRef = useRef();
  const dispatch = useDispatch();

  const [comment, setComment] = useState({
    userName: "",
    comment: "",
    post_id: id,
    categoryId: categoryId,
  });

  const { isCategoryUpdated, updatedCategory } = useSelector(
    (state) => state.RecipesReducer
  );

  useEffect(() => {
    if (isCategoryUpdated) dispatch(updateCategoryInAPI(updatedCategory));
  }, [isCategoryUpdated]);

  const resetCommentInput = () => {
    setComment({
      userName: "",
      comment: "",
      post_id: id,
      categoryId: categoryId,
    });
    myRef.current.reset();
  };

  const handleComment = () => {
    dispatch(addComment(comment));
    resetCommentInput();
  };

  if (!id) return "loading";
  return (
    <form className="relative group my-7 flex gap-3 flex-col" ref={myRef}>
      <TextInput
        name="userName"
        type="text"
        required={true}
        placeholder=" Add your Name"
        onChange={(e) => {
          setComment((pervs) => ({
            ...pervs,
            userName: e.target.value,
          }));
        }}
      />

      <Textarea
        name="comment"
        id="commentArea"
        type="text"
        required={true}
        placeholder="Comment "
        onChange={(e) => {
          setComment((pervs) => ({
            ...pervs,
            comment: e.target.value,
          }));
        }}
      />

      <div className="flex justify-end py-3 mt-2 gap-5">
        {comment.comment != "" || comment.userName != "" ? (
          <Button
            className="w-[100px] h-[40px] rounded-3xl border-[#ccc]
          
                hover:bg-red-700 hover:text-white text-gray-700   shadow-lg"
            color="light"
            onClick={() => {
              setComment((pervs) => ({
                ...pervs,
                comment: "",
              }));
              resetCommentInput();
            }}
          >
            Cancel
          </Button>
        ) : (
          ""
        )}
        <Button
          className="w-[100px] h-[40px] rounded-3xl  border-[#ccc] shadow-lg"
          color="gray"
          disabled={comment.comment == "" || comment.userName == ""}
          onClick={() => handleComment()}
        >
          Done
        </Button>
      </div>
    </form>
  );
}
