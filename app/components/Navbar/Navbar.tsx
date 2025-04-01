import { useState } from "react";
import { Form, Link } from "@remix-run/react";
import { Menu, X, Sun, Moon, Search, User } from "lucide-react";

interface NavbarProps {
  isAuthenticated: boolean;
}

export default function Navbar({ isAuthenticated }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-gradient-to-b from-[#283E51] to-[#4B79A1] dark:bg-[#172a41] text-white fixed w-full z-50 py-2 px-10 flex justify-between items-center mb-60">

      <div className="flex justify-center gap-6 items-center px-20">
        {/* Logo */}
        <div>
          <Link to="/">
            <img src="img/logo.png" alt="Logo" className="h-auto w-24 object-contain" />
          </Link>

        </div>

        {/* Menú en pantallas grandes */}
        {isAuthenticated ? (
          <ul className="hidden md:flex gap-6 font-semibold">
            {["Servicios", "Oportunidades", "Quiénes Somos", "Novedades"].map((item, index) => (
              <li key={index} className="relative group">
                <a href={`/${item.toLowerCase().replace(" ", "-")}`} className="hover:text-gray-300 block pb-2">
                  {item}
                </a>
                <span className="absolute left-1/2 bottom-0 translate-x-[-50%] w-0 h-[3px] bg-[#FFBA08] transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="hidden md:flex gap-6 font-semibold">
            {["Servicios", "Oportunidades", "Quiénes Somos"].map((item, index) => (
              <li key={index} className="relative group">
                <a href={`/${item.toLowerCase().replace(" ", "-")}`} className="hover:text-gray-300 block pb-2">
                  {item}
                </a>
                <span className="absolute left-1/2 bottom-0 translate-x-[-50%] w-0 h-[3px] bg-[#FFBA08] transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        {/* Iconos en pantallas grandes */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Menú usuario */}
          <div className="relative">
            <button className="hover:text-gray-300 transition" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
              <User className="w-6 h-6" />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 top-10  text-black shadow-md rounded-md w-40">
                {isAuthenticated ? (
                  <Form method="post" action="/logout">
                    <button type="submit"
                      className="bg-[#32526E] text-white px-6 py-2 rounded-lg text-lg transition-colors duration-300 hover:bg-[#233947]">
                      Cerrar sesión
                    </button>
                  </Form>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="bg-[#32526E] text-white px-6 py-2 rounded-lg text-lg transition-colors duration-300 hover:bg-[#233947] m-2">
                      Ingresar
                    </Link>
                    <Link
                      to="/register"
                      className="bg-[#32526E] text-white px-6 py-2 rounded-lg text-lg transition-colors duration-300 hover:bg-[#233947]">
                      Registrarme
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Barra de búsqueda */}
          <button className="hover:text-gray-300 transition" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="w-6 h-6" />
          </button>
          {isSearchOpen && (
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-white bg-opacity-20 text-white placeholder-gray-300 px-6 py-2 rounded-full outline-none"
            />
          )}

          {/* Modo oscuro */}
          <button onClick={toggleTheme} className="hover:text-gray-300 transition">
            {isDarkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
          </button>
        </div>

        {/* Iconos en pantallas pequeñas */}
        <div className="flex md:hidden items-center gap-4">
          <button onClick={toggleTheme}>
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menú desplegable en móviles */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white text-black shadow-lg flex flex-col items-center p-4 gap-4 md:hidden">
            {/* Barra de búsqueda */}
            <div className="flex items-center gap-2 bg-gray-200 p-2 rounded-md w-full max-w-xs">
              <Search size={20} />
              <input type="text" placeholder="Buscar" className="bg-transparent outline-none w-full" />
            </div>

            {/* Opciones del menú */}
            {isAuthenticated ? (
              <ul className="flex flex-col gap-4 w-full text-center text-lg">
                {["Servicios", "Oportunidades", "Quiénes Somos", "Novedades"].map((item, index) => (
                  <li key={index}>
                    <Link
                      to={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="block py-2  transition-colors duration-300 hover:text-[#708BC6]">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="flex flex-col gap-4 w-full text-center text-lg">
                {["Servicios", "Oportunidades", "Quiénes Somos"].map((item, index) => (
                  <li key={index}>
                    <Link
                      to={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="block py-2  transition-colors duration-300 hover:text-[#708BC6]">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}


            {/* Botones de Ingresar y Registrarme */}
            <div className="flex gap-4 w-full justify-center ">
              {isAuthenticated ? (
                <Form method="post" action="/logout">
                  <button type="submit"
                    className="bg-[#32526E] text-white px-6 py-2 rounded-lg text-lg transition-colors duration-300 hover:bg-[#233947]">
                    Cerrar sesión
                  </button>
                </Form>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-[#32526E] text-white px-6 py-2 rounded-lg text-lg transition-colors duration-300 hover:bg-[#233947]">
                    Ingresar
                  </Link>
                  <Link
                    to="/registro"
                    className="bg-[#32526E] text-white px-6 py-2 rounded-lg text-lg transition-colors duration-300 hover:bg-[#233947]">
                    Registrarme
                  </Link>
                </>
              )}

            </div>
          </div>
        )}
      </div>

    </nav>
  );
}