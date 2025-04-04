import { useLoaderData, Form, useFetcher } from "@remix-run/react";
import { json, LoaderFunction, ActionFunction, redirect } from "@remix-run/node";
import axios from "axios";

interface Tematica {
  id: number;
  nombre: string;
  descripcion: string;
}

export const loader: LoaderFunction = async () => {
  try {
    const response = await axios.get<Tematica[]>("http://localhost:5000/api/Tematica");
    return json(response.data ?? []);
  } catch (error) {
    console.error("Error cargando temáticas:", error);
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

  const getSafeString = (formData: FormData, key: string): string => {
    const value = formData.get(key);
    return value instanceof File ? "" : value?.toString() || "";
  };

  const tematicaData = {
    nombre: getSafeString(formData, "nombre"),
    descripcion: getSafeString(formData, "descripcion")
  };

  try {
    let response;
    const baseUrl = "http://localhost:5000/api/Tematica";

    switch (method) {
      case "POST":
        response = await axios.post(baseUrl, tematicaData);
        break;
      case "PUT":
        if (!id) return json({ error: "ID requerido para actualizar" }, { status: 400 });
        response = await axios.put(`${baseUrl}/${id}`, tematicaData);
        break;
      case "DELETE":
        if (!id) return json({ error: "ID requerido para eliminar" }, { status: 400 });
        response = await axios.delete(`${baseUrl}/${id}`);
        break;
      default:
        return json({ error: "Método no soportado" }, { status: 405 });
    }

    return redirect("/tematicas");
  } catch (error) {
    console.error("Error en la acción:", error);
    return json({
      error: "Error al procesar la solicitud",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
};

export default function Tematicas() {
  const tematicas = useLoaderData<Tematica[]>();
  const fetcher = useFetcher();

  const getFormDataValue = (key: string): string => {
    if (!fetcher.formData) return "";
    const value = fetcher.formData.get(key);
    return value instanceof File ? "" : value?.toString() || "";
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header fijo */}
      <div className="bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Gestión de Temáticas</h1>
      </div>

      {/* Contenedor principal con scroll */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          {/* Formulario */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {getFormDataValue("_method") === "PUT" ?
                "Editar Temática" : "Agregar Nueva Temática"}
            </h2>

            <Form
              method="post"
              className="space-y-4"
              key={getFormDataValue("id") || "create"}
            >
              <input type="hidden" name="_method" value={getFormDataValue("_method") || "POST"} />
              <input type="hidden" name="id" value={getFormDataValue("id")} />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre*</label>
                <input
                  type="text"
                  name="nombre"
                  required
                  className="border p-2 rounded w-full"
                  placeholder="Nombre de la temática"
                  defaultValue={getFormDataValue("nombre")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  name="descripcion"
                  className="border p-2 rounded w-full"
                  placeholder="Descripción detallada"
                  rows={4}
                  defaultValue={getFormDataValue("descripcion")}
                />
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  {getFormDataValue("_method") === "PUT" ? "Actualizar" : "Guardar"}
                </button>

                {getFormDataValue("_method") === "PUT" && (
                  <button
                    type="button"
                    onClick={() => fetcher.load("/tematicas")}
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </Form>
          </div>

          {/* Lista de Temáticas con scroll */}
          <div className="max-h-[50vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-white py-2 z-10">Lista de Temáticas</h2>
            {Array.isArray(tematicas) && tematicas.length > 0 ? (
              <div className="space-y-4 pb-4">
                {tematicas.map((tematica) => (
                  <div key={tematica.id} className="border rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{tematica.nombre}</h3>
                        {tematica.descripcion && (
                          <p className="text-gray-600 mt-2 whitespace-pre-line">{tematica.descripcion}</p>
                        )}
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => {
                            fetcher.submit(
                              {
                                _method: "PUT",
                                id: tematica.id.toString(),
                                nombre: tematica.nombre,
                                descripcion: tematica.descripcion || ""
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
                          <input type="hidden" name="id" value={tematica.id} />
                          <button
                            type="submit"
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                            onClick={(e) => {
                              if (!confirm("¿Estás seguro de eliminar esta temática?")) {
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
              <p className="text-gray-500">No hay temáticas registradas.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}