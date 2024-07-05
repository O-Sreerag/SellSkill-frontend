import { useNavigate } from "react-router-dom";

import { FiHome } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const navigate = useNavigate()
  console.log("setActivePage", setActivePage)

  const handleLogout = () => {
    navigate('/admin/login');
  }

  return (
    <div className="fixed left-0 flex h-full w-60 flex-col border-r bg-white">
      <div className="flex-grow overflow-y-auto overflow-x-hidden">
        <ul className="flex flex-col space-y-1 py-4">

          <li className="px-5 mb-3">
            <div className="flex items-center flex-shrink-0 text-gray-800 gap-1">
              <img src="/logo.png" alt="logo" width={23} />
              <span className="font-semibold text-xl tracking-tight">SellSkill</span>
            </div>
          </li>

          <hr className="bg-gray-200 p-[0.5px]" />

          <li>
            <ul className="space-y-1">
              <li>
                <a href="#" className={`relative flex h-9 flex-row items-center border-l-4  pr-6 ${activePage == 'home' ? 'border-pink-500 bg-[#f5f8fa] text-gray-800' : "border-transparent text-gray-600"} hover:bg-[#f5f8fa] hover:border-pink-200 hover:shadow-sm hover:text-gray-800 focus:outline-none`}>
                  <span className="ml-5 inline-flex items-center justify-center">
                    <FiHome />
                  </span>
                  <span className="ml-2 truncate text-sm tracking-wide">Home</span>
                </a>
              </li>

              <li>
                <a href="#" className={`relative flex h-9 flex-row items-center border-l-4 pr-6 hover:border-pink-200 hover:bg-[#f5f8fa] hover:shadow-sm hover:text-gray-800 focus:outline-none`}
                  onClick={handleLogout}>
                  <span className="ml-5 inline-flex items-center text-red-600 justify-center">
                    <IoLogOut />
                  </span>
                  <span className="ml-2 truncate text-sm text-red-600 tracking-wide">Logout</span>
                </a>
              </li>
            </ul>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default Sidebar;