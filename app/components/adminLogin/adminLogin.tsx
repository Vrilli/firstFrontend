import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminLogin = () => {
    const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get("email");
        const password = formData.get("password");
        if (email === "admin@example.com" && password === "admin123") {
            navigate("/adminPanel"); // Redirige al panel de administración
            toast.success('Ingreso correctamente!')
        } else {
            toast.error(' Usuario o contraseña incorrectos!')

        }
    };

    return (
        <div>
            {/* menu del panel */}
            <nav className="flex justify-between text-white items-center text-center bg-gradient-to-b from-[#283E51] to-[#4B79A1] dark:bg-[#172a41] p-4 lg:px-20 w-full h-20 fixed top-0 z-50 shadow-lg">
                <h1 className="text-3xl">Panel Administrativo</h1>
            </nav>

            {/* Form de inicio de sesion */}
            <div className="fixed inset-0 flex items-center justify-center ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <div>
                        <motion.img
                            src="/mascota.png"
                            className="w-[520px]"
                            alt="Imagen animada"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        />
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-lg w-[600px]">
                        <h2 className="text-3xl text-center font-bold my-14 mx-6 text-gray-800">
                            Iniciar sesión
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Usuario
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="mt-1 p-3 w-full border border-gray-300 rounded-md"
                                    placeholder="Ingresa tu usuario"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 p-3 w-full border border-gray-300 rounded-md"
                                    placeholder="Ingresa tu correo electrónico"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="mt-1 p-3 w-full border border-gray-300 rounded-md"
                                    placeholder="Ingresa tu contraseña"
                                    required
                                />
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Iniciar sesión
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;