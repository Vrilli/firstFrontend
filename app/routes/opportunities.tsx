import { useLoaderData, Form, useFetcher } from "@remix-run/react";
import { json, LoaderFunction, ActionFunction, redirect } from "@remix-run/node";
import axios from "axios";

interface Oportunidad {
  id: number;
  nombre: string;
  observaciones: string;
  tipo: string;
  descripcion: string;
  requisitos: string;
  guia: string;
  datosAdicionales: string;
  canalesAtencion: string;
  encargado: string;
  modalidad: string;
  categoriaId: number;
  institucionId: number;
}

export const loader: LoaderFunction = async () => {
  try {
    const response = await axios.get<Oportunidad[]>("http://localhost:5000/api/Oportunidad");
    return json(response.data ?? []);
  } catch (error) {
    console.error("Error cargando oportunidades:", error);
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

  const oportunidadData = {
    nombre: getSafeString(formData, "nombre"),
    observaciones: getSafeString(formData, "observaciones"),
    tipo: getSafeString(formData, "tipo"),
    descripcion: getSafeString(formData, "descripcion"),
    requisitos: getSafeString(formData, "requisitos"),
    guia: getSafeString(formData, "guia"),
    datosAdicionales: getSafeString(formData, "datosAdicionales"),
    canalesAtencion: getSafeString(formData, "canalesAtencion"),
    encargado: getSafeString(formData, "encargado"),
    modalidad: getSafeString(formData, "modalidad"),
    categoriaId: Number(formData.get("categoriaId")) || 0,
    institucionId: Number(formData.get("institucionId")) || 0
  };

  try {
    let response;
    const baseUrl = "http://localhost:5000/api/Oportunidad";

    switch (method) {
      case "POST":
        response = await axios.post(baseUrl, oportunidadData);
        break;
      case "PUT":
        if (!id) return json({ error: "ID requerido para actualizar" }, { status: 400 });
        response = await axios.put(`${baseUrl}/${id}`, oportunidadData);
        break;
      case "DELETE":
        if (!id) return json({ error: "ID requerido para eliminar" }, { status: 400 });
        response = await axios.delete(`${baseUrl}/${id}`);
        break;
      default:
        return json({ error: "Método no soportado" }, { status: 405 });
    }

    return redirect("/oportunidades");
  } catch (error) {
    console.error("Error en la acción:", error);
    return json({
      error: "Error al procesar la solicitud",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
};

export default function Oportunidades() {
  const oportunidades = useLoaderData<Oportunidad[]>();
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
        <h1 className="text-2xl font-bold">Gestión de Oportunidades</h1>
      </div>

      {/* Contenedor principal con scroll */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          {/* Formulario con scroll interno */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-gray-50 py-2 z-10">
              {getFormDataValue("_method") === "PUT" ?
                "Editar Oportunidad" : "Agregar Nueva Oportunidad"}
            </h2>

            <div className="max-h-[60vh] overflow-y-auto pr-2">
              <Form
                method="post"
                className="space-y-4"
                key={getFormDataValue("id") || "create"}
              >
                <input type="hidden" name="_method" value={getFormDataValue("_method") || "POST"} />
                <input type="hidden" name="id" value={getFormDataValue("id")} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre*</label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      className="border p-2 rounded w-full"
                      placeholder="Nombre de la oportunidad"
                      defaultValue={getFormDataValue("nombre")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                    <input
                      type="text"
                      name="tipo"
                      className="border p-2 rounded w-full"
                      placeholder="Tipo de oportunidad"
                      defaultValue={getFormDataValue("tipo")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Modalidad</label>
                    <input
                      type="text"
                      name="modalidad"
                      className="border p-2 rounded w-full"
                      placeholder="Modalidad"
                      defaultValue={getFormDataValue("modalidad")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Encargado</label>
                    <input
                      type="text"
                      name="encargado"
                      className="border p-2 rounded w-full"
                      placeholder="Persona encargada"
                      defaultValue={getFormDataValue("encargado")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID Categoría</label>
                    <input
                      type="number"
                      name="categoriaId"
                      className="border p-2 rounded w-full"
                      placeholder="ID de categoría"
                      defaultValue={getFormDataValue("categoriaId")}
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ID Institución</label>
                    <input
                      type="number"
                      name="institucionId"
                      className="border p-2 rounded w-full"
                      placeholder="ID de institución"
                      defaultValue={getFormDataValue("institucionId")}
                      min="0"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                      name="descripcion"
                      className="border p-2 rounded w-full"
                      placeholder="Descripción detallada"
                      rows={3}
                      defaultValue={getFormDataValue("descripcion")}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Requisitos</label>
                    <textarea
                      name="requisitos"
                      className="border p-2 rounded w-full"
                      placeholder="Requisitos para participar"
                      rows={3}
                      defaultValue={getFormDataValue("requisitos")}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guía</label>
                    <textarea
                      name="guia"
                      className="border p-2 rounded w-full"
                      placeholder="Guía o instrucciones"
                      rows={3}
                      defaultValue={getFormDataValue("guia")}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Datos Adicionales</label>
                    <textarea
                      name="datosAdicionales"
                      className="border p-2 rounded w-full"
                      placeholder="Información adicional"
                      rows={3}
                      defaultValue={getFormDataValue("datosAdicionales")}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Canales de Atención</label>
                    <textarea
                      name="canalesAtencion"
                      className="border p-2 rounded w-full"
                      placeholder="Cómo contactar o aplicar"
                      rows={3}
                      defaultValue={getFormDataValue("canalesAtencion")}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
                    <textarea
                      name="observaciones"
                      className="border p-2 rounded w-full"
                      placeholder="Observaciones adicionales"
                      rows={3}
                      defaultValue={getFormDataValue("observaciones")}
                    />
                  </div>
                </div>

                <div className="flex space-x-2 pt-4 sticky bottom-0 bg-gray-50 py-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                  >
                    {getFormDataValue("_method") === "PUT" ? "Actualizar" : "Guardar"}
                  </button>

                  {getFormDataValue("_method") === "PUT" && (
                    <button
                      type="button"
                      onClick={() => fetcher.load("/oportunidades")}
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </Form>
            </div>
          </div>

          {/* Lista de Oportunidades con scroll */}
          <div className="max-h-[50vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-white py-2 z-10">Lista de Oportunidades</h2>
            {Array.isArray(oportunidades) && oportunidades.length > 0 ? (
              <div className="space-y-4 pb-4">
                {oportunidades.map((oportunidad) => (
                  <div key={oportunidad.id} className="border rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{oportunidad.nombre}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                          <p className="text-gray-600">
                            <span className="font-medium">Tipo:</span> {oportunidad.tipo}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Modalidad:</span> {oportunidad.modalidad}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Encargado:</span> {oportunidad.encargado}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Categoría ID:</span> {oportunidad.categoriaId}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Institución ID:</span> {oportunidad.institucionId}
                          </p>
                        </div>

                        {oportunidad.descripcion && (
                          <div className="mt-3">
                            <h4 className="font-medium text-gray-700">Descripción:</h4>
                            <p className="text-gray-600 whitespace-pre-line">{oportunidad.descripcion}</p>
                          </div>
                        )}

                        {oportunidad.requisitos && (
                          <div className="mt-3">
                            <h4 className="font-medium text-gray-700">Requisitos:</h4>
                            <p className="text-gray-600 whitespace-pre-line">{oportunidad.requisitos}</p>
                          </div>
                        )}

                        {oportunidad.canalesAtencion && (
                          <div className="mt-3">
                            <h4 className="font-medium text-gray-700">Canales de Atención:</h4>
                            <p className="text-gray-600 whitespace-pre-line">{oportunidad.canalesAtencion}</p>
                          </div>
                        )}

                        {oportunidad.observaciones && (
                          <div className="mt-3">
                            <h4 className="font-medium text-gray-700">Observaciones:</h4>
                            <p className="text-gray-600 whitespace-pre-line">{oportunidad.observaciones}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => {
                            fetcher.submit(
                              {
                                _method: "PUT",
                                id: oportunidad.id.toString(),
                                nombre: oportunidad.nombre,
                                observaciones: oportunidad.observaciones || "",
                                tipo: oportunidad.tipo || "",
                                descripcion: oportunidad.descripcion || "",
                                requisitos: oportunidad.requisitos || "",
                                guia: oportunidad.guia || "",
                                datosAdicionales: oportunidad.datosAdicionales || "",
                                canalesAtencion: oportunidad.canalesAtencion || "",
                                encargado: oportunidad.encargado || "",
                                modalidad: oportunidad.modalidad || "",
                                categoriaId: oportunidad.categoriaId.toString(),
                                institucionId: oportunidad.institucionId.toString()
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
                          <input type="hidden" name="id" value={oportunidad.id} />
                          <button
                            type="submit"
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                            onClick={(e) => {
                              if (!confirm("¿Estás seguro de eliminar esta oportunidad?")) {
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
              <p className="text-gray-500">No hay oportunidades registradas.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}