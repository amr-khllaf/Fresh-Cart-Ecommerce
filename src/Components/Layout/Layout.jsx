import React, { useEffect, useState } from "react";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />

      <Outlet />
      {/* Outlet is used to render child routes */}

      <Footer />
    </>
  );
}

export default Layout;
