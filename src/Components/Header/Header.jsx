import { Link, NavLink } from "react-router-dom";
//redux
import { openModal } from "../../redux/reducers/ModalReducer/action";
import { useDispatch } from "react-redux";
//react-icon
import { BiMessageAltAdd } from "react-icons/bi";
//style
import "./style.css";

export default function Header() {
  const dispatch = useDispatch();
  return (
    <header>
      <div className="container">
        <div className="logo">
          <h2>
            <Link className="link" to="/">
              Estarta
              <span>Recipes</span>
            </Link>
          </h2>
        </div>
        <div className="nav">
          <ul>
            <NavLink className="link" to="/">
              <li>Home</li>
            </NavLink>
            <button
              onClick={() => {
                dispatch(openModal());
              }}
            >
              <li className="flex items-center gap-1 ">
                <BiMessageAltAdd size={20} />
                <span>Add Recipe</span>
              </li>
            </button>
          </ul>
        </div>
      </div>
    </header>
  );
}
