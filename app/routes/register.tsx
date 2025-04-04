import { useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { login, register } from "~/services/authService";
import { tokenCookie } from "~/utils/cookies";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const nombre = formData.get("nombre");
  const apellido = formData.get("apellido");
  const fechaNacimiento = formData.get("fecha_nacimiento");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm_password");

  if (password !== confirmPassword) {
    return json({
      error: "Las contraseñas no coinciden.",
      values: { nombre, apellido, fechaNacimiento, email },
    });
  } else {
    await register(
      nombre as string,
      apellido as string,
      fechaNacimiento as string,
      email as string,
      password as string);

    const data = await login(email as string, password as string);

    const token = data.token.replace(/['"]+/g, "");

    if (!token) {
      return json({ error: "No se pudo obtener el token." }, { status: 500 });
    }


    return redirect("/novedades", {
      headers: {
        "Set-Cookie": await tokenCookie.serialize(token),
      },
    });
  }
};


export default function Register() {
  const actionData = useActionData<{ error?: string; values?: any }>();

  return (

    <section className="flex flex-col items-center justify-center bg-white pb-10 pt-20 dark:bg-[#0f1629]">
      <section className="flex flex-row items-center justify-center bg-white pb-10 pt-20 dark:bg-[#0f1629] mt-1">
        <div className="hidden md:block w-[900px] h-[800px]">
          <spline-viewer
            className="w-full h-full"
            url="https://prod.spline.design/iP53y93oIWLqa7MO/scene.splinecode"
          ></spline-viewer>
        </div>
        <div className="xl:w-1/3 p-5 bg-white rounded-lg shadow-lg max-h-[700px] overflow-auto sm:justify-center sm:items-center sm:col-span-4 dark:bg-[#172a41]">
          <h2 className="mb-4 text-xl font-light text-gray-700 dark:text-[#a8afc4] text-center">
            ¿Quieres buscar una <span className="text-xl font-medium text-blue-900 dark:text-[#12a6e8]">oportunidad?</span>
          </h2>
          <div className="flex justify-center mb-4 gap-x-3">
            <button className="flex items-center justify-center w-auto h-auto bg-white rounded-lg">
              <img src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000" alt="Google Logo" className="h-7 w-7" />
            </button>
            <button className="flex items-center justify-center w-auto h-auto bg-white rounded-lg">
              <img src="https://img.icons8.com/fluency/48/facebook-new.png" alt="Facebook Logo" className="h-7 w-7" />
            </button>
          </div>
          <form method="post" className="sm:items-center sm:justify-center sm:px-12 text-black dark:text-[#a8afc4]">
            <div className="mb-3.5">
              <label htmlFor="nombre" className="block mb-1 font-bold">Nombre</label>
              <input type="text" name="nombre" id="nombre" placeholder="Ingresa tu nombre" defaultValue={actionData?.values?.nombre || ""} className="w-full p-2.5 border rounded-lg bg-white text-black dark:bg-[#283446] dark:text-white" required />
            </div>
            <div className="mb-3.5">
              <label htmlFor="apellido" className="block mb-1 font-bold">Apellido</label>
              <input type="text" name="apellido" id="apellido" placeholder="Ingresa tu apellido" defaultValue={actionData?.values?.apellido || ""} className="w-full p-2.5 border rounded-lg bg-white text-black dark:bg-[#283446] dark:text-white" required />
            </div>
            <div className="mb-3.5">
              <label htmlFor="fecha_nacimiento" className="block mb-1 font-bold">Fecha de nacimiento</label>
              <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" defaultValue={actionData?.values?.fechaNacimiento || ""} className="w-full p-2.5 border rounded-lg bg-white text-black dark:bg-[#283446] dark:text-white" required />
            </div>
            <div className="mb-3.5">
              <label htmlFor="email" className="block mb-1 font-bold">Correo electrónico</label>
              <input type="email" name="email" id="email" placeholder="ejemplo@gmail.com" defaultValue={actionData?.values?.email || ""} className="w-full p-2.5 border rounded-lg bg-white text-black dark:bg-[#283446] dark:text-white" required />
            </div>
            <div className="relative mb-3.5">
              <label htmlFor="password" className="block mb-1 font-bold">Contraseña</label>
              <input type="password" name="password" id="password" placeholder="Ingresa tu contraseña" className="w-full p-2.5 border rounded-lg bg-white text-black dark:bg-[#283446] dark:text-white" required />
            </div>
            <div className="relative mb-3.5">
              <label htmlFor="confirm_password" className="block mb-1 font-bold">Confirmar contraseña</label>
              <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirma tu contraseña" className="w-full p-2.5 border rounded-lg bg-white text-black dark:bg-[#283446] dark:text-white" required />
            </div>
            {actionData?.error && (
              <p className="text-red-500 text-sm mb-4">{actionData.error}</p>
            )}
            <button type="submit" className="w-full p-2 font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600">
              Crear cuenta
            </button>
          </form>
        </div>
        <Benefits />
        <section>
          
        </section>
      </section>
      ) 
      };   