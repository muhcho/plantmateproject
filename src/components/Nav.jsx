import { NavLink } from "react-router-dom";
import HomeIcon from "../assets/home_menu_icon.svg";
import PlannerIcon from "../assets/planner_menu_icon.svg";
import CommunityIcon from "../assets/community_menu_icon.svg";
import FavoritesIcon from "../assets/favorites_menu_icon.svg";
import AccountIcon from "../assets/account_menu_icon.svg";

export default function Nav() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/create">Create Post</NavLink>
      <NavLink to="/recipes">Recipes</NavLink>
    </nav>
  );
}

