import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/create">Create Your Post</NavLink>
      <NavLink to="/recipes">Recipes</NavLink>
    </nav>
  );
}
