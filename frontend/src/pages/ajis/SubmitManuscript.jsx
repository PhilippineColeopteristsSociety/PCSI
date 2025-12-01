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

function SubmitManuscript() {
  return (
    <div className="min-h-screen bg-white py-10">
      <Container>
        {/* Main Heading */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-4xl font-bold mb-2">
            Asian Journal of Insect Science (AJIS)
          </h1>
          <h2 className="font-serif text-1xl md:text-2xl text-gray-600 font-semibold">
            Submit Manuscript
          </h2>
        </div>

        <div className="mt-8">
          {/* New Section: */}
          <div className="mt-8 space-y-3">
            <p className="text-lg leading-relaxed">
              Submit your documents to <u>editor.ajis.pcsi@gmail.com</u>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default SubmitManuscript;
