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

function SubmissionProcess() {
  return (
    <div className="min-h-screen bg-white py-10">
      <Container>
        {/* Main Heading */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-4xl font-bold mb-2">
            Asian Journal of Insect Science (AJIS)
          </h1>
          <h2 className="font-serif text-1xl md:text-2xl text-gray-600 font-semibold">
            Submission Process
          </h2>
        </div>

        <div className="mt-8">
          {/* New Section: */}
          <div className="mt-8 space-y-3">
            <p className="text-lg leading-relaxed">
              To submit, make sure to follow the author’s guidelines prescribed
              by the journal. Write a letter of intent addressed to the
              Editor-in-Chief and attach your paper. In the letter, please
              specify that the current manuscript has not been submitted or is
              not under consideration by any other journals or any other
              publication outlets. Send your documents to{" "}
              <u>editor.ajis.pcsi@gmail.com</u>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default SubmissionProcess;
