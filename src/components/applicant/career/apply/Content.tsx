import Mainbody from "./Mainbody"
// import Sidebar from "../Sidebar"
import Navbar from "../../Navbar"

const Content = () => {
  const navbarItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'resource', href: '/resourse' },
  ];
  return (
    <div className="bg-[#d8ecff]">
      <div className="h-[60px]">
        <Navbar items={navbarItems} />
      </div>
      <Mainbody />
    </div>
  )
}

export default Content