import { useLoaderData, Form, useFetcher } from "@remix-run/react";
import { json, LoaderFunction, ActionFunction, redirect } from "@remix-run/node";
import axios from "axios";

interface Bootcamp {
  id: number;
  nombre: string;
  descripcion: string;
  informacion: string;
  costos: number;
  institucionId: number;
}

export const loader: LoaderFunction = async () => {
  try {
    const response = await axios.get<Bootcamp[]>("http://localhost:3000/api/Bootcamp");
    return json(response.data ?? []);
  } catch (error) {
    console.error("Error cargando bootcamps:", error);
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

  const bootcampData = {
    nombre: formData.get("nombre") as string,
    descripcion: formData.get("descripcion") as string,
    informacion: formData.get("informacion") as string,
    costos: Number(formData.get("costos")),
    institucionId: Number(formData.get("institucionId"))
  };

  try {
    let response;
    const baseUrl = "http://localhost:3000/api/Bootcamp";
    
    switch (method) {
      case "POST":
        response = await axios.post(baseUrl, bootcampData);
        break;
      case "PUT":
        if (!id) return json({ error: "ID requerido para actualizar" }, { status: 400 });
        response = await axios.put(`${baseUrl}/${id}`, bootcampData);
        break;
      case "DELETE":
        if (!id) return json({ error: "ID requerido para eliminar" }, { status: 400 });
        response = await axios.delete(`${baseUrl}/${id}`);
        break;
      default:
        return json({ error: "Método no soportado" }, { status: 405 });
    }

    return redirect("/adminPanel");
  } catch (error) {
    console.error("Error en la acción:", error);
    return json({ 
      error: "Error al procesar la solicitud",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
};

export default function AdminPanel() {
  const bootcamps = useLoaderData<Bootcamp[]>();
  const fetcher = useFetcher();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Administración de Bootcamps</h1>
      
      {/* Formulario para agregar nuevo bootcamp */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Bootcamp</h2>
        <Form method="post" className="space-y-4">
          <input type="hidden" name="_method" value="POST" />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre*</label>
            <input 
              type="text" 
              name="nombre" 
              required 
              className="border p-2 rounded w-full" 
              placeholder="Nombre del bootcamp" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción*</label>
            <textarea 
              name="descripcion" 
              required 
              className="border p-2 rounded w-full" 
              placeholder="Descripción del bootcamp" 
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Información Adicional</label>
            <textarea 
              name="informacion" 
              className="border p-2 rounded w-full" 
              placeholder="Información adicional" 
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Costos*</label>
              <input 
                type="number" 
                name="costos" 
                required 
                className="border p-2 rounded w-full" 
                placeholder="0" 
                min="0"
                step="0.01"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID de Institución*</label>
              <input 
                type="number" 
                name="institucionId" 
                required 
                className="border p-2 rounded w-full" 
                placeholder="0" 
                min="1"
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition mt-4"
          >
            Agregar Bootcamp
          </button>
        </Form>
      </div>

      {/* Lista de Bootcamps */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Lista de Bootcamps</h2>
        {Array.isArray(bootcamps) && bootcamps.length > 0 ? (
          <div className="space-y-4">
            {bootcamps.map((bootcamp) => (
              <div key={bootcamp.id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{bootcamp.nombre}</h3>
                    <p className="text-gray-600">{bootcamp.descripcion}</p>
                    <p className="text-sm mt-2">{bootcamp.informacion}</p>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Costos: ${bootcamp.costos}</span>
                      <span className="ml-4">Institución ID: {bootcamp.institucionId}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <fetcher.Form method="post">
                      <input type="hidden" name="_method" value="PUT" />
                      <input type="hidden" name="id" value={bootcamp.id} />
                      <button 
                        type="submit" 
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Editar
                      </button>
                    </fetcher.Form>
                    
                    <fetcher.Form method="post">
                      <input type="hidden" name="_method" value="DELETE" />
                      <input type="hidden" name="id" value={bootcamp.id} />
                      <button 
                        type="submit" 
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
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
          <p className="text-gray-500">No hay bootcamps disponibles.</p>
        )}
      </div>
    </div>
  );
}