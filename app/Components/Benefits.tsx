
export default function Benefits() {
  const gridData = [
    {
      id: 1,
      href: "/img/81.png",
      title: "Registro y creación del perfil personal",
      description:
        "Crea tu perfil personal para destacar tus logros, habilidades y aspiraciones. Esto te permitirá tener una presencia personalizada dentro de nuestra comunidad, facilitando el acceso a oportunidades adecuadas para ti.",
    },
    {
      id: 2,
      href: "/img/82.png",
      title: "Guardar oportunidades",
      description:
        "Encuentra y guarda oportunidades relevantes que se alineen con tus intereses y metas académicas. De esta manera, podrás acceder a ellas fácilmente y no perderte ninguna opción valiosa.",
    },
    {
      id: 3,
      href: "/img/83.png",
      title: "Recomendaciones personalizadas",
      description:
        "Recibe sugerencias específicas y adaptadas a tus necesidades y perfil. Nuestro sistema inteligente analizará tus intereses y te brindará recomendaciones que te ayudarán a aprovechar al máximo las oportunidades disponibles.",
    },
    {
      id: 4,
      href: "img/84.png",
      title: "Contenido exclusivo",
      description:
        "Accede a una variedad de recursos y materiales exclusivos, diseñados para apoyarte en tu camino académico y profesional. Estos incluyen guías, webinars, talleres y mucho más, todo pensado para ayudarte a tener éxito.",
    },
  ];

  return (
    <div className="px-10  py-12">
      <h2 className="text-center dark: text-[#32526e] font-Roboto text-3xl mb-5">
        ¡Obtén los siguientes beneficios!
      </h2>
      <ul className="flex flex-wrap justify-center gap-10 mt-12 ">
        {gridData.map((data) => (
          <li
            key={data.id}
            className="bg-white rounded-lg shadow-md m-4 w-64 text-center p-4 transform transition-transform dark:bg-[#283446]"
          >
            <div className="flex flex-col justify-center items-center gap-10 m-12">
              <img src={data.href} alt="Check icon" />
              <h3 className="text-lg text-[#FDC80A] font-Rebol">{data.title}</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-[#a8afc4]">{data.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
