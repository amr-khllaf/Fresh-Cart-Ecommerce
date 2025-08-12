import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
        {/* Outlet is used to render child routes */}
      </main>

      <Footer />
    </>
  );
}

export default Layout;
