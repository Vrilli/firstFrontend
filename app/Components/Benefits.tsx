const check = "/assets/register/icons/check.svg";

export default function Benefits() {
  const gridData = [
    {
      id: 1,
      title: "Registro y creación del perfil personal",
      description:
        "Crea tu perfil personal para destacar tus logros, habilidades y aspiraciones. Esto te permitirá tener una presencia personalizada dentro de nuestra comunidad, facilitando el acceso a oportunidades adecuadas para ti.",
    },
    {
      id: 2,
      title: "Guardar oportunidades",
      description:
        "Encuentra y guarda oportunidades relevantes que se alineen con tus intereses y metas académicas. De esta manera, podrás acceder a ellas fácilmente y no perderte ninguna opción valiosa.",
    },
    {
      id: 3,
      href: "/img/imagen1.png",
      title: "Recomendaciones personalizadas",
      description:
        "Recibe sugerencias específicas y adaptadas a tus necesidades y perfil. Nuestro sistema inteligente analizará tus intereses y te brindará recomendaciones que te ayudarán a aprovechar al máximo las oportunidades disponibles.",
    },
    {
      id: 4,
      title: "Contenido exclusivo",
      description:
        "Accede a una variedad de recursos y materiales exclusivos, diseñados para apoyarte en tu camino académico y profesional. Estos incluyen guías, webinars, talleres y mucho más, todo pensado para ayudarte a tener éxito.",
    },
  ];

  return (
    <div className="px-10 py-12">
      <h2 className="text-center text-[#1D1856] font-bold font-raleway text-5xl mb-10">
        ¡Obtén los siguientes beneficios!
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {gridData.map((data) => (
          <li
            key={data.id}
            className="bg-muted shadow-lg rounded-lg p-6 text-justify dark:bg-[#0f1629] transform transition-transform hover:scale-105"
          >
            <div className="flex flex-col justify-center items-center gap-4">
              <img src={data.href} alt="Check icon" />
              <h3 className="text-3xl text-[#FAA307] font-bold font-raleway">{data.title}</h3>
            </div>
            <p className="text-2xl font-raleway mt-2">{data.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
