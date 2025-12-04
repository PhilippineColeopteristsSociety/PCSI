import React from "react";
import Container from "@/components/common/Container";
import { Separator } from "@/components/ui/separator";
import { useInView } from "@/hooks/useInView";
import { images } from "@/constants/images";

function OrganizationalStructure() {
  const teamMembers = [
    {
      name: "Dr. Milton Norman B. Medina",
      position: "Founding President",
      image: images.milton, // Using placeholder image
      affiliation: "",
    },
    {
      name: "Dr. Jhonnel P. Villegas",
      position: "Founding Secretary",
      image: images.jhonnel, // Using placeholder image
      affiliation: "",
    },
    {
      name: "Dr. Ricksterlie Verzosa",
      position: "Founding Treasurer",
      image: images.ricksterlie, // Using placeholder image
      affiliation: "",
    },
    {
      name: "Mark John Pepito",
      position: "Founding Member of the Board",
      image: images.markjhon, // Using placeholder image
      affiliation: "University of Mindanao, Davao City, Philippines",
    },
    {
      name: "Efrain Loidge Pajota",
      position: "Founding Member of the Board",
      image: images.efrain, // Using placeholder image
      affiliation: "University of Mindanao, Davao City, Philippines",
    },
  ];

  // Create refs and inView states for all team members at the top level
  const [ref1, isInView1] = useInView({ threshold: 0.1 });
  const [ref2, isInView2] = useInView({ threshold: 0.1 });
  const [ref3, isInView3] = useInView({ threshold: 0.1 });
  const [ref4, isInView4] = useInView({ threshold: 0.1 });
  const [ref5, isInView5] = useInView({ threshold: 0.1 });

  const memberRefs = [ref1, ref2, ref3, ref4, ref5];
  const memberInView = [isInView1, isInView2, isInView3, isInView4, isInView5];

  return (
    <Container
      className="py-20"
    >
      <div className="mb-12">
        <h1 className="font-serif text-center font-bold text-3xl md:w-1/2 mx-auto mb-2">
          Meet the dedicated team leading the Philippine Coleopterological
          Society, Inc.
        </h1>
        {/* <p className="text-md text-gray-600 max-w-2xl mb-2">
          Meet the dedicated team leading the Philippine Coleopterological
          Society, Inc.
        </p> */}
        {/* <Separator /> */}
      </div>

      <div className="space-y-12">
        {/* Founding President, Secretary, and Treasurer */}
        <div className="space-y-8">
          {teamMembers.slice(0, 3).map((member, index) => (
            <div
              key={index}
              ref={memberRefs[index]}
              className={`text-center ${
                memberInView[index]
                  ? `animate-float-in animation-delay-${index * 100}`
                  : "opacity-0"
              }`}
            >
              <div className="relative mb-1">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-36 h-36 mx-auto rounded-full border-4 border-dark-green"
                />
              </div>
              <h3
                className={`text-xl font-semibold text-gray-900 mb-1 ${
                  memberInView[index]
                    ? `animate-fade-in-text animation-delay-${
                        index * 100 + 100
                      }`
                    : "opacity-0"
                }`}
              >
                {member.name}
              </h3>
              <p
                className={`text-dark-green font-medium mb-2 ${
                  memberInView[index]
                    ? `animate-fade-in-text animation-delay-${
                        index * 100 + 200
                      }`
                    : "opacity-0"
                }`}
              >
                {member.position}
              </p>
              {member.affiliation && (
                <p
                  className={`text-dark-green text-sm ${
                    memberInView[index]
                      ? `animate-fade-in-text animation-delay-${
                          index * 100 + 300
                        }`
                      : "opacity-0"
                  }`}
                >
                  {member.affiliation}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Founding Members of the Board */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-8">
            Founding Members of the Board
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {teamMembers.slice(3).map((member, index) => (
              <div
                key={index}
                ref={memberRefs[index + 3]}
                className={`text-center mb-8 ${
                  memberInView[index + 3]
                    ? `animate-float-in animation-delay-${(index + 3) * 100}`
                    : "opacity-0"
                }`}
              >
                <div className="relative mb-1">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-36 h-36 mx-auto rounded-full border-4 border-dark-green"
                  />
                </div>
                <h4
                  className={`text-xl font-semibold text-gray-900 mb-1 ${
                    memberInView[index + 3]
                      ? `animate-fade-in-text animation-delay-${
                          (index + 3) * 100 + 100
                        }`
                      : "opacity-0"
                  }`}
                >
                  {member.name}
                </h4>
                <p
                  className={`text-dark-green text-sm ${
                    memberInView[index + 3]
                      ? `animate-fade-in-text animation-delay-${
                          (index + 3) * 100 + 200
                        }`
                      : "opacity-0"
                  }`}
                >
                  {member.affiliation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default OrganizationalStructure;
