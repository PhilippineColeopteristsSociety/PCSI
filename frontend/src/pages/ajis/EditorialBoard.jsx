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
              <b>Dr. Milton Norman D. Medina</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Davao Oriental State University, Mati City, Philippines
            </h3>
          </div>

          {/* Managing Editor */}
          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <i>Managing Editor</i>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>Jhonnel P. Villegas</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Davao Oriental State University, Mati City, Philippines
            </h3>
          </div>

          {/* Publishing Editors */}
          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <i>Publishing Editors</i>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>Efhrain Loidge Pajota & Mark John Pepito</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              University of Mindanao, Davao City Philippines
            </h3>
          </div>

          {/* Administrative and Finance Officer */}
          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <i>Administrative and Finance Officer</i>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>Dr. Ricksterlie Verzosa</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Davao Oriental State University, Mati City, Philippines
            </h3>
          </div>

          <div className="mt-6">
            <h3 className="font-serif text-1xl md:text-1xl">
              <i>Subject reviewers and advisors</i>
            </h3>
          </div>

          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>Dr. Robert Anderson</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Canada Museum of Nature, Ottawa, Canada
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Order Coleoptera (Curculionidae)
            </h3>
            
          </div>

          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>Dr. Arvids Barsevskis</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Daugavpils University, Daugavpils, Latvia
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Order Coleoptera (Cerambycidae)
            </h3>
            
          </div>

          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>Dr. Cecilia P. Reyes</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Research Associate, Philippine National Museum, Manila,
              Philippines
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Order Thysanoptera
            </h3>
            
          </div>

          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>Dr. Reagan Joseph T. Villanueva</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Southern Philippines Medical Center, Davao City Philippines
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">Order Odonata</h3>
            
          </div>

          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>Dr. Orlando Calcetas</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Department of Agriculture, Philippines
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Order Coleoptera (Scarabidae, Chrysomelidae, Insect Pests)
            </h3>
            
          </div>

          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>Dr. Francesco Vitali</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Musée national d'histoire naturelle de Luxembourg, Luxembourg,
              Luxembourg
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Order Coleoptera (Cerambycidae)
            </h3>
            
          </div>

          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>Dr. Eduard Vives</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Natural Science Museum of Barcelona, Spain
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Order Coleoptera (Cerambycidae)
            </h3>
            
          </div>

          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>Dr. Alexander Anichtchenko</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Daugavpils University, Daugavpils, Latvia
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Order Coleoptera (Carabidae)
            </h3>
            
          </div>

          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>Dr. Matthew van Dam</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              California Academy of Sciences, San Francisco, California, USA
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Molecular genetics, bioinformatics, xxxxxxxxxx
            </h3>
            
          </div>

          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>Dr. Athena Lam</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              California Academy of Sciences, San Francisco, California, USA
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Molecular genetics, bioinformatics, xxxxxxxxxx
            </h3>
            
          </div>

          {/* <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>Dr. Enrico Ruzzier</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Insect Biodiversity, Coleoptera: Tenebrionidae, Invasive Species,
              Applied Entomology
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Roma Tre University, Rome, Italy
            </h3>
            
          </div> */}

          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>Dr. Lorenzo Pancini</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              World Biodiversity Association, Italy
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Order Coleoptera (Curculionidae in Indo-Australian and Malayan
              Regions)
            </h3>
            
          </div>

          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>Dr. Larry Bezark</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              California Department of Food and Agriculture (retired), USA
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Order Coleoptera (Cerambycidae)
            </h3>
            
          </div>

          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>Dr. Simpron Crispolon Elorde Jr.</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              University of Southern Mindanao, Kabacan, Philippines
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Order Hemiptera (Cercopoidea)
            </h3>
            
          </div>

          {/* <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>Dr. Jade Aster T. Badon</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              University of the Philippines Los Baños, Philippines
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Order Lepidoptera
            </h3>
            
          </div> */}

          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>Perry Archival C. Buenavente</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Philippine National Museum, Manila, Philippines
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Order Hymenoptera (Ants)
            </h3>
            
          </div>

          <div className="mt-4">
            <h3 className="font-serif text-1xl md:text-1xl">
              <b>Dr. Yesenia Marquez Lopez</b>
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Universidad Autónoma Metropolitana, Ciudad de México, Mexico
            </h3>
            <h3 className="font-serif text-1xl md:text-1xl">
              Order: Neuroptera (Ascalaphinae)
            </h3>
            
          </div>

        </div>
      </Container>
    </div>
  );
}

export default EditorialBoard;
