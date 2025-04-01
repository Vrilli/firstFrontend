import { useEffect, useRef } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url?: string;
      };
    }
  }
}

const Hero: React.FC = () => {
  const splineViewerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const removeSplineLogo = () => {
      if (splineViewerRef.current) {
        const shadowRoot = (splineViewerRef.current as any).shadowRoot;
        const interval = setInterval(() => {
          const logoElement = shadowRoot?.querySelector("#logo");
          if (logoElement) {
            logoElement.remove();
            clearInterval(interval);
          }
        }, 500);
      }
    };

    removeSplineLogo();
  }, []);


  return (
    <div className="grid gap-4 md:grid-cols-2 md:items-center text-center w-full pb-14 dark:bg-[#0f1629] bg-slate-200">
      <div className="xl:ml-28 w-full md:w-2/3 p-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1D1856] pt-8 md:pt-16 mb-4 md:mb-8 mt-10 md:mt-20 dark:text-[#12a6e8]">
          ¡Tu futuro inicia aquí!
        </h1>
        <p className="text-base md:text-lg mb-4 dark:text-[#a8afc4] text-[#1D1856]">
          En la Fundación Antivirus para la Deserción creemos que cada persona merece acceso a las mejores oportunidades.
          Por eso, ofrecemos una plataforma personalizada donde puedes explorar becas, cursos y programas adaptados a tus intereses y necesidades.</p>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10 mt-8 justify-center items-center">
          <a href="#footer" className=" bg-[#ffba08] text-white px-6 py-3 rounded hover:bg-[#ff9c08] hover:scale-105">Contáctanos</a>
          <a href="https://api.whatsapp.com/send?phone=573217066273&text=phone_number&app_absent=0" target="_blank" className="bg-[#ffba08] text-white px-6 py-3 rounded hover:bg-[#ff9c08] hover:scale-105">Conoce sobre nosotros</a>
        </div>
      </div>
      <div className="w-full h-64 md:h-96 mt-8 flex justify-center items-center xl:h-[510px] xl:pr-20 box">
        <script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.79/build/spline-viewer.js"></script>
        <spline-viewer ref={(el) => (splineViewerRef.current = el)} url="https://prod.spline.design/w1-lU03AK-Pryggi/scene.splinecode"></spline-viewer>
      </div>
    </div>
  );
};

export default Hero;




