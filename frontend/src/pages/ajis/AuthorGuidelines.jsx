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

function AuthorGuidelines() {
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
            Author Guidelines
          </h2>
        </div>

        {/* New Section: Peer Review Process */}
        <div className="mt-8 space-y-3">
          <p className="text-lg leading-relaxed">
            {" "}
            The Asian Journal of Insect Science generally accepts two primary
            types of scientific papers: Research Articles and Short
            Communication depending on the length of the papers. But other types
            of papers like monographs, obituaries, bibliographies, commentaries,
            or erratum papers can be accepted upon approval of the editorial
            board.
          </p>
        </div>

        {/* New Section: Guidelines */}
        <div className="mt-8">
          {/* New Section: Full journal article */}
          <div className="mt-8 space-y-3">
            <h3 className="font-serif text-2xl md:text-2xl font-bold">
              Full Journal Article
            </h3>
            <Separator />
            <p className="text-lg leading-relaxed">
              The full journal article reports significant research findings
              originally done by the authors. It must be at least 5 pages or
              more including references. There is no limit as to the number of
              pages in the manuscript but papers longer than 100 pages will be
              considered a monograph. Revision of a taxon or description of a
              new species is welcome and highly prioritized.
            </p>
          </div>

          {/* New Section: Short communication */}
          <div className="mt-8 space-y-3">
            <h3 className="font-serif text-2xl md:text-2xl font-bold">
              Short Communication
            </h3>
            <Separator />
            <p className="text-lg leading-relaxed">
              This is a short but high-quality scientific note with a maximum of
              5 pages including references. The recommended format for short
              communication is as follows: title, name, and address of authors,
              main text, acknowledgment, and references. An obituary can be
              considered as a short communication depending on the number of
              pages.
            </p>
          </div>

          {/* New Section: Special issues */}
          <div className="mt-8 space-y-3">
            <h3 className="font-serif text-2xl md:text-2xl font-bold">
              Special Issues
            </h3>
            <Separator />
            <p className="text-lg leading-relaxed">
              An example of a special issue is Festschrift (a collection of
              articles in honor of an entomologist who made a significant impact
              on the science of entomology). The editor or outside scholar must
              provide a written proposal addressed to the Editor-In-Chief for
              this special issue to be approved by the editorial board.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AuthorGuidelines;
