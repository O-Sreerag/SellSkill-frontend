import './Mainbody.css'

const Mainbody = () => {
  return (
    <div className="flex-1 p-10 bg-[#fff] w-full">
        <div className="max-w-[1000px] items-center flex flex-col justify-between p-10 border mx-auto"> {/* container 1 */}

            <div className="w-full">
                <h2 className="text-2xl sm:text-3xl md:text-4xl barlow-light text-[#151B26] justify-start">Career Management</h2>
            </div>
            <div className="flex w-full mt-2">
                <div className="w-3/4">
                    <p className="text-gray-600">Create and Manage Career openings in your company.</p>
                </div>
                <div className="w-1/4 flex justify-end">
                    <button className="bg-indigo-50 text-indigo-500 hover:bg-indigo-400 hover:text-white font-sans py-1 px-8 rounded shadow-md">
                        Time to Hire
                    </button>
                </div>
            </div>

            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 custom-scrollbar"> {/* container 2 */}

            </div>
        </div>
    </div>
  )
}

export default Mainbody