const Navbar = () => {
  return (
    <div className='bg-[#fff] px-2 w-full fixed top-0 z-10'>
        <div className=" text-black pl-4 pr-4 items-center flex justify-between mx-auto">
            <div className="flex p-2 gap-1 items-center">
                <img
                    src="/public/logo.png"
                    alt="logo"
                    width={25}
                />
                <span className="font-semibold text-xl text-gray-800 tracking-tight">SellSkill</span>
            </div>
        </div>
    </div>
  )
}

export default Navbar