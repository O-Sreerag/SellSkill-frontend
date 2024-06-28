import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Mainbody from "./Mainbody"
import Sidebar from "../Sidebar"
import { AppRootState } from "../../../redux/store";
import Chat from '../../messages/content'
import Notification from '../../notifications/content'

const Content = () => {
  const [activePage, setActivePage] = useState('dash');
  const { activeMenu } = useSelector((state: AppRootState) => state.active)
  const [sidebarStyle, setSidebarStyle] = useState<{ transform?: string, transition?: string }>({});

  useEffect(() => {
    if (activeMenu) {
      setSidebarStyle({
        transform: 'translateX(0)',
        transition: 'transform 0.3s ease-in-out',
      });
    } else {
      setSidebarStyle({
        transform: 'translateX(-400px)',
        transition: 'transform 0.3s ease-in-out',
      });
    }
  }, [activeMenu]);

  return (
    <div>
      <div className="flex min-h-screen flex-auto flex-shrink-0 bg-[#f8fafa] text-gray-800 antialiased">
        <div className="w-60 relative">
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
          <div
            className={`fixed ${activeMenu ? 'left-[240px]' : '-left-[240px]'} bg-[#f8fafa] border-r border-gray-200 shadow-md w-[400px] h-screen`}
            style={{ ...sidebarStyle, }}>
            {activeMenu === "messages" ? <Chat role="applicant" /> : <Notification role="applicant" />}
          </div>
        </div>
        <Mainbody />
      </div>
    </div>
  )
}

export default Content