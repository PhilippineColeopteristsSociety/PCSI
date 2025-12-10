import React from "react";
import Container from "@/components/common/Container";
import SubPageHero from "@/components/common/SubPageHero";
import { images } from "@/constants/images";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function EditorialBoard() {
  // Editorial Board structure
  const editorialBoard = {
    editorInChief: {
      name: "Dr. Milton Norman D. Medina",
      affiliation: "Davao Oriental State University, Mati City, Philippines",
    },
    managingEditor: {
      name: "Jhonnel P. Villegas",
      affiliation: "Davao Oriental State University, Mati City, Philippines",
    },
    publishingEditors: [
      {
        name: "Efhrain Loidge Pajota",
        affiliation: "University of Mindanao, Davao City Philippines",
      },
      {
        name: "Mark John Pepito",
        affiliation: "University of Mindanao, Davao City Philippines",
      },
    ],
    administrativeAndFinanceOfficer: {
      name: "Dr. Ricksterlie Verzosa",
      affiliation: "Davao Oriental State University, Mati City, Philippines",
    },
    subjectReviewersAndAdvisors: [
      {
        name: "Dr. Robert Anderson",
        affiliation: "Canada Museum of Nature, Ottawa, Canada",
        specialty: "Order Coleoptera (Curculionidae)",
      },
      {
        name: "Dr. Arvids Barsevskis",
        affiliation: "Daugavpils University, Daugavpils, Latvia",
        specialty: "Order Coleoptera (Cerambycidae)",
      },
      {
        name: "Dr. Cecilia P. Reyes",
        affiliation: "Research Associate, Philippine National Museum, Manila, Philippines",
        specialty: "Order Thysanoptera",
      },
      {
        name: "Dr. Reagan Joseph T. Villanueva",
        affiliation: "Southern Philippines Medical Center, Davao City Philippines",
        specialty: "Order Odonata",
      },
      {
        name: "Dr. Orlando Calcetas",
        affiliation: "Department of Agriculture, Philippines",
        specialty: "Order Coleoptera (Scarabidae, Chrysomelidae, Insect Pests)",
      },
      {
        name: "Dr. Francesco Vitali",
        affiliation: "Musée national d'histoire naturelle de Luxembourg, Luxembourg, Luxembourg",
        specialty: "Order Coleoptera (Cerambycidae)",
      },
      {
        name: "Dr. Eduard Vives",
        affiliation: "Natural Science Museum of Barcelona, Spain",
        specialty: "Order Coleoptera (Cerambycidae)",
      },
      {
        name: "Dr. Alexander Anichtchenko",
        affiliation: "Daugavpils University, Daugavpils, Latvia",
        specialty: "Order Coleoptera (Carabidae)",
      },
      {
        name: "Dr. Matthew van Dam",
        affiliation: "California Academy of Sciences, San Francisco, California, USA",
        specialty: "Molecular Genetics & Bioinformatics",
      },
      {
        name: "Dr. Lorenzo Pancini",
        affiliation: "World Biodiversity Association, Italy",
        specialty: "Order Coleoptera (Curculionidae in Indo-Australian and Malayan Regions)",
      },
      {
        name: "Dr. Larry Bezark",
        affiliation: "California Department of Food and Agriculture (retired), USA",
        specialty: "Order Coleoptera (Cerambycidae)",
      },
      {
        name: "Dr. Simpron Crispolon Elorde Jr.",
        affiliation: "University of Southern Mindanao, Kabacan, Philippines",
        specialty: "Order Hemiptera (Cercopoidea)",
      },
      {
        name: "Perry Archival C. Buenavente",
        affiliation: "Philippine National Museum, Manila, Philippines",
        specialty: "Order Hymenoptera (Ants)",
      },
      {
        name: "Dr. Yesenia Marquez Lopez",
        affiliation: "Universidad Autónoma Metropolitana, Ciudad de México, Mexico",
        specialty: "Order: Neuroptera (Ascalaphinae)",
      },
      {
        name: "Dr. Arvin Diesmos",
        affiliation: "ASEAN Centre for Biodiversity, Laguna, Philippines",
        specialty: "Insect Ecology and Biogeography",
      },
      {
        name: "Dr. Sigvald Kristensen",
        affiliation: "Philippine Coleopterists Society Inc., Philippines Danish Museum of Natural History, Denmark (retired)",
        specialty: "Order Coleoptera (General Beetles)",
      },
    ],
  };

  // Sort publishing editors alphabetically by first name
  const sortedPublishingEditors = [...editorialBoard.publishingEditors].sort((a, b) => {
    const getFirstName = (fullName) => {
      const parts = fullName.split(' ');
      return parts[0].startsWith('Dr.') ? parts[1] : parts[0];
    };
    
    const firstNameA = getFirstName(a.name).toLowerCase();
    const firstNameB = getFirstName(b.name).toLowerCase();
    
    return firstNameA.localeCompare(firstNameB);
  });

  // Sort subject reviewers and advisors alphabetically by first name
  const sortedReviewers = [...editorialBoard.subjectReviewersAndAdvisors].sort((a, b) => {
    const getFirstName = (fullName) => {
      const parts = fullName.split(' ');
      return parts[0].startsWith('Dr.') ? parts[1] : parts[0];
    };
    
    const firstNameA = getFirstName(a.name).toLowerCase();
    const firstNameB = getFirstName(b.name).toLowerCase();
    
    return firstNameA.localeCompare(firstNameB);
  });

  return (
    <div className="min-h-screen bg-white">
      <SubPageHero />
      <Container className="py-10">
        {/* Main Heading */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-4xl font-bold mb-2">
            Asian Journal of Insect Science (AJIS)
          </h1>
          <h2 className="font-serif text-1xl md:text-2xl text-gray-600 font-semibold">
            Editorial Board
          </h2>
        </div>

        <div className="mt-8">
          {/* Editor-In-Chief */}
          <div className="mt-8">
            <h3 className="font-serif text-1xl md:text-1xl">
              <i>Editor-In-Chief</i>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>{editorialBoard.editorInChief.name}</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              {editorialBoard.editorInChief.affiliation}
            </h3>
          </div>
          {/* Managing Editor */}
          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <i>Managing Editor</i>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>{editorialBoard.managingEditor.name}</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              {editorialBoard.managingEditor.affiliation}
            </h3>
          </div>
          {/* Publishing Editors */}
          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <i>Publishing Editors</i>
            </h3>
            {sortedPublishingEditors.map((editor, index) => (
              <div key={index}>
                <h3 className="font-serif text-1xl md:text-1xl">
                  <b>{editor.name}</b>
                </h3>
                <h3 className="font-serif text-1xl md:text-1xl">
                  {editor.affiliation}
                </h3>
              </div>
            ))}
          </div>
          {/* Administrative and Finance Officer */}
          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <i>Administrative and Finance Officer</i>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>{editorialBoard.administrativeAndFinanceOfficer.name}</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              {editorialBoard.administrativeAndFinanceOfficer.affiliation}
            </h3>
          </div>
          {/* Subject reviewers and advisors */}
          <div className="mt-6">
            <h3 className="font-serif text-1xl md:text-1xl">
              <i>Subject reviewers and advisors</i>
            </h3>
          </div>
          {sortedReviewers.map((reviewer, index) => (
            <div key={index} className="mt-4">
              <h3 className="font-serif text-1xl md:text-1xl">
                <b>{reviewer.name}</b>
              </h3>
              <h3 className="font-serif text-1xl md:text-1xl">
                {reviewer.affiliation}
              </h3>
              <h3 className="font-serif text-1xl md:text-1xl">
                {reviewer.specialty}
              </h3>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default EditorialBoard;
