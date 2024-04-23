import { RxAvatar } from "react-icons/rx";

const Mainbody = () => {
  return (
    <div className="flex-1 p-10 bg-[#fff] w-full  ">
        <div className="max-w-[1000px] items-center flex-1 justify-between p-10 border mx-auto">
            <h2 className="text-3xl font-thin mb-4 text-black">Main Heading</h2>
            <div className="flex">  
                <div className="w-3/4">
                    <p className="text-gray-600">This is a small description beneath the main heading.</p>
                </div>
                <div className="w-1/4 flex justify-end">
                    <button className="bg-[#576475] hover:bg-[#4c5868]  text-white font-sans py-1 px-8 rounded shadow-md">
                        Button 1
                    </button>
                </div>
            </div>
            
            <div className="mt-20">
                <div className="bg-gray-100 rounded-lg p-6 mb-4 flex items-center shadow-md">
                    <RxAvatar className="w-12 h-12 text-black rounded-full mr-4"/>
                    <div>
                        <h3 className="text-lg font-semibold">Card Title 1</h3>
                        <p className="text-gray-600 text-sm">Card content goes here...</p>
                    </div>
                </div>

                <div className="bg-[#576475] flex rounded-lg p-6 mb-4 shadow-md">
                    <RxAvatar className="w-12 h-12 text-white rounded-full mr-4"/>
                    <div>
                        <h3 className="text-lg text-white font-semibold">Card Title 2</h3>
                        <p className="text-white text-sm">Card content goes here...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Mainbody