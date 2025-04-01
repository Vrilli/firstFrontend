import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { useState } from 'react';


interface LoaderData {
    message: string;
    images: string[];
    opportunities: {
        title: string;
        image: string;
        description: string;
    }[];
}

export let loader: LoaderFunction = async () => {
    return {
        images: [
            "/images/comfama.png",
            "/images/nodo.png",
        ],
        opportunities: [
            {
                title: "Alianza Empresarial - Comfama",
                image: "/images/comfama.png",
                description: "Se enfoca en promover el empleo de mujeres y jóvenes, facilitando su acceso a oportunidades laborales dignas. A través de programas de capacitación en habilidades digitales, liderazgo y emprendimiento ..."
            },
            {
                title: "Alianza Empresarial - Comfama",
                image: "/images/comfama.png",
                description: "Se enfoca en promover el empleo de mujeres y jóvenes, facilitando su acceso a oportunidades laborales dignas. A través de programas de capacitación en habilidades digitales, liderazgo y emprendimiento ..."
            }
        ]
    };
};

const Novedades = () => {
    let data = useLoaderData<LoaderData>();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [expanded, setExpanded] = useState<boolean[]>(new Array(data.opportunities.length).fill(false));

    const nextImage = () => {
        setCurrentImageIndex((currentImageIndex + 1) % data.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((currentImageIndex - 1 + data.images.length) % data.images.length);
    };

    const toggleExpand = (index: number) => {
        setExpanded(expanded.map((exp, i) => (i === index ? !exp : exp)));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', backgroundColor: '#fff', color: '#000', minHeight: '100vh', padding: '20px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Novedades</h1>
            <p>{data.message}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: '100%', maxWidth: '300px', overflow: 'hidden' }}>
                <button onClick={prevImage} style={{ position: 'absolute', left: '0', zIndex: 1 }}>Previous</button>
                <img src={data.images[currentImageIndex]} alt="carousel" style={{ width: '100%', borderRadius: '10px' }} />
                <button onClick={nextImage} style={{ position: 'absolute', right: '0', zIndex: 1 }}>Next</button>
            </div>
            <div style={{ marginTop: '1rem' }}>
                {data.images.map((_, index) => (
                    <span key={index} style={{ height: '10px', width: '10px', margin: '0 5px', backgroundColor: currentImageIndex === index ? '#000' : '#ccc', borderRadius: '50%', display: 'inline-block' }}></span>
                ))}
            </div>
            <div style={{ marginTop: '2rem', width: '100%', maxWidth: '900px', textAlign: 'left', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <input type="text" placeholder="Busca tu próxima oportunidad" style={{ backgroundColor: '#fff', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '1rem' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span>¡Filtra tu búsqueda!</span>
                    <input style={{ backgroundColor: '#fff' }} type="date" />
                    <span>→</span>
                    <input style={{ backgroundColor: '#fff' }} type="date" />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '1rem' }}>
                    <select style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                        <option>Ubicación</option>
                        <option>Medellín, Antioquia</option>
                    </select>
                    <select style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                        <option>Tipo de oportunidad</option>
                        <option>Educativa</option>
                    </select>
                    <select style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                        <option>Sector</option>
                        <option>Tecnología</option>
                    </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#f90', color: '#fff' }}>Búsqueda</button>
                    <button style={{ padding: '10px 20px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#fff' }}>Limpiar</button>
                </div>
            </div>
            <h5 style={{ marginTop: '2rem', fontSize: '1.5rem', fontWeight: 'bold', color: '#003366' }}>¡Oportunidades para estudiar!</h5>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '2rem' }}>
                {data.opportunities.map((opportunity, index) => (
                    <div key={index} style={{ width: 'calc(50% - 20px)', border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden', textAlign: 'left', position: 'relative', maxWidth: '400px' }}>
                        <img src={opportunity.image} alt={opportunity.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                        <div style={{ padding: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{opportunity.title}</h2>
                                <button style={{ padding: '5px 10px', borderRadius: '20px', border: '1px solid #ccc', backgroundColor: '#fff', color: '#000', fontWeight: 'bold' }}>GUARDAR</button>
                            </div>
                            <p>
                                {expanded[index] ? opportunity.description : `${opportunity.description.substring(0, 70)}...`}
                                {opportunity.description.length > 70 && (
                                    <button onClick={() => toggleExpand(index)} style={{ marginLeft: '5px', color: '#007bff', background: 'none', border: 'none', cursor: 'pointer' }}>
                                        {expanded[index] ? 'ver menos' : 'ver más'}
                                    </button>
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Novedades;
