import { Link } from "@remix-run/react";

interface ServiceCard {
  className?: string;
  link: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  buttonText: string;
}

export default function ServiceCard({
  imageSrc,
  imageAlt,
  title,
  description,
  buttonText,
}: ServiceCard) {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg overflow-hidden m-5 transform transition-transform hover:scale-105 w-72 text-center dark:bg-[#0f1629]`}
    >
      <img src={imageSrc} alt={imageAlt} className="w-full object-cover mb-3 rounded-t-lg" />
      <div className="p-6">
        <h3 className="text-xl mb-3 text-center">{title}</h3>
        <p className="text-gray-700 mb-8 dark:text-[#a8afc4]">{description}</p>
        <Link
          to="/register"
          className="text-[#fdc80a] border border-[#FDC80A] py-2 px-4 rounded hover:bg-[#faa307] hover:text-white"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
