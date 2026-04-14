import { Outlet, useLocation } from "react-router";
import Nav from "@/components/Nav";
import { Toaster } from "react-hot-toast";

export default function RootLayout() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Nav />}
      <Outlet />
      <Toaster />
    </>
  );
}
