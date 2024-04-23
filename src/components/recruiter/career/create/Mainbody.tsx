import { Form } from "./Form"

const Mainbody = () => {
  return (
    <div className="flex-1 p-10 bg-[#fff] w-full">
        <div className="max-w-[1000px] items-center flex flex-col justify-between p-10 border mx-auto"> {/* container 1 */}

            <div className="w-full mb-4 px-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl barlow-light text-[#151B26] justify-start">Career Management</h2>
            </div>            

            <Form/>
        </div>
    </div>
  )
}

export default Mainbody