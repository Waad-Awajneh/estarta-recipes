import { Link } from "react-router-dom";

function Card({ category, recipe, activeCategory }) {
  const link = category
    ? category["category_name"]?.replace(" ", "")
    : `${activeCategory?.replace(" ", "")}/${recipe.name?.replace(" ", "")}`;

  const image = category ? category.category_picture : recipe.picture;

  const name = category ? category.category_name : recipe.name;

  return (
    <>
      <div className="my-5 w-96 bg-white dark:bg-[#18191c] shadow-xl hover:shadow duration-200 rounded-xl">
        <Link to={`/${link}`}>
          <div className="relative  rounded-xl">
            <div className="relative w-full h-72  card:pm600:h-[26rem] xss:cover:h-[29rem] xsm:h-[25rem] pmi600:pm720:h-[28rem] pmi1400:h-[26rem] rounded-xl">
              <img
                className="rounded-xl hover:scale-105 duration-300 w-full h-full"
                src={image}
                alt={name}
              />
            </div>
          </div>
        </Link>
        <div className="p-4">
          <Link to={`/${link}`}>
            <h5 className="text-primary dark:text-white font-medium text-sm">
              {name}
            </h5>
          </Link>

          <small className="text-xs font-light text-primary dark:text-gray-400">
            Do you want to try?
          </small>
        </div>
      </div>
    </>
  );
}

export default Card;
