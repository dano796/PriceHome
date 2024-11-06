import logo from "../assets/danielOrtizLogo.png";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="bg-red-900 mb-20 py-6">
      <div className="container mx-auto flex items-center justify-between px-8">
        <div className="flex flex-shrink-0 -my-[14px] pb-2 items-center">
          <img className="w-20" src={logo} alt="Logo" />
        </div>
        <div className="flex gap-4 font-medium">
          <a href="#about" className="hover:underline text-[17px] text-neutral-100 pl-1">Nosotros</a>
          <a href="#home" className="hover:underline text-[17px] text-neutral-100 pr-1">Estimar</a> 
        </div>
        <div className="flex items-center justify-center gap-4 text-[28px] text-neutral-100">
          <a 
            href="https://wa.link/hqdbas"
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-green-600 active:text-neutral-400"
          >
            <FaWhatsapp />
          </a>
          <a 
            href="mailto:pricehome@gmail.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-neutral-300 active:text-neutral-400"
          >
            <IoIosMail />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
