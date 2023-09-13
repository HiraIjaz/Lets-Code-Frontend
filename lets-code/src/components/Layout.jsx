import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <main>
        <h1>Layout</h1>
        <Outlet />
      </main>
    </>
  );
}
export default Layout;
