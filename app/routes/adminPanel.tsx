import { Link } from "@remix-run/react";

export default function Dashboard() {
    return (
        <div className="flex h-screen bg-slate-200 text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-[#283E51] to-[#4B79A1] p-6 flex flex-col">
                <div className="flex flex-col items-center space-x-3 py-10">
                    <img className="w-28 h-auto bg-gray-500 rounded-lg mb-4" src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" alt="User" />
                    <h2 className="text-lg font-semibold">Pepito Peréz</h2>
                </div>
                <nav>
                    <ul className="space-y-3">
                        <li>
                            <Link to="/adminPanel" className="flex gap-3 p-3 bg-[#404A69] rounded-md hover:bg-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                </svg>Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/user" className="flex gap-3 p-3 bg-[#404A69]  rounded-md hover:bg-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                </svg>
                                Usuarios
                            </Link>
                        </li>
                        <li><Link to="/bootcamps" className="flex gap-3 p-3 bg-[#404A69]  rounded-md hover:bg-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                            </svg>
                            Bootcamps
                        </Link>
                        </li>
                        <li><Link to="/opportunities" className="flex gap-3 p-3 bg-[#404A69] rounded-md hover:bg-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                            </svg>
                            Oportunidades
                        </Link>
                        </li>
                        <li><Link to="/themes" className="flex gap-3 p-3 bg-[#404A69] rounded-md hover:bg-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                            Tematicas
                        </Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex font-bold gap-3 mt-auto w-28 bg-[#FFBA08] p-3 rounded-md hover:bg-[#faa307]" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                    Salir
                </div>

            </aside>
            <div className="flex-1 p-6">
                <header className="flex justify-between items-center bg-[#404A69] p-4 rounded-md shadow-lg">
                    <h1 className="text-2xl font-semibold">Panel Administrativo</h1>
                </header>
                {/* Dashboard Widgets */}
                <div className="grid grid-cols-3 gap-6 mt-6">
                    <div className="bg-[#404A69] p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold">Bootcamps</h3>
                        <p className="text-gray-300">10 registrados</p>
                        <div className="mt-3 h-20 bg-gray-500 rounded-md"></div>
                    </div>
                    <div className="bg-[#404A69] p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold">Oportunidades</h3>
                        <p className="text-gray-300">20 activas</p>
                        <div className="mt-3 h-20 bg-gray-500 rounded-md"></div>
                    </div>
                    <div className="bg-[#404A69] p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold">Usuarios</h3>
                        <p className="text-gray-300">50 registrados</p>
                        <div className="mt-3 h-20 bg-gray-500 rounded-md"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
