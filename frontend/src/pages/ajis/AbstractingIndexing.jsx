import React from "react";
import Container from "@/components/common/Container";
import { images } from "@/constants/images";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function AbstractingIndexing() {
  return (
    <div className="min-h-screen bg-white py-10">
      <Container>
        {/* Main Heading */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-4xl font-bold mb-2">
            Asian Journal of Insect Science (AJIS)
          </h1>
          <h2 className="font-serif text-1xl md:text-2xl text-gray-600 font-semibold">
            Abstracting and Indexing
          </h2>
        </div>

        {/* Coming Soon Message */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold text-gray-700">
            Coming Soon...
          </h3>
        </div>
      </Container>
    </div>
  );
}

export default AbstractingIndexing;
