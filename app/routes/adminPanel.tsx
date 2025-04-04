import { useState } from "react";
import UserManagement from "./user";
import Bootcamp from "./bootcamps";
import Categorias from "./category";
import Instituciones from "./instituciones";
import Oportunidades from "./opportunities";
import Tematicas from "./themes";

export default function Dashboard() {
    const [selectedSection, setSelectedSection] = useState("dashboard");

    const renderContent = () => {
        switch (selectedSection) {
            case "dashboard":
                return (
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-md shadow-md">
                            <h2 className="text-xl font-semibold">Usuarios</h2>
                            <img src="https://via.placeholder.com/300x150" alt="Gráfico de Usuarios" />
                        </div>
                        <div className="bg-white p-6 rounded-md shadow-md">
                            <h2 className="text-xl font-semibold">Bootcamps</h2>
                            <img src="https://via.placeholder.com/300x150" alt="Gráfico de Bootcamps" />
                        </div>
                    </div>
                );
            case "user":
                return <div className="bg-white p-6 rounded-md shadow-md"><UserManagement /></div>;
            case "bootcamps":
                return <div className="bg-white p-6 rounded-md shadow-md"><Bootcamp /></div>;
            case "category":
                return <div className="bg-white p-6 rounded-md shadow-md"><Categorias /></div>;
            case "opportunities":
                return <div className="bg-white p-6 rounded-md shadow-md"><Oportunidades /></div>;
            case "instituciones":
                return <div className="bg-white p-6 rounded-md shadow-md"><Instituciones /></div>;
            case "themes":
                return <div className="bg-white p-6 rounded-md shadow-md"><Tematicas /></div>;
        }
    };

    return (
        <div className="flex h-screen bg-slate-200 text-white">
            <aside className="w-64 bg-gradient-to-b fixed h-full from-[#283E51] to-[#4B79A1] p-6 flex flex-col">
                <div className="flex flex-col items-center py-10">
                    <img className="w-28 h-auto bg-gray-500 rounded-lg mb-4"
                        src="https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                        alt="User" />
                    <h2 className="text-lg font-semibold">Pepito Peréz</h2>
                </div>
                <nav>
                    <ul className="space-y-3">
                        {[{ key: "dashboard", label: "🏠 Dashboard" },
                        { key: "user", label: "👤 Usuarios" },
                        { key: "bootcamps", label: "🎓 Bootcamps" },
                        { key: "category", label: "📂 Categorias" },
                        { key: "opportunities", label: "💼 Oportunidades" },
                        { key: "instituciones", label: "🏛️ Instituciones" },
                        { key: "themes", label: "📚 Temáticas" }].map(({ key, label }) => (
                            <li key={key}>
                                <button onClick={() => setSelectedSection(key)} className={`flex gap-3 p-3 rounded-md w-full ${selectedSection === key ? "bg-gray-500" : "bg-[#404A69] hover:bg-gray-500"}`}>{label}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex font-bold gap-3 mt-auto w-28 bg-[#FFBA08] p-3 rounded-md hover:bg-[#faa307]">
                    <a href="/">Salir</a>
                </div>
            </aside>
            <main className="flex-1 ml-64 p-6">
                <header className="flex justify-between items-center bg-[#404A69] p-4 rounded-md shadow-lg">
                    <h1 className="text-2xl font-semibold">Panel Administrativo</h1>
                </header>
                <section className="mt-6 bg-white p-6 rounded-md text-black">
                    {renderContent()}
                </section>
            </main>
        </div>
    );
}
