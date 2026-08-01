import { NavLink, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>{" | "}
        <NavLink to="/products">Productos</NavLink>{" | "}
        <NavLink to="/categories">Categorías</NavLink>
      </nav>

      <hr />

      <Outlet />
    </>
  );
}

export default MainLayout;