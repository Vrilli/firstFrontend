// app/routes/novedades.tsx
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { useState } from 'react';
import Carrusel from '~/components/Carrusel/Carrusel';

type Oportunidad = {
  id: number;
  tipo: string;
  region: string;
  enlace: string;
  descripcion: string;
  imagen: string; // Nueva propiedad para la imagen de la card
};

export const loader: LoaderFunction = async () => {
  // Datos de ejemplo (reemplázalos con tu API)
  return [
    {
      id: 1,
      tipo: "Académicas",
      institucion: "Colegio Mayor de Antioquia",
      Ubicación: "NOROCCIDENTAL.Calle 65#77-126 Robledo - Medellín.",
      enlace: "https://productivo.d3oqu2aya0okgm.amplifyapp.com/Colegio-mayor-antioquia.html",
      descripcion: "El Colegio Mayor de Antioquia fomenta procesos de generación, transformación y difusión del conocimiento. Ofrece 10 carreras profesionales, 10 tecnologías, 4 espacializaciones y 1 maestría.",
      imagen: "/img/Colegio_Mayor.png", // Añade tus rutas de imágenes
    },
    {
      id: 2,
      tipo: "Formativas",
      institucion: "Cursos Virtuales SENA",
      enlace: "https://productivo.d3oqu2aya0okgm.amplifyapp.com/Curso-Virtual-Sena.html",
      descripcion: "Actualmente el SENA cuenta con más de 300 cursos totalmente gratuitos en su modalidad virtual, en diferentes categorías...",
      imagen: "/img/SENA.png",
    },
    {
        id: 3,
        tipo: "Socioeconómicas",
        institucion: "Beca Universidad EAFIT",
        enlace: "https://productivo.d3oqu2aya0okgm.amplifyapp.com/Beca-eafit.html",
        descripcion: "La Universidad EAFIT ofrece un program​​a de becas que comprende los servicios de apoyo para el aprendizaje, el desempeño académico y el crecimiento personal de los estudiantes...",
        imagen: "/img/U_Eafit.png",
      },
      {
        id: 4,
        tipo: "Académicas",
        institucion: "ESA Débora Arango",
        Ubicación: "SUR . CALLE 39 SUR 39-8 Envigado, Antioquia.",
        enlace: "https://productivo.d3oqu2aya0okgm.amplifyapp.com/Debora-arango.html",
        descripcion: "La Escuela Superior Tecnológica de Artes Débora Arango es reconocida por fomentar el arte a sus estudiantes. Ofrece 8 Tecnologías y 8 técnicas.",
        imagen: "/img/Debora_Arango.png",
      },
      {
        id: 5,
        tipo: "Formativas",
        institucion: "Arroba Medellín",
        enlace: "https://productivo.d3oqu2aya0okgm.amplifyapp.com/Arroba-Medellin.html",
        descripcion: "Arroba Medellín es la Ciudadela Universitaria Digital de Medellín, la cuál nace en torno a las tres instituciones de educación superior de la alcaldía.",
        imagen: "/img/@Medellin.jpg",
      },
      {
        id: 6,
        tipo: "Socioeconómicas",
        institucion: "Becas Sin Fronteras",
        enlace: "https://productivo.d3oqu2aya0okgm.amplifyapp.com/Beca-fronteras.html",
        descripcion: "Becas Sin Fronteras es un sitio web que aglomera ofertas de becas en latinoamérica y el mundo para estudiantes y profesionales latinos...",
        imagen: "/img/Sin_Fronteras.jpg",
      },
      {
        id: 7,
        tipo: "Académicas",
        institucion: "Universidad Católica Luis Amigó",
        Ubicación: "CENTRO OCCIDENTAL Transversal 51A #67B 90.",
        enlace: "https://productivo.d3oqu2aya0okgm.amplifyapp.com/Universidad-Luis-Amigo.html",
        descripcion: "La Universidad Católica Luis Amigó se destaca por ser excelente en el área de las humanidades. Ofrece 17 pregrados, 3 técnicas y 2 tecnologías.",
        imagen: "/img/LuisAmigo.png",
      },
      {
        id: 8,
        tipo: "Formativas",
        institucion: "Cursos Comfama",
        enlace: "https://www.comfama.com/",
        descripcion: "Nutre tu alma, mente, cuerpo y espíritu con con nuestra amplia gama de productos educativos y planes personalizados.",
        imagen: "/img/comfama.png",
      },
      {
        id: 9,
        tipo: "Socioeconómicas",
        institucion: "Becas Universidad CES",
        enlace: "https://productivo.d3oqu2aya0okgm.amplifyapp.com/Beca-CES.html",
        descripcion: "La universidad CES ofrece una serie de becas para aspirantes a cualquier programa académico de la institución y también para estudiantes universitarios activos en el CES.",
        imagen: "/img/CES.png",
      }
    ];
  };

  export default function NovedadesPage() {
    const oportunidadesIniciales = useLoaderData<Oportunidad[]>();
    const [filtros, setFiltros] = useState({
      tipo: "",
      institucion: "",
    });
    const [buscando, setBuscando] = useState(false); // Estado para el spinner
  
    const oportunidadesFiltradas = oportunidadesIniciales.filter((op) => {
      return (
        (filtros.tipo === "" || op.tipo === filtros.tipo) &&
        (filtros.institucion === "" || op.institucion.toLowerCase().includes(filtros.institucion.toLowerCase()))
      );
    });
  
    const handleBuscar = () => {
      setBuscando(true);
      // Simulamos un pequeño delay para que se vea el spinner
      setTimeout(() => setBuscando(false), 500);
    };
  
    return (
      <div className="max-w-6xl mx-auto p-4 font-sans">
        {/* Carrusel */}
        <Carrusel />
  
        {/* Filtros */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Filtra tu búsqueda:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Campo de Institución */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Institución</label>
              <div className="flex">
                <input
                  type="text"
                  className="w-full p-2 border rounded-l-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Universidad EAFIT"
                  value={filtros.institucion}
                  onChange={(e) => setFiltros({ ...filtros, institucion: e.target.value })}
                />
                {/* Spinner en lugar de flecha */}
                <button 
                  className={`bg-gray-100 px-3 rounded-r-md flex items-center justify-center ${
                    buscando ? 'w-10' : 'w-10'
                  }`}
                  onClick={handleBuscar}
                >
                  {buscando ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-900"></div>
                  ) : (
                    <span className="text-gray-500">🔍</span> // O puedes usar un ícono de lupa
                  )}
                </button>
              </div>
            </div>
  
            {/* Selector de Tipo */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Tipo de oportunidad</label>
              <select
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                value={filtros.tipo}
                onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
              >
                <option value="">Todos</option>
                <option value="Académicas">Académicas</option>
                <option value="Formativas">Formativas</option>
                <option value="Socioeconómicas">Socioeconómicas</option>
              </select>
            </div>
          </div>
  
          <div className="mt-4 flex justify-end">
            <button 
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
              onClick={handleBuscar}
            >
              Búsqueda
            </button>
          </div>
        </div>
  
        {/* Título */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">¡Oportunidades para estudiar!</h2>
        </div>
  
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {oportunidadesFiltradas.map((op) => (
            <div key={op.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200">
                <img src={op.imagen} alt={op.tipo} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 text-gray-800">{op.tipo}</h3>
                <p className="text-gray-600 mb-1"><span className="font-medium">Institución:</span> {op.institucion}</p>
                <p className="text-gray-700 mb-3">{op.descripcion}</p>
                {/* Enlace que abre en nueva pestaña */}
                <a 
                  href={op.enlace} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Ver más
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }