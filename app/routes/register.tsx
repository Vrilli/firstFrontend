import { useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { register } from "~/services/authService";

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
  }else{
    register(
      nombre as string,
      apellido as string,
      fechaNacimiento as string,
      email as string,
      password as string,
      1);
    return redirect("/login");
  }
};


export default function Register() {
  const actionData = useActionData<{ error?: string; values?: any }>();

  return (
    <>
      <section className="flex flex-row items-center justify-center bg-white pb-10 pt-20 dark:bg-[#0f1629]">
        <div className="hidden md:block w-[900px] h-[800px]">
          <spline-viewer
            className="w-full h-full"
            url="https://prod.spline.design/iP53y93oIWLqa7MO/scene.splinecode"
          ></spline-viewer>
        </div>
        <div className="xl:w-1/3 p-5 bg-white rounded-lg shadow-lg sm:justify-center sm:items-center sm:col-span-4 dark:bg-[#172a41]">
          <h2 className="mb-5 text-2xl font-light text-gray-700 dark:text-[#a8afc4] text-center">
            ¿Quieres buscar una <span className="text-2xl font-medium text-blue-900 dark:text-[#12a6e8]">oportunidad?</span>
          </h2>
          <div className="flex justify-between mb-5">
            <button className="flex items-center justify-center w-1/2 p-3 text-white bg-[#4285f4] rounded-lg gap-x-2">
              <img src="https://img.icons8.com/3d-fluency/94/google-logo.png" alt="Google Logo" className="h-5" />
              Iniciar con Google
            </button>
            <button className="flex items-center justify-center w-1/2 p-3 text-white bg-blue-600 rounded-lg gap-x-2">
              <img src="https://img.icons8.com/fluency/48/facebook-new.png" alt="Facebook Logo" className="h-5" />
              Iniciar con Facebook
            </button>
          </div>
          <form method="post" className="sm:items-center sm:justify-center sm:px-16 text-black dark:text-[#a8afc4]">
            <div className="mb-5">
              <label htmlFor="nombre" className="block mb-1 font-bold">Nombre</label>
              <input type="text" name="nombre" id="nombre" placeholder="Ingresa tu nombre" defaultValue={actionData?.values?.nombre || ""} className="w-full p-3 border rounded-lg bg-white text-black dark:bg-[#283446] dark:text-white" required />
            </div>
            <div className="mb-5">
              <label htmlFor="apellido" className="block mb-1 font-bold">Apellido</label>
              <input type="text" name="apellido" id="apellido" placeholder="Ingresa tu apellido" defaultValue={actionData?.values?.apellido || ""} className="w-full p-3 border rounded-lg bg-white text-black dark:bg-[#283446] dark:text-white" required />
            </div>
            <div className="mb-5">
              <label htmlFor="fecha_nacimiento" className="block mb-1 font-bold">Fecha de nacimiento</label>
              <input type="date" name="fecha_nacimiento" id="fecha_nacimiento" defaultValue={actionData?.values?.fechaNacimiento || ""} className="w-full p-3 border rounded-lg bg-white text-black dark:bg-[#283446] dark:text-white [&::-webkit-calendar-picker-indicator]:invert dark:[&::-webkit-calendar-picker-indicator]:invert-0" required />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-1 font-bold">Correo electrónico</label>
              <input type="email" name="email" id="email" placeholder="ejemplo@gmail.com" defaultValue={actionData?.values?.email || ""} className="w-full p-3 border rounded-lg bg-white text-black dark:bg-[#283446] dark:text-white" required />
            </div>
            <div className="relative mb-5">
              <label htmlFor="password" className="block mb-1 font-bold">Contraseña</label>
              <input type="password" name="password" id="password" placeholder="Ingresa tu contraseña" className="w-full p-3 border rounded-lg bg-white text-black dark:bg-[#283446] dark:text-white" required />
            </div>
            <div className="relative mb-5">
              <label htmlFor="confirm_password" className="block mb-1 font-bold">Confirmar contraseña</label>
              <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirma tu contraseña" className="w-full p-3 border rounded-lg bg-white text-black dark:bg-[#283446] dark:text-white" required />
            </div>
            {actionData?.error && (
              <p className="text-red-500 text-sm mb-5">{actionData.error}</p>
            )}
            <button type="submit" className="w-full p-3 font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600">
              Crear cuenta
            </button>
          </form>
        </div>
      </section>
    </>

  );
}
