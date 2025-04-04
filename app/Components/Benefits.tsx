Benefits
const check = "/assets/register/icons/check.svg"
export default function Benefits() {
  const gridData = [
    {
      id: 1,
      title: "Registro y creación del perfil personal",
      description: "Crea tu perfil personal para destacar tus logros, habilidades y aspiraciones. Esto te permitirá tener una presencia personalizada dentro de nuestra comunidad, facilitando el acceso a oportunidades adecuadas para ti. ",

    },
    {
      id: 2,
      title: "Guardar oportunidades",
      description: "Encuentra y guarda oportunidades relevantes que se alineen con tus intereses y metas académicas. De esta manera, podrás acceder a ellas fácilmente y no perderte ninguna opción valiosa. ",

    },
    {
      id: 3,
      title: "Recomendaciones personalizadas",
      description: "Recibe sugerencias específicas y adaptadas a tus necesidades y perfil. Nuestro sistema inteligente analizará tus intereses y te brindará recomendaciones que te ayudarán a aprovechar al máximo las oportunidades disponibles. ",

    },
    {
      id: 4,
      title: "Contenido exclusivo",
      description: "Accede a una variedad de recursos y materiales exclusivos, diseñados para apoyarte en tu camino académico y profesional. Estos incluyen guías, webinars, talleres y mucho más, todo pensado para ayudarte a tener éxito. ",

    },

  ]
  return (
    <div>
      <h2 className="text-center text-[#1D1856] font-bold font-raleway text-5xl py-12">¡Obtén los siguientes beneficios!</h2>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4">
        {gridData.map((data) => (
          <div key={data.id} className="">
            <h3 className="text-3xl text-[#FAA307] font-bold font-raleway">{data.title}</h3>
            <p className="text-2xl font-raleway">{data.description}</p>
            <div className="flex justify-end">
              <img src={check} alt="check" />
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}