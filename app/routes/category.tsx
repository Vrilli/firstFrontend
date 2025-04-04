import { useLoaderData, Form, useFetcher } from "@remix-run/react";
import { json, LoaderFunction, ActionFunction, redirect } from "@remix-run/node";
import axios from "axios";

interface Categoria {
    id: number;
    nombre: string;
    descripcion: string;
    estado: boolean;
}

export const loader: LoaderFunction = async () => {
    try {
        const response = await axios.get<Categoria[]>("http://localhost:5000/api/Categorias");
        return json(response.data ?? []);
    } catch (error) {
        console.error("Error cargando categorías:", error);
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

    const categoriaData = {
        nombre: getSafeString(formData, "nombre"),
        descripcion: getSafeString(formData, "descripcion"),
        estado: formData.get("estado") === "true"
    };

    try {
        let response;
        const baseUrl = "http://localhost:5000/api/Categorias";

        switch (method) {
            case "POST":
                response = await axios.post(baseUrl, categoriaData);
                break;
            case "PUT":
                if (!id) return json({ error: "ID requerido para actualizar" }, { status: 400 });
                response = await axios.put(`${baseUrl}/${id}`, categoriaData);
                break;
            case "DELETE":
                if (!id) return json({ error: "ID requerido para eliminar" }, { status: 400 });
                response = await axios.delete(`${baseUrl}/${id}`);
                break;
            default:
                return json({ error: "Método no soportado" }, { status: 405 });
        }

        return redirect("/categorias");
    } catch (error) {
        console.error("Error en la acción:", error);
        return json({
            error: "Error al procesar la solicitud",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
};

export default function Categorias() {
    const categorias = useLoaderData<Categoria[]>();
    const fetcher = useFetcher();

    // Función para obtener valores seguros del fetcher.formData
    const getFormDataValue = (key: string): string => {
        if (!fetcher.formData) return "";
        const value = fetcher.formData.get(key);
        return value instanceof File ? "" : value?.toString() || "";
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Gestión de Categorías</h1>

            {/* Formulario para agregar/editar categoría */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold mb-4">
                    {getFormDataValue("_method") === "PUT" ?
                        "Editar Categoría" : "Agregar Nueva Categoría"}
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre*</label>
                        <input
                            type="text"
                            name="nombre"
                            required
                            className="border p-2 rounded w-full"
                            placeholder="Nombre de la categoría"
                            defaultValue={getFormDataValue("nombre")}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                        <textarea
                            name="descripcion"
                            className="border p-2 rounded w-full"
                            placeholder="Descripción de la categoría"
                            rows={3}
                            defaultValue={getFormDataValue("descripcion")}
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="estado"
                            id="estado"
                            value="true"
                            defaultChecked={getFormDataValue("estado") === "true"}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="estado" className="ml-2 block text-sm text-gray-900">
                            Activo
                        </label>
                    </div>

                    <div className="flex space-x-2">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                        >
                            {getFormDataValue("_method") === "PUT" ? "Actualizar" : "Guardar"}
                        </button>

                        {getFormDataValue("_method") === "PUT" && (
                            <button
                                type="button"
                                onClick={() => fetcher.load("/categorias")}
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </Form>
            </div>

            {/* Lista de Categorías */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Lista de Categorías</h2>
                {Array.isArray(categorias) && categorias.length > 0 ? (
                    <div className="space-y-2">
                        {categorias.map((categoria) => (
                            <div key={categoria.id} className="border rounded-lg p-4 shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg flex items-center">
                                            {categoria.nombre}
                                            <span className={`ml-2 text-xs px-2 py-1 rounded-full ${categoria.estado
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                                }`}>
                                                {categoria.estado ? "Activo" : "Inactivo"}
                                            </span>
                                        </h3>
                                        {categoria.descripcion && (
                                            <p className="text-gray-600 mt-1">{categoria.descripcion}</p>
                                        )}
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => {
                                                fetcher.submit(
                                                    {
                                                        _method: "PUT",
                                                        id: categoria.id.toString(),
                                                        nombre: categoria.nombre,
                                                        descripcion: categoria.descripcion || "",
                                                        estado: categoria.estado.toString()
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
                                            <input type="hidden" name="id" value={categoria.id} />
                                            <button
                                                type="submit"
                                                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                                                onClick={(e) => {
                                                    if (!confirm("¿Estás seguro de eliminar esta categoría?")) {
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
                    <p className="text-gray-500">No hay categorías registradas.</p>
                )}
            </div>
        </div>
    );
}