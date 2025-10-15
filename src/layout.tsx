import { Outlet } from "react-router-dom";
import AppHeader from "components/layout/app.header";
import Footer from "./components/layout/app.footer";

function Layout() {
  return (
    <>
      <AppHeader></AppHeader>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default Layout;
