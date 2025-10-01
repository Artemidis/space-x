import { Link } from '@inertiajs/react';
import './main.css';

interface INavLink {
    id: number;
    title: string;
    url: string;
    order: number;
    is_active: boolean;
}

interface IBenefit {
    id: number;
    top_text: string;
    main_value: string;
    bottom_text: string;
    order: number;
    is_active: boolean;
}

interface IProps {
    navLinks: INavLink[],
    benefits: IBenefit[]
}

export default function Main({navLinks, benefits}: IProps) {
    return (
        <>
            <div className="title-block relative min-h-[660px] bg-cover lg:bg-auto">
                <header className="border-t border-b border-[#989393] bg-[#00000021]">
                    <div className="mx-auto my-[-1px] flex max-w-[1220px] items-center justify-between px-6">
                        <Link
                            href={'#'}
                            className="relative border border-[#98939321] p-6 pr-4 pb-10"
                        >
                            <div className="corner corner-I"></div>
                            <div className="corner corner-II"></div>
                            <div className="corner corner-III"></div>
                            <div className="corner corner-IV"></div>
                            <img src="/logo.png" alt="Logo" />
                        </Link>
                        <nav className="hidden lg:block">
                            <ul className="flex gap-[38px]">
                                {navLinks.map((link) => (
                                    <li
                                        key={link.id}
                                        className="flex items-center"
                                    >
                                        <Link
                                            className="inline-block py-1.5 text-center text-base text-white hover:border-b hover:border-[#b1b1b1] hover:text-[#b1b1b1]"
                                            href={link.url}
                                        >
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <div className="lg:hidden">
                            <button className="text-white">
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>
                <div className="mx-auto flex max-w-[1220px] flex-col justify-between px-6 lg:flex-row">
                    <div className="flex w-full flex-col items-center lg:w-[50%] lg:items-start">
                        <div className="mt-24 bg-gradient-to-r from-white to-[#ff4005] bg-clip-text text-center text-transparent lg:text-left">
                            <p className="mb-[-20px] text-[50px] font-bold lg:text-[58px]">
                                ПУТЕШЕСТВИЕ
                            </p>
                            <p className="text-[25px]">на красную планету</p>
                        </div>
                        <button className="blue-border-gradient relative z-2 mt-20 w-full py-[7px] text-[14px] text-[#fff] sm:w-[180px] cursor-pointer">
                            <div className="corner glow corner-II"></div>
                            <div className="corner glow corner-III"></div>
                            Начать путешествие
                        </button>
                        <div className="zigzag-line relative mt-3 h-[50px] w-[370px] self-end hidden lg:block relative">
                            <span className="absolute w-[5px] h-[5px] border border-white rounded-full right-[-2px] top-[18px] bg-black z-2"></span>
                        </div>
                    </div>
                    <div className="mx-auto mt-[48px] flex w-[340px] flex-wrap gap-[10px] lg:mx-0">
                        {
                            benefits.slice(0,4).map((item) => (
                                <div
                                    key={item.id}
                                    className="white-gradient-box w-[calc(50%-10px)] pt-6 pb-[32px] text-center text-[18px] font-thin text-[#fff] cursor-pointer"
                                >
                                    <p className="">{item.top_text}</p>
                                    <p className="mt-5 mb-[-6px] text-6xl font-bold">
                                        {item.main_value}
                                    </p>
                                    <p className="">{item.bottom_text}</p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
