import Navbar2 from '../../Navbar2'
import { Form } from './Form'

const Mainbody = () => {
    return (
        <div className="flex justify-center w-full bg-white">
            <div className='max-w-[1100px] lg:min-w-[1100px]'>
                <div className="items-center flex flex-col justify-between p-5">
                    <Navbar2 />

                    <div className="w-full space-y-2 mb-2">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#2B2B2E] justify-start barlow-regular">Career Management</h2>
                    </div>

                    <div className='w-full mt-2'>
                        <Form/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mainbody