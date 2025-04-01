
interface BeneficioProps {
  titulo: string;
  descripcion: string;
}

function Beneficio({ titulo, descripcion }: BeneficioProps) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-md mb-4">
      <div className="flex-grow">
        <h3 className="text-lg font-medium text-gray-800 mb-1">{titulo}</h3>
        <p className="text-gray-600">{descripcion}</p>
      </div>
      <div className="text-3xl text-navy-600">✓</div>
    </div>
  );
}

export default function Beneficios() {
  return (
    <section className="py-8 bg-gray-100">
      <h2 className="text-center text-2xl font-semibold mb-8 text-gray-800">¡Obtén los siguientes beneficios!</h2>
      <div className="max-w-4xl mx-auto">
        <Beneficio
          titulo="Registro y creación del perfil personal"
          descripcion="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
        />
        <Beneficio
          titulo="Guardar oportunidades"
          descripcion="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
        />
        <Beneficio
          titulo="Recomendaciones personalizadas"
          descripcion="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
        />
        <Beneficio
          titulo="Contenido exclusivo"
          descripcion="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
        />
      </div>
    </section>
  );
}

