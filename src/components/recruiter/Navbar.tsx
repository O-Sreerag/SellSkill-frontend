import React, { useEffect, useState } from 'react';

interface NavbarProps {
    items: { label: string; href: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {

    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            setScrollPosition(scrollTop);
            if (scrollTop > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className='flex justify-center'>
            <div className={`fixed transition-all duration-1000
                    ${isScrolled ? 'py-2.5 px-4 top-5 rounded-2xl w-[62%] bg-white shadow-md' : 'px-36 py-10 w-full'}`}
                style={{ maxHeight: `${isScrolled && scrollPosition > 30 ? '65px' : 'unset'}` }}>

                <div className="flex items-center justify-between">
                    <div className="flex items-center flex-shrink-0 text-gray-800 mr-6 gap-1">
                        <img src="/logo.png" alt="logo" width={23} />
                        <span className="font-semibold text-xl tracking-tight">SellSkill</span>
                    </div>
                    <div className="flex">
                        {items.map((item, index) => (
                            <a key={index} href={item.href} className={`text-gray-600 px-3 py-1 rounded-md text-xs font-semibold ${isScrolled ? 'hover:bg-gray-200' : 'hover:bg-[#abc7e3]'}`}>
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