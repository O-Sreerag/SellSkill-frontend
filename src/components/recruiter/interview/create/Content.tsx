import Mainbody from "./Mainbody"
import Calendar from "./Calendar.tsx"
import Sidebar from "../../Sidebar"
import Navbar from "../../Navbar"

const Content = () => {
  return (
    <div>
      <div className="h-[60px]">
        <Navbar />
      </div>
      <div className="flex min-h-screen flex-auto flex-shrink-0 bg-gray-50 text-gray-800 antialiased">
        <div className="w-64">
          <Sidebar />
        </div>
        <Calendar />
      </div>
    </div>
  )
}

export default Content