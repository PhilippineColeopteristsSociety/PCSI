import React from "react";
import SubPageHero from "@/components/common/SubPageHero";
import Container from "@/components/common/Container";
import Header from "@/components/common/Header";

const Affiliates = () => {
  return (
    <div>
      <SubPageHero />
      <Container className="py-10">
        <Header>Affiliates</Header>
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">
              The Philippine Coleopterists Society Inc. works closely with a
              network of local and international partners dedicated to
              entomology, biodiversity research, conservation, and science
              education. Our affiliates help us strengthen our efforts in
              documenting, protecting, and promoting Philippine beetle
              diversity.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Affiliates;
