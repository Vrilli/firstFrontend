import OpportunityCard from "~/components/home/opportunityCard";

export default function Opportunity() {
  return (
    <section id="opportunity" className="py-12 w-full dark:bg-[#283747] text-black dark:text-white">
      <h2 className="text-3xl text-[#32526E] text-center mb-5 dark:text-[#a8afc4]">¡Descubre estas oportunidades únicas!</h2>
      <div className="flex justify-center flex-wrap">
        <div className="justify-center max-w-screen-lg mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
          
        <a href="https://es.nodoeafit.com/" target="_blank">
        <OpportunityCard
            className=""
            link=""
            imageSrc="/img/nodo.png"
            imageAlt="Nodo Eafit"
            title="Nodo Eafit"
            description="Participa en programas de formación y talleres en la Universidad EAFIT en el área de la tecnología para potenciar tus habilidades y conocimientos. ¡Inscríbete hoy!"
          />
        </a>
        <a href="https://velezreyesmas.com/" target="_blank">
          <OpportunityCard
            className=""
            link=""
            imageSrc="/img/velez.png"
            imageAlt="Becas vélezreyes+"
            title="Becas vélezreyes+"
            description="Ofrecen apoyo financiero a estudiantes destacados. Solicita tu beca y alcanza tus metas educativas."
          />
             </a>
                 <a href="https://www.comfama.com/trabajo-con-proposito/empleo/centro-de-empleo-para-la-industria-digital/" target="_blank">
          <OpportunityCard
            className=""
            link=""
            imageSrc="/img/comfama.jpg"
            imageAlt="Comfama"
            title="Comfama"
            description="Accede a programas educativos y recreativos con Comfama. Encuentra la oportunidad perfecta para tu crecimiento personal y profesional."
          />
             </a>
        </div>
      </div>
    </section>
  )
}

