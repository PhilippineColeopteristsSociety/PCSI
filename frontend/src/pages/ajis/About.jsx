import React, { useState, useEffect } from "react";
import Container from "@/components/common/Container";
import SubPageHero from "@/components/common/SubPageHero";
import { images } from "@/constants/images";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import volumeService from "@/services/volumeService";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function About() {
  const [latestVolumeBanner, setLatestVolumeBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLatestVolumeBanner() {
      setLoading(true);
      setError(null);
      try {
        // Fetch the latest volume with status "1" (active)
        const response = await volumeService.getVolumes(1, { status: "1" });
        if (response.success && response.data.length > 0) {
          const latestVolume = response.data[0];
          setLatestVolumeBanner(latestVolume.banner);
        } else {
          // If no volumes found, keep the default logo
          setLatestVolumeBanner(images.logo_portrait);
        }
      } catch (err) {
        console.error("Failed to fetch latest volume banner:", err);
        setError("Failed to load journal banner");
        // Keep default logo on error
        setLatestVolumeBanner(null);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestVolumeBanner();
  }, []);

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
            About
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Journal Photo */}
          <div className="flex justify-center">
            {loading ? (
              <Skeleton className="max-w-xs w-full h-[400px] rounded-lg" />
            ) : (
              <img
                src={latestVolumeBanner}
                alt="Asian Journal of Insect Science"
                className="max-w-xs rounded-lg shadow-lg"
              />
            )}
          </div>

          {/* Right Column - Focus and Scope */}
          <div className="space-y-3">
            <h3 className="font-serif text-2xl md:text-2xl font-bold">
              Focus and Scope
            </h3>
            <Separator />
            <p className="text-lg leading-relaxed">
              <i>Asian Journal of Insect Science</i> is a peer-reviewed
              international journal published by the{" "}
              <b>Philippine Coleopterists Society Incorporated</b>, dedicated to
              publishing high-quality papers on any aspect of systematic
              entomology, with a preference for scientific papers dealing with
              species from megadiverse countries. Majorly of the megadiverse
              countries are now facing a very fast extinction rate and
              degradation of their ecosystems; hence, research work on these
              countries should also cope with this challenge. It is only a
              matter of time before the species around the world go extinct,
              even before they are documented.{" "}
              <i>Asian Journal of Insect Science</i> considers scientific papers
              on all orders under Class Insecta, both living and fossil, with
              special consideration to papers describing new species to science.
              Other types of systematic papers are considered, including but not
              limited to catalogs, checklists, larval development, insect
              ecology, ontogeny, biographies, bibliographies, biogeography, and
              phylogeny. All PDF versions of currently published issues can be
              accessed freely and free of charge. All copyrights remain with the
              authors.
            </p>
          </div>
        </div>

        {/* New Section: Peer Review Process */}
        <div className="mt-8 space-y-3">
          <h3 className="font-serif text-2xl md:text-2xl font-bold">
            Peer Review Process
          </h3>
          <Separator />
          <p className="text-lg leading-relaxed">
            <i>Asian Journal of Insect Science</i> follows the Single-Blind peer
            review process, where the referee remains anonymous throughout the
            review process.
          </p>
        </div>

        {/* New Section: Publication Ethics */}
        <div className="mt-8">
          <h3 className="font-serif text-2xl md:text-2xl font-bold mb-3">
            Publication Ethics
          </h3>
          <Separator className="mb-4" />

          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            {/* Item 1: Ethical practice for authors */}
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-serif text-md pl-3 font-semibold">
                Ethical Practice for Authors
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <p className="leading-relaxed mb-4">
                  The author/s ensure that the submitted manuscript is original,
                  has not been published before, and is not under consideration
                  for publication elsewhere. Duplicated submission is not
                  permitted and will result in the immediate rejection of the
                  manuscript. Author/s must ensure that the manuscript is free
                  of unlawful statements and does not violate any rights. For
                  manuscripts with multiple authors, all authors must agree to
                  the final submitted version and affix all their email
                  addresses in the paper. A statement declaring a conflict or
                  competing interests is mandatory.
                </p>
                <p>
                  Any form of plagiarism (including self-plagiarism) is strictly
                  prohibited. If our editors and reviewers detect signs of
                  plagiarism, the manuscript will automatically be rejected.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Item 2: Ethical practice for reviewers */}
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-serif text-md pl-3 font-semibold">
                Ethical Practice for Reviewers
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <p className="leading-relaxed">
                  The core of our journal lies in the quality of our review
                  process. This is to ensure that all articles are properly
                  scrutinized, ensuring that all published scientific
                  information is accurate and ethical. The review process must
                  be fair and free from personal attacks, adversarial,
                  prejudice, or conflicts of interest. Reviewers having a
                  potential conflict of interest with the authors must inform
                  the editor and decline to review the manuscript. Although the
                  journal follows a single-blind review process, we respect
                  reviewers if they prefer their identity to be known.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Item 3: Ethical Practice for Editors */}
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-serif text-md pl-3 font-semibold">
                Ethical Practice for Editors
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <p className="leading-relaxed">
                  As an adjudicator, the editor provides a healthy discourse
                  between the reviewers and author/s and ensures that neutrality
                  must be maintained in the review process. The acceptance or
                  rejection of manuscripts must be solely based on merit and not
                  on any personal connections. When the editor is the author or
                  a co-author of the manuscript, he/she must seek other editors
                  to manage the review process of his/her manuscript. More
                  importantly, editors must avoid editing a piece of information
                  in the manuscript before the review process.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Item 4: Declaration of conflict of interests */}
            <AccordionItem value="item-4">
              <AccordionTrigger className="font-serif text-md pl-3 font-semibold">
                Declaration of Conflict of Interests
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <p className="leading-relaxed">
                  To free the manuscript from all possible conflicts of
                  interest, the author/s must provide a section of the
                  manuscript suggesting that the manuscript is free of any
                  conflict of interest upon submission to the journal.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Item 5: Taxonomic code of ethics */}
            <AccordionItem value="item-5">
              <AccordionTrigger className="font-serif text-md pl-3 font-semibold">
                Taxonomic Code of Ethics
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <p className="leading-relaxed">
                  The Code of Ethics in Appendix A of the International
                  Commission on Zoological Nomenclature{" "}
                  <a href="https://code.iczn.org">
                    <u>(https://code.iczn.org)</u>
                  </a>{" "}
                  must be ensured particularly for manuscripts on nomenclature.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Item 6: Handling complaints */}
            <AccordionItem value="item-6">
              <AccordionTrigger className="font-serif text-md pl-3 font-semibold">
                Handling Complaints
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <p className="leading-relaxed">
                  If the Asian Journal of Insect Science receives a formal
                  complaint that a contribution infringes copyright or other
                  intellectual property rights, the Editorial Board will
                  investigate the complaint. The Editorial Board will ONLY
                  entertain complaints supported with a FORMAL LETTER via
                  courier or email addressed to the Editor-In-Chief (EIC). Any
                  other form of complaint will not be entertained. If a formal
                  complaint is made, the Editorial Board through the EIC will
                  request both parties to submit substantial evidence which will
                  then be weighed by the Editorial Board as the basis for
                  retraction or withdrawal of the manuscript. A formal notice
                  about the misconduct may be published or an official letter
                  may be sent to the offender's employer will be made.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Item 7: The use of experimental animals */}
            <AccordionItem value="item-7">
              <AccordionTrigger className="font-serif text-md pl-3 font-semibold">
                The Use of Experimental Animals
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <p className="leading-relaxed">
                  For manuscripts reporting research using live animals, the
                  authors should provide a statement that the research complied
                  with all legal laws on the use and care of experimental
                  animals.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* New Section: Privacy Statement */}
          <div className="mt-8 space-y-3">
            <h3 className="font-serif text-2xl md:text-2xl font-bold">
              Privacy Statement
            </h3>
            <Separator />
            <p className="text-lg leading-relaxed">
              The names, email addresses, and other personal details entered in
              this journal website will only be used exclusively for the stated
              purposes of this journal.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default About;
