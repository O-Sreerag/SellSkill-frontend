import Mainbody from "./Mainbody"
import Sidebar from "../../Sidebar"
import Navbar from "../../Navbar"

const Content = () => {
  const navbarItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'resource', href: '/resourse' },
  ];
  return (
    <div>
      <div className="h-[60px]">
        <Navbar items={navbarItems} />
      </div>
      <div className="flex min-h-screen flex-auto flex-shrink-0 bg-gray-50 text-gray-800 antialiased">
        <div className="w-64">
          <Sidebar />
        </div>
        <Mainbody />
      </div>
    </div>
  )
}

export default Content

// bg-[#c9d3df]
// #EBF5FF