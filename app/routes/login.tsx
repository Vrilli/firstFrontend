import { motion } from "framer-motion";
import { login } from "../services/authService";
import { tokenCookie } from "../utils/cookies";
import { useActionData, useFetcher } from "@remix-run/react";
import { redirect } from "@remix-run/node";

import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    if (email && password) {
        const data = await login(email as string, password as string);
        const token = data.token.replace(/['"]+/g, "");

        return redirect("/novedades", {
            headers: {
                "Set-Cookie": await tokenCookie.serialize(token),
            },
        });
    }
}

export default function Login() {

    const actionData = useActionData();
    const fetcher = useFetcher();

    return (
        <div className="flex justify-center items-center py-8 mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <div>
                    <motion.img
                        src="/mascota.png"
                        alt="Imagen animada"
                        className="w-[400px]"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    />
                </div>
    
                <div className="bg-white p-6 rounded-xl shadow-md w-[450px]">
                    <div className="flex justify-between font-bold p-3 gap-x-2">
                        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-x-2">
                            <img src="/google-brands.svg" alt="Google" className="w-5 h-5" />
                            Ingresa con Google
                        </button>
                        <button type="submit" className="w-full px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-x-2">
                            <img src="/facebook-brands.svg" alt="Facebook" className="w-5 h-5" />
                            Ingresa con Facebook
                        </button>
                    </div>
    
                    <h2 className="text-2xl my-6 mx-4 text-gray-800">
                        Bienvenido a tu <br />
                        <span className="font-bold">banco de oportunidades</span>
                    </h2>
    
                    <fetcher.Form method="post">
                        <div className="mb-5">
                            <label htmlFor="email" className="block text-sm font-medium">Correo electrónico</label>
                            <input type="email" id="email" name="email" className="mt-1 p-2 w-full border border-gray-300 rounded-md" placeholder="Ingresa tu correo" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block text-sm font-medium">Contraseña</label>
                            <input type="password" id="password" name="password" className="mt-1 p-2 w-full border border-gray-300 rounded-md" placeholder="Ingresa tu contraseña" required />
                        </div>
                        <div className="flex justify-between mt-1 p-2">
                            <p><input type="checkbox" /> Recordarme</p>
                            <button type="button" className="ml-1 text-orange-600 text-sm">Olvidé mi contraseña</button>
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="w-full px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-blue-700">Iniciar sesión</button>
                        </div>
                        <div className="flex justify-center mt-2 p-2">
                            <p>¿No tienes una cuenta?
                                <button type="button" className="ml-1 text-orange-600 text-sm">Regístrate</button>
                            </p>
                        </div>
                    </fetcher.Form>
                </div>
            </div>
        </div>
    );
}