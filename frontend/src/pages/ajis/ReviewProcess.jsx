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

function ReviewProcess() {
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
            Review Process
          </h2>
        </div>

        <div className="mt-8">
          {/* New Section: */}
          <div className="mt-8 space-y-3">
            <p className="text-lg leading-relaxed">
              Our journal follows the standard single-blind review process
              wherein only the reviewer knows the authors. The names of the
              reviewers remain confidential throughout the review process. We
              encourage the corresponding author to suggest at least two
              competent reviewers by providing the email addresses and
              institutions of the reviewers who can legitimately review the
              content of the manuscript. For accepted papers, the managing
              editor will require the{" "}
              <b>
                <u>Copyright Form</u>
              </b>{" "}
              to be signed by all authors of the manuscript using a blue-colored
              pen. Additional requirements may be required before the
              publication.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ReviewProcess;
