import Container from "@/components/common/Container";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import React from "react";
import { images } from "@/constants/images";

const ServiceList = () => {
  return (
    <div className="bg-accent">
    <Container className="py-20 flex flex-col md:flex-row flex-nowrap  items-center gap-20">
      <div  className="flex-1 grid grid-cols-5 gap-3 md:gap-5 h-full w-full">
        <img src={images.field_work2} alt="field_work2" className="col-span-3 rounded-lg w-full h-full object-cover"/>
        <img src={images.service_4} alt="service_2" className="col-span-2 rounded-lg w-full h-full object-cover"/>
        <img src={images.service_5} alt="service_3" className=" col-span-5 rounded-lg w-full h-full object-cover"/>
      </div>
      <ol className="flex-1 list-decimal list-inside lg:list-outside space-y-3  lg:text-lg marker:font-semibold marker:text-dark-green marker:text-2xl lg:marker:text-3xl">
        <li>Beetle species identification</li>
        {/* list must be alphabetical */}
        <li>Training Workshop on Coleopterology
          <ol className="list-[lower-alpha] list-inside lg:list-outside space-y-1 mt-2 ml-6 marker:font-bold marker:text-dark-green marker:text-lg lg:marker:text-xl">
            <li>Specimen collection protocols</li>
            <li>Specimen high-definition imaging</li>
            <li>Specimen examination: gross morphology, genitalia &#40;basic: gross male and female genitalia examination &#41;, genitalia &#40;advance: endophallus examination&#41;</li>
            <li>Specimen Standard Measurements</li>
          </ol>

        </li>

        <li>Basic Photoshop and QGIS</li>
        <li>Individual and Institutional Partnership</li>
      </ol>
    </Container>
    </div>
  );
};

export default ServiceList;
