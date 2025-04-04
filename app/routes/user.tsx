import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/User";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  rol: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    id: null as number | null,
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    rol: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener usuarios del backend
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Error al cargar los usuarios");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Manejar creación de nuevo usuario
  const handleCreate = () => {
    setFormData({
      id: null,
      firstName: "",
      lastName: "",
      birthDate: "",
      email: "",
      rol: ""
    });
    setIsModalOpen(true);
  };

  // Manejar edición de usuario
  const handleEdit = (user: User) => {
    setFormData({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate.split('T')[0], // Formatear fecha para input
      email: user.email,
      rol: user.rol
    });
    setIsModalOpen(true);
  };

  // Manejar envío del formulario (crear/editar)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (formData.id) {
        // Actualizar usuario existente
        await axios.put(`${API_URL}/${formData.id}`, formData);
      } else {
        // Crear nuevo usuario
        await axios.post(API_URL, formData);
      }
      // Refrescar la lista después de guardar
      await fetchUsers();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
      setError(`Error al ${formData.id ? 'actualizar' : 'crear'} el usuario`);
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar eliminación de usuario
  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
    
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Error al eliminar el usuario");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Gestión de Usuarios</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <button 
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4" 
        onClick={handleCreate}
        disabled={isLoading}
      >
        + Agregar Usuario
      </button>

      <table className="w-full border-collapse bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">Nombre</th>
            <th className="p-3">Apellido</th>
            <th className="p-3">Fecha de Nacimiento</th>
            <th className="p-3">Email</th>
            <th className="p-3">Rol</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{user.firstName}</td>
              <td className="p-3">{user.lastName}</td>
              <td className="p-3">{new Date(user.birthDate).toLocaleDateString()}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.rol}</td>
              <td className="p-3 flex gap-2">
                <button 
                  className="bg-yellow-500 text-white px-3 py-1 rounded" 
                  onClick={() => handleEdit(user)}
                  disabled={isLoading}
                >
                  Editar
                </button>
                <button 
                  className="bg-red-600 text-white px-3 py-1 rounded" 
                  onClick={() => handleDelete(user.id)}
                  disabled={isLoading}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {formData.id ? "Editar Usuario" : "Nuevo Usuario"}
            </h2>
            <form onSubmit={handleSubmit}>
              <input 
                className="w-full mb-3 p-2 border rounded" 
                type="text" 
                placeholder="Nombre" 
                value={formData.firstName} 
                onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
                required 
              />
              <input 
                className="w-full mb-3 p-2 border rounded" 
                type="text" 
                placeholder="Apellido" 
                value={formData.lastName} 
                onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
                required 
              />
              <input 
                className="w-full mb-3 p-2 border rounded" 
                type="date" 
                value={formData.birthDate} 
                onChange={(e) => setFormData({...formData, birthDate: e.target.value})} 
                required 
              />
              <input 
                className="w-full mb-3 p-2 border rounded" 
                type="email" 
                placeholder="Email" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                required 
              />
              <select
                className="w-full mb-3 p-2 border rounded"
                value={formData.rol}
                onChange={(e) => setFormData({...formData, rol: e.target.value})}
                required
              >
                <option value="">Seleccione un rol</option>
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
                <option value="editor">Editor</option>
              </select>
              <div className="flex gap-3">
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  disabled={isLoading}
                >
                  {isLoading ? "Guardando..." : "Guardar"}
                </button>
                <button 
                  type="button" 
                  className="bg-gray-500 text-white px-4 py-2 rounded" 
                  onClick={() => setIsModalOpen(false)}
                  disabled={isLoading}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}