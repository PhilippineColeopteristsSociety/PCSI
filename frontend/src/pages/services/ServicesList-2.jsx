import Container from "@/components/common/Container";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import React from "react";
import { images } from "@/constants/images";

const ServiceList = () => {
  return (
    <div className="bg-accent">
    <Container className="py-20 flex flex-col md:flex-row   items-center ">
      <div className="services-container relative h-[600px] w-full max-w-4xl mx-auto flex items-center justify-center overflow-hidden">
        {/* Card 1 - Top Left (last image) */}
        <div className="service-card service-card-1 service-card-small service-card-top-left">
          <div className="card-content">
            <img 
              src={images.field_work4} 
              alt="Beetle species identification "
            />
          </div>
        </div>
        
        {/* Card 2 - Bottom Left (2nd image) */}
        <div className="service-card service-card-2 service-card-medium service-card-bottom-left">
          <div className="card-content">
            <img 
              src={images.service_5} 
              alt="Training Workshop on Coleopterology"
            />
          </div>
        </div>
        
        {/* Card 3 - Center (front image) */}
        <div className="service-card service-card-3 service-card-large service-card-center service-card-front">
          <div className="card-content">
            <img 
              src={images.service_4} 
              alt="Basic Photoshop and QGIS"
            />
          </div>
        </div>
      </div>
      <ol className="flex-1/2 list-decimal list-inside lg:list-outside space-y-2 lg:text-lg marker:font-semibold marker:text-dark-green marker:text-2xl lg:marker:text-3xl">
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
