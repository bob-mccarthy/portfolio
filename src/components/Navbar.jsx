import {useState} from 'react'
import { FaBars } from "react-icons/fa";
import { Outlet, Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenu, setIsMenu] = useState("topnav")

  const handleClickMenu = () => {
    setIsMenu(isMenu === "topnav" ? "topnav responsive" : "topnav")
  }
  return (
    <>
    <div className = {isMenu}>
      <Link className = "link" to="/">
        Home
      </Link>
      {/* <Link className = "link" to="projects">Projects</Link> */}
      <a className='link' href='https://www.linkedin.com/in/robert-mccarthy-597b371a3/'>Contact</a>
      <Link className = "link" to="about">About</Link>
      <FaBars className = "icon"  onClick={handleClickMenu}/>
      
    </div>
    <Outlet />
    </>
  )
}

export default Navbar