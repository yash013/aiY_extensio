import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png"

export default function Header() {
    return (
        <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <Link className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase" href={'/'}><Image src={Logo} height={100} width={100} alt="logo"/></Link>
                </div>
                <div className="lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none hidden" id="example-collapse-navbar">
                    <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
                        <li className="flex items-center">
                            <button className="text-white bg-blue-500 active:bg-blue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150" type="button">
                                <i className="fas fa-arrow-alt-circle-down"></i> Get Early Access
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}


