import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const WithHeaderLayOut = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default WithHeaderLayOut;
