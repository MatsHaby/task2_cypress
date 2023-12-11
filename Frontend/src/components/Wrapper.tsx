import NavBar from "./Navbar"
import { Outlet } from "react-router-dom"

const Wrapper = () => {
  return (
    <div className="bg-[#322525] h-screen">
      <NavBar />
      <Outlet />
    </div>
  )
}

export default Wrapper