import React, { useEffect, useState } from 'react';

interface NavbarProps {
    items: { label: string; href: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {

    return (
        <nav className='flex justify-center bg-[#fff] border-b-2 w-full shadow-sm fixed top-0 z-10'>
            <div className={`px-5 py-5 w-full max-w-[1400px]`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center flex-shrink-0 text-gray-800 mr-6 gap-1">
                        <img src="/public/logo.png" alt="logo" width={23} />
                        <span className="font-semibold text-xl tracking-tight">SellSkill</span>
                    </div>
                    <div className="flex">
                        {items.map((item, index) => (
                            <a key={index} href={item.href} className={`text-gray-600 px-3 py-1 rounded-md text-xs font-semibold hover:bg-gray-200`}>
                                {item.label}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center flex-shrink-0 text-gray-800 gap-3">
                        <button className='bg-black hover:bg-gray-800 text-white font-semibold px-5 py-1 rounded-md'>login</button>
                        <button className={`text-black border font-semibold px-4 py-1 rounded-md hover:bg-gray-200 shadow-md`}>signup</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
//    <div>