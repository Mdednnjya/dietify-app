import Image from "next/image";

interface TeamMemberProps {
  name: string;
  image?: string;
  className?: string;
}

export const TeamMember: React.FC<TeamMemberProps> = ({ 
  name, 
  image = "/api/placeholder/200/200", 
  className = "" 
}) => {
  return (
    <div
      className={`bg-white border border-gray-100 rounded-md shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-4 sm:p-5 max-w-xs w-full flex flex-col items-center text-center ${className}`}
    >
      <div className="mb-3 sm:mb-4 w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 bg-gray-200 rounded-md overflow-hidden">
        <Image 
          src={image} 
          alt={name} 
          width={200} 
          height={200}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 px-2">{name}</h3>
      <div className="w-16 sm:w-20 h-0.5 bg-[#e63946] mt-2 rounded-full"></div>
    </div>
  );
};
