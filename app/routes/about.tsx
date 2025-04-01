import axios from "axios";
import { useEffect, useState } from "react";

const About = () => {
  const [images, setImages] = useState<{ fileName: string; url: string; name: string; position: string }[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/images")
      .then((res) => {
        console.log("Data:", res.data);
        setImages(res.data);
      })
      .catch((err) => console.error(err));

  }, []);

  return (
    <div className="bg-[#e2e8f0] pt-36 pb-5">
      <h1 className="text-[#fdc80a] text-[36px] font-bold text-center">¿QUIÉNES SOMOS?</h1>
      <h3 className="text-xl font-bold mt-[50px] text-[#1d1856] text-center">
        SOMOS UNA ORGANIZACIÓN SIN ÁNIMO DE LUCRO QUE
      </h3>
      <p className="mt-[32px] text-center text-[#374151]">
        Busca disminuir los niveles de deserción estudiantil en Colombia, mejorar los niveles de
        permanencia y de graduación, siendo esta nuestra manera de aportar al logro de un país con
        más educación y consecuentemente con más desarrollo.
      </p>

      <section className="mx-auto px-8 dark:bg-[#0f1629] mt-10">
        <div className="flex flex-wrap justify-center">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-16 max-w-screen-lg">
            {images.map((img) => (
              <div
                key={img.fileName}
                className="relative group overflow-hidden rounded-xl shadow-lg bg-transparent backdrop-blur-0 border border-gray-200/30"
              >
                {/* Capa de hover animada */}
                <div className="absolute inset-0 bg-yellow-400/80 w-0 group-hover:w-full transition-all duration-500 ease-in-out z-10 origin-left rounded-xl"></div>

                {/* Texto animado */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-2 space-y-1">
                  <h2 className="text-white text-base md:text-lg font-semibold transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 ease-in-out">
                    {img.name}
                  </h2>
                  <h2 className="text-white text-sm md:text-base font-medium transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 ease-in-out">
                    {img.position}
                  </h2>
                </div>
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-auto rounded-xl bg-transparent"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6 px-16 mt-20">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-[#1d1856]">TEORÍA DEL CAMBIO</h2>
          <p className="text-base text-[#374151] font-normal">Identificar estudiantes con vulnerabilidades y acompañarlos integralmente, a través de un ecosistema de estrategias centrado en lo académico, económico y socioemocional para la permanencia.</p>
          <h2 className="text-2xl font-bold text-[#1d1856]">MISIÓN</h2>
          <p className="text-base text-[#374151] font-normal">Aumentar las tasas de graduación de estudiantes de carreras y programas en áreas de tecnología, a través de estrategias de promoción de la permanencia y prevención de la deserción.</p>
          <h2 className="text-2xl font-bold text-[#1d1856]">VISIÓN</h2>
          <p className="text-base text-[#374151] font-normal">En 5 años vamos a tener presencia a nivel nacional, en las 10 mejores universidades del país, donde habremos disminuido la tasa de deserción en 10 puntos porcentuales (del 50 al 40%). Además, vamos a estar replicando un modelo que es referente, cuyo éxito se puede medir cualitativa y cuantitativamente.</p>
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-[#1d1856]">VALORES</h2>
          <p className="text-base text-[#374151] font-normal">En la Fundación Antivirus para la Deserción hacemos nuestro trabajo de forma colaborativa, con pasión, integridad, autonomía, empatía, compromiso y compañerismo. Somos solidarios e innovadores y tenemos una gran vocación de servicio.</p>
          <h2 className="text-2xl font-bold text-[#1d1856]">PROPÓSITO</h2>
          <p className="text-base text-[#374151] font-normal">Construir un país próspero, pacífico, armonioso, tecnológico y competitivo, en el cual todos los jóvenes tienen acceso a la educación y son buenos seres humanos, con metas y empoderados de sus vidas. Gracias a esto, lograremos superar la pobreza y nos convertiremos en un referente de desarrollo.</p>
          <h2 className="text-2xl font-bold text-[#1d1856]">PÚBLICO OBJETIVO</h2>
          <p className="text-base text-[#374151] font-normal">Trabajamos con estudiantes de carreras y programas TI de Educación Media y Postsecundaria. Enfocamos nuestra intervención en estudiantes vulnerables a la deserción.</p>
        </div>
      </section>
      <section className="grid md:grid-cols-2 gap-6 px-16 mt-10">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-[#1d1856]">PRIORIDADES</h2>
          <ul className="list-disc ml-5 text-gray-700 dark:text-[#a8afc4]">
            <li className="text-base text-[#374151] font-normal">Consolidar un modelo con procesos de identificación de vulnerabilidades, intervención e indicadores de resultados.</li>
            <li className="text-base text-[#374151] font-normal">Explorar modelos de intervención desde los colegios para aportar a reducir la deserción en educación superior.
            </li>
            <li className="text-base text-[#374151] font-normal">Conocer e involucrar a otros actores en el trabajo por la permanencia (Rectores, Decanos, MEN, Empresas, entre otros).</li>
            <li className="text-base text-[#374151] font-normal">Ayudar a reducir la deserción en otras universidades y programas para afinar nuestro modelo y generar ingresos que aporten a la sostenibilidad de la Fundación Antivirus.</li>
          </ul>
        </div>
        <div>
          <img className="rounded-md shadow-md" src="/public/imgAbout/image.jpeg" alt="image" />
        </div>
      </section>
    </div>
  );
};

export default About;
