import { TeamMember } from "./team-member";

interface TeamMemberData {
  name: string;
  image?: string;
}

const teamMembers: TeamMemberData[] = [
  { 
    name: "Made Narayan Dananjaya",
    image: "/assets/team/member.svg"
  },
  { 
    name: "Naufal Alif Zhafran",
    image: "/assets/team/member.svg"
  },
  { 
    name: "Ni Nyoman Chandra P. I. W",
    image: "/assets/team/member.svg"
  },
  { 
    name: "Mochammad Bachrul Ulum",
    image: "/assets/team/member.svg"
  },
  { 
    name: "Farrel Azarya Zidan Andika",
    image: "/assets/team/member.svg"
  }
];

export const TeamSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 md:mb-16 text-center text-gray-800">
          Our Team
        </h2>
        
        {/* Responsive Grid Layout */}
        <div className="grid gap-6 sm:gap-8 justify-items-center">
          
          {/* Mobile: 1 column (1+1+1+1+1) */}
          <div className="grid grid-cols-1 gap-6 sm:hidden w-full max-w-xs mx-auto">
            {teamMembers.map((member) => (
              <TeamMember 
                key={member.name}
                name={member.name}
                image={member.image}
              />
            ))}
          </div>

          {/* Tablet: 2+2+1 layout */}
          <div className="hidden sm:grid lg:hidden gap-6 w-full">
            {/* First row - 2 members */}
            <div className="grid grid-cols-2 gap-6 justify-items-center max-w-2xl mx-auto">
              {teamMembers.slice(0, 2).map((member) => (
                <TeamMember 
                  key={member.name}
                  name={member.name}
                  image={member.image}
                />
              ))}
            </div>
            
            {/* Second row - 2 members */}
            <div className="grid grid-cols-2 gap-6 justify-items-center max-w-2xl mx-auto">
              {teamMembers.slice(2, 4).map((member) => (
                <TeamMember 
                  key={member.name}
                  name={member.name}
                  image={member.image}
                />
              ))}
            </div>
            
            {/* Third row - 1 member centered */}
            <div className="flex justify-center">
              <TeamMember 
                name={teamMembers[4].name}
                image={teamMembers[4].image}
              />
            </div>
          </div>

          {/* Desktop: 2+3 layout */}
          <div className="hidden lg:grid gap-8 w-full">
            {/* First row - 2 members centered */}
            <div className="grid grid-cols-2 gap-8 justify-items-center max-w-2xl mx-auto">
              {teamMembers.slice(0, 2).map((member) => (
                <TeamMember 
                  key={member.name}
                  name={member.name}
                  image={member.image}
                />
              ))}
            </div>
            
            {/* Second row - 3 members */}
            <div className="grid grid-cols-3 gap-8 justify-items-center max-w-4xl mx-auto">
              {teamMembers.slice(2).map((member) => (
                <TeamMember 
                  key={member.name}
                  name={member.name}
                  image={member.image}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};