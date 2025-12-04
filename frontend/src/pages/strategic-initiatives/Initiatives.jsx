import React from "react";
import Container from "@/components/common/Container";

function Initiatives() {
  return (
    <div>
      <Container className={"py-20 space-y-5 "}>
        <h1 className="font-serif text-4xl md:text-4xl font-bold mb-8">
          Strategic Initiatives
        </h1>
        <div className="">
          <p className="text-lg mb-6">
            The Philippine Coleopterological Society, Inc. (PCSI) is committed
            to advancing the study and conservation of beetles through various
            strategic initiatives. Our programs are designed to support
            research, education, and conservation efforts in the field of
            coleopterology.
          </p>

          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3">Sponsorships</h2>
              <p className="text-md leading-relaxed">
                We work closely with individuals who share the same passion for
                protecting and conserving our natural resources, particularly
                our beetle species. We are open to various forms of sponsorship.
                The terms of engagement are subject to the approval of the board
                and our legal team.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3">Endowment</h2>
              <p className="text-md leading-relaxed">
                We also work with philanthropists whose personal endowment fund
                can be used to support the scientific activities of the
                organization. This includes, but is not limited to, support in
                fieldwork activities, support for laboratory works, and, in
                turn, the funder can have a species named after his/her liking,
                as long as it follows the convention of the International Code
                of Zoological Nomenclature, <a className="" href="https://code.iczn.org/." target="_blank">https://code.iczn.org/.</a> The terms of
                engagement are subject to the approval of the board and our
                legal team.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3">Scholarships</h2>
              <p className="text-md leading-relaxed">
                We also work with private, government, and non-government
                organizations that wish to provide scholarship opportunities for
                students in both undergraduate and graduate programs who will
                focus on the study of Philippine coleopterology. The terms of
                engagement are subject to the approval of the board and our
                legal team.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
            <p className="text-gray-700 mb-4">
              Interested in supporting our strategic initiatives? We welcome
              partnerships and collaborations with individuals, institutions,
              and organizations that share our passion for beetle research and
              conservation.
            </p>
            <button className="bg-dark-green text-white px-6 py-2 rounded-md hover:bg-dark-green/90 transition-colors">
              <a href="mailto:philippinecoleopterist@gmail.com">Contact Us</a>
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Initiatives;
