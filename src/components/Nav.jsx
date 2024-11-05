import { NavLink } from "react-router-dom";
import HomeIcon from "../assets/home_menu_icon.svg";
import PlannerIcon from "../assets/planner_menu_icon.svg";
import CommunityIcon from "../assets/community_menu_icon.svg";
import FavoritesIcon from "../assets/favorites_menu_icon.svg";
import AccountIcon from "../assets/account_menu_icon.svg";

export default function Nav() {
  return (
    <nav>
      <NavLink to="/">
        <img src={HomeIcon} alt="Home" />
      </NavLink>
      <NavLink to="/planner">
        <img src={PlannerIcon} alt="Planner" />
      </NavLink>
      <NavLink to="/community">
        <img src={CommunityIcon} alt="Community" />
      </NavLink>
      <NavLink to="/favorites">
        <img src={FavoritesIcon} alt="Favorites" />
      </NavLink>
      <NavLink to="/account">
        <img src={AccountIcon} alt="Account" />
      </NavLink>
    </nav>
  );
}

