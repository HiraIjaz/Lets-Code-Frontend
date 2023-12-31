import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Header from "./Header";
function Layout() {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Header />
        <section className="outlet-container">
          <Outlet />
        </section>
      </Grid>
    </>
  );
}
export default Layout;
