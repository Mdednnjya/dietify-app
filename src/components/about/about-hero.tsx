import Image from "next/image";

export const AboutHero: React.FC = () => {
  return (
    <section className="pt-20 px-8 md:px-16 flex flex-col items-center text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
        About us
      </h1>
      
      {/* Hero Illustration */}
      <div className="mb-12">
        <Image 
          src="/assets/homepage/hero-section.svg" 
          alt="About us illustration" 
          width={400} 
          height={300} 
          className="w-full max-w-md"
        />
      </div>

      {/* Description */}
      <div className="max-w-4xl mx-auto mb-20">
        <p className="text-lg text-gray-600 leading-relaxed">
          Dietify is a smart diet planning platform designed to help teenagers and adults 
          achieve their health goals through personalized meal recommendations. By 
          combining Content-Based Filtering (CBF) and Particle Swarm Optimization 
          (PSO) technology, we create healthy diet menus tailored to each user's unique 
          needs. We believe that healthy eating should be simple, accessible, and 
          enjoyable.
        </p>
      </div>
    </section>
  );
};