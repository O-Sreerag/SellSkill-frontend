import Mainbody from "./Mainbody"
import Sidebar from "../../Sidebar"
import { useEffect, useState } from "react";
import Chat from '../../../messages/content'
import Notification from '../../../notifications/content'
import { useSelector } from "react-redux";
import { AppRootState } from "../../../../redux/store";

const Content = () => {

  const [activePage, setActivePage] = useState('career');
  const { activeMenu } = useSelector((state: AppRootState) => state.active);
  const [sidebarStyle, setSidebarStyle] = useState<{ transform?: string, transition?: string }>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) {
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
    } else {
      setIsMounted(true);
    }
  }, [activeMenu, isMounted]);

  return (
    <div>
      <div className="flex min-h-screen flex-auto flex-shrink-0 bg-white text-gray-800 antialiased">
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