

interface ServiceCard {
  className?: string;
  link: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

export default function OpportunityCard({
  imageSrc,
  imageAlt,
  title,
  description,
}: ServiceCard) {
  return (
    <div
      className={`bg-muted shadow-lg rounded-lg overflow-hidden m-5 transform transition-transform hover:scale-105 w-72 text-justify dark:bg-[#0f1629] h-full`}>
      <img src={imageSrc} alt={imageAlt} className="w-full h-48 object-cover mb-3 rounded-lg" />
      <div className="p-4">
        <h3 className="text-xl mb-3 text-center">{title}</h3>
        <p className="text-center text-card-foreground dark:text-[#a8afc4]">{description}</p>
      </div>
    </div>
  );
}
