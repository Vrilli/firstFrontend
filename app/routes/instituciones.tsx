import { useLoaderData, Form, useFetcher } from "@remix-run/react";
import { json, LoaderFunction, ActionFunction, redirect } from "@remix-run/node";
import axios from "axios";

interface Institucion {
    id: number;
    nombre: string;
    ubicacion: string;
    url_generalidades: string;
    url_oferta_academica: string;
    url_bienestar: string;
    url_admision: string;
}

export const loader: LoaderFunction = async () => {
    try {
        const response = await axios.get<Institucion[]>("http://localhost:5000/api/Institucion");
        return json(response.data ?? []);
    } catch (error) {
        console.error("Error cargando instituciones:", error);
        return json([]);
    }
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const method = formData.get("_method") as string | null;
    const id = formData.get("id") as string | null;

    if (!method || !["POST", "PUT", "DELETE"].includes(method)) {
        return json({ error: "Método no válido" }, { status: 400 });
    }

    // Función helper para obtener valores seguros del FormData
    const getSafeString = (formData: FormData, key: string): string => {
        const value = formData.get(key);
        return value instanceof File ? "" : value?.toString() || "";
    };

    const institucionData = {
        nombre: getSafeString(formData, "nombre"),
        ubicacion: getSafeString(formData, "ubicacion"),
        url_generalidades: getSafeString(formData, "url_generalidades"),
        url_oferta_academica: getSafeString(formData, "url_oferta_academica"),
        url_bienestar: getSafeString(formData, "url_bienestar"),
        url_admision: getSafeString(formData, "url_admision")
    };

    try {
        let response;
        const baseUrl = "http://localhost:5000/api/Institucion";

        switch (method) {
            case "POST":
                response = await axios.post(baseUrl, institucionData);
                break;
            case "PUT":
                if (!id) return json({ error: "ID requerido para actualizar" }, { status: 400 });
                response = await axios.put(`${baseUrl}/${id}`, institucionData);
                break;
            case "DELETE":
                if (!id) return json({ error: "ID requerido para eliminar" }, { status: 400 });
                response = await axios.delete(`${baseUrl}/${id}`);
                break;
            default:
                return json({ error: "Método no soportado" }, { status: 405 });
        }

        return redirect("/instituciones");
    } catch (error) {
        console.error("Error en la acción:", error);
        return json({
            error: "Error al procesar la solicitud",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
};

export default function Instituciones() {
    const instituciones = useLoaderData<Institucion[]>();
    const fetcher = useFetcher();

    // Función para obtener valores seguros del fetcher.formData
    const getFormDataValue = (key: string): string => {
        if (!fetcher.formData) return "";
        const value = fetcher.formData.get(key);
        return value instanceof File ? "" : value?.toString() || "";
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Gestión de Instituciones</h1>

            {/* Formulario para agregar/editar institución */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold mb-4">
                    {getFormDataValue("_method") === "PUT" ?
                        "Editar Institución" : "Agregar Nueva Institución"}
                </h2>
                <Form
                    method="post"
                    className="space-y-4"
                    key={getFormDataValue("id") || "create"}
                >
                    <input
                        type="hidden"
                        name="_method"
                        value={getFormDataValue("_method") || "POST"}
                    />
                    <input
                        type="hidden"
                        name="id"
                        value={getFormDataValue("id")}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre*</label>
                            <input
                                type="text"
                                name="nombre"
                                required
                                className="border p-2 rounded w-full"
                                placeholder="Nombre de la institución"
                                defaultValue={getFormDataValue("nombre")}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                            <input
                                type="text"
                                name="ubicacion"
                                className="border p-2 rounded w-full"
                                placeholder="Ubicación física"
                                defaultValue={getFormDataValue("ubicacion")}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL Generalidades</label>
                            <input
                                type="url"
                                name="url_generalidades"
                                className="border p-2 rounded w-full"
                                placeholder="https://ejemplo.com/generalidades"
                                defaultValue={getFormDataValue("url_generalidades")}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL Oferta Académica</label>
                            <input
                                type="url"
                                name="url_oferta_academica"
                                className="border p-2 rounded w-full"
                                placeholder="https://ejemplo.com/oferta"
                                defaultValue={getFormDataValue("url_oferta_academica")}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL Bienestar</label>
                            <input
                                type="url"
                                name="url_bienestar"
                                className="border p-2 rounded w-full"
                                placeholder="https://ejemplo.com/bienestar"
                                defaultValue={getFormDataValue("url_bienestar")}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL Admisión</label>
                            <input
                                type="url"
                                name="url_admision"
                                className="border p-2 rounded w-full"
                                placeholder="https://ejemplo.com/admision"
                                defaultValue={getFormDataValue("url_admision")}
                            />
                        </div>
                    </div>

                    <div className="flex space-x-2 pt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                        >
                            {getFormDataValue("_method") === "PUT" ? "Actualizar" : "Guardar"}
                        </button>

                        {getFormDataValue("_method") === "PUT" && (
                            <button
                                type="button"
                                onClick={() => fetcher.load("/instituciones")}
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </Form>
            </div>

            {/* Lista de Instituciones */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Lista de Instituciones</h2>
                {Array.isArray(instituciones) && instituciones.length > 0 ? (
                    <div className="space-y-4">
                        {instituciones.map((institucion) => (
                            <div key={institucion.id} className="border rounded-lg p-4 shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg">{institucion.nombre}</h3>
                                        {institucion.ubicacion && (
                                            <p className="text-gray-600 mt-1">
                                                <span className="font-medium">Ubicación:</span> {institucion.ubicacion}
                                            </p>
                                        )}

                                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {institucion.url_generalidades && (
                                                <div className="flex items-center">
                                                    <span className="font-medium mr-2">Generalidades:</span>
                                                    <a
                                                        href={institucion.url_generalidades}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline text-sm"
                                                    >
                                                        Ver enlace
                                                    </a>
                                                </div>
                                            )}

                                            {institucion.url_oferta_academica && (
                                                <div className="flex items-center">
                                                    <span className="font-medium mr-2">Oferta Académica:</span>
                                                    <a
                                                        href={institucion.url_oferta_academica}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline text-sm"
                                                    >
                                                        Ver enlace
                                                    </a>
                                                </div>
                                            )}

                                            {institucion.url_bienestar && (
                                                <div className="flex items-center">
                                                    <span className="font-medium mr-2">Bienestar:</span>
                                                    <a
                                                        href={institucion.url_bienestar}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline text-sm"
                                                    >
                                                        Ver enlace
                                                    </a>
                                                </div>
                                            )}

                                            {institucion.url_admision && (
                                                <div className="flex items-center">
                                                    <span className="font-medium mr-2">Admisión:</span>
                                                    <a
                                                        href={institucion.url_admision}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline text-sm"
                                                    >
                                                        Ver enlace
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => {
                                                fetcher.submit(
                                                    {
                                                        _method: "PUT",
                                                        id: institucion.id.toString(),
                                                        nombre: institucion.nombre,
                                                        ubicacion: institucion.ubicacion || "",
                                                        url_generalidades: institucion.url_generalidades || "",
                                                        url_oferta_academica: institucion.url_oferta_academica || "",
                                                        url_bienestar: institucion.url_bienestar || "",
                                                        url_admision: institucion.url_admision || ""
                                                    },
                                                    { method: "post" }
                                                );
                                            }}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Editar
                                        </button>

                                        <fetcher.Form method="post">
                                            <input type="hidden" name="_method" value="DELETE" />
                                            <input type="hidden" name="id" value={institucion.id} />
                                            <button
                                                type="submit"
                                                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                                                onClick={(e) => {
                                                    if (!confirm("¿Estás seguro de eliminar esta institución?")) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                Eliminar
                                            </button>
                                        </fetcher.Form>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No hay instituciones registradas.</p>
                )}
            </div>
        </div>
    );
}