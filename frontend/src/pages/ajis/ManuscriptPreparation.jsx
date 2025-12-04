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

function ManuscriptPreparation() {
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
            Manuscript Preparation
          </h2>
        </div>

        {/* New Section: Guidelines */}
        <div className="mt-8">
          {/* New Section: General guidelines */}
          <div className="mt-8 space-y-3">
            <h3 className="font-serif text-2xl md:text-2xl font-bold">
              General Guidelines
            </h3>
            <Separator />
            <p className="text-lg leading-relaxed">
              All papers must be in English. Manuscripts written by a non-native
              English-speaking country are encouraged to have their manuscript
              to be proofread by a native English speaker. Nomenclature must
              adhere to the principles and guidelines of the International Code
              of Zoological Nomenclature 4th Edition, see{" "}
              <a href="https://www.iczn.org/the-code/the-code-online/">
                <u>https://www.iczn.org/the-code/the-code-online/</u>
              </a>
              . The author(s) of the species name must be provided when the
              scientific name of any animal species is first mentioned. The year
              of publication must be written, and a full reference must be
              provided in the reference list. Metric systems should be used.
              Special symbols i.e. male and female symbols are permitted but not
              encouraged.
            </p>
          </div>

          {/* New Section: Copyediting services */}
          <div className="mt-8 space-y-3">
            <h3 className="font-serif text-2xl md:text-2xl font-bold">
              Copy-editing Services
            </h3>
            <Separator />
            <p className="text-lg leading-relaxed">
              Our linguistic team could help improve the English grammar of your
              manuscript. If you wish to avail of this service, kindly contact
              the Managing Editor: <u>editor.ajis.pcsi@gmail.com</u>.
            </p>
            <p className="text-lg leading-relaxed">
              We respect each author’s style, but the journal's general
              guidelines are recommended. You may download the template{" "}
              <a>
                <u>here</u>
              </a>
              .
            </p>
          </div>

          {/* New Section: Title */}
          <div className="mt-8 space-y-3">
            <h3 className="font-serif text-2xl md:text-2xl font-bold">Title</h3>
            <Separator />
            <p className="text-lg leading-relaxed">
              The title should be typed in bold, concise, and informative.
              Lengthy title is strongly discouraged. The higher taxa containing
              the species being described in the paper should be in parentheses.
              For example:{" "}
              <b>
                A new species of the genus <i>Pachyrhynchus</i> Germar, 1824
                (Coleoptera: Curculionidae: Entiminae)
              </b>
              .
            </p>
          </div>

          {/* New Section: Authors */}
          <div className="mt-8 space-y-3">
            <h3 className="font-serif text-2xl md:text-2xl font-bold">
              Authors
            </h3>
            <Separator />
            <p className="text-lg leading-relaxed">
              The author/s name/s must be written in bold and typed in Upper and
              Lower case. For example,{" "}
              <b>Analyn A. Cabras and Milton Norman D. Medina</b>. The address
              of each author/s must be given followed by the email address and
              ORCID numbers. If one or two authors share the same institutional
              address, a superscript number can be assigned. For example,
              <sup>1</sup>Philippine National Museum, Ermita, Manila,
              Philippines. The superscript number can then be assigned to the
              upper left corner of the author's name. For example,{" "}
              <b>
                <sup>1</sup>Milton Norman D. Medina, <sup>2</sup>Jhonnel P.
                Villegas, and <sup>1</sup>Analyn A. Cabras
              </b>
              .
            </p>
          </div>

          {/* New Section: Abstract */}
          <div className="mt-8 space-y-3">
            <h3 className="font-serif text-2xl md:text-2xl font-bold">
              Abstract
            </h3>
            <Separator />
            <p className="text-lg leading-relaxed">
              The abstract should present a brief and concise summary of the
              manuscript. All papers dealing with new names or combinations
              should be mentioned here. This is followed by{" "}
              <b>
                <i>keywords</i>
              </b>{" "}
              that are not present in the title. Both abstract and keywords are
              not included when submitting a short communication.
            </p>
          </div>

          {/* New Section: Main text */}
          <div className="mt-8 space-y-3">
            <h3 className="font-serif text-2xl md:text-2xl font-bold">
              Main text
            </h3>
            <Separator />
            <p className="text-lg leading-relaxed">
              The main text varies depending on the type of paper being
              submitted but it usually starts with an Introduction and ends with
              a reference list. For the journal article, it is recommended to
              include the following sections: Introduction, Materials and
              Methods, Conclusion (if applicable), Recommendation, and
              References. The in-text citation should be as follows: Cabras
              (2024), Cabras & Medina (2024), or Cabras et al. (2024) or it
              could be (Cabras, 2024), (Cabras & Medina, 2024), or (Cabras et
              al. 2024).
            </p>
            <p className="text-lg leading-relaxed">
              All references cited in the text must be listed in the reference
              list following the formats below.
            </p>
            <p className="text-lg leading-relaxed font-bold">
              1. Journal article
            </p>
            <p className="text-lg leading-relaxed pl-4">
              Single author: Cabras AA. (Year). Title of the article. Name of
              the journal, volume (issue number), page numbers. DOI:
              <u>http://xxxxxxxxxxxxx</u>. Take note that the name of the
              journal must be abbreviated.
            </p>
            <p className="text-lg leading-relaxed pl-4">
              Two or more authors: Cabras AA, Medina MND. (Year). Title of the
              article. Name of the journal, volume (issue number), page numbers.
              DOI: link here.
            </p>
            <p className="text-lg leading-relaxed">
              <b>2. Book</b>. Cabras AA. (Year). Title of the book. Publisher;
              Address of Publisher, page number/s.
            </p>
            <p className="text-lg leading-relaxed">
              <b>3. Book Chapter</b>. Cabras AA. (Year). Title of the chapter.
              In: Medina MND, & Taylor P. (Eds). Title of the book. Publisher;
              Address of Publisher, pp. 1–2. Please note to use “n-dash” not a
              hyphen as shown in the <b>pp. 1–2</b> example.
            </p>
            <p className="text-lg leading-relaxed">
              <b>4. Website or Internet Sources</b>. Cabras AA. (Year). Name of
              website or Internet Sources. Available from:{" "}
              <u>http://xxxxxxxxxxxx</u>. Date accessed: Day Month Year.
            </p>
            <p className="text-lg leading-relaxed">
              Never use gray literature (i.e. unpublished or ongoing works).
              Papers not cited in the text must not be in the reference list.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ManuscriptPreparation;
