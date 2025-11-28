import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";

export default function MerchandiseCard({ image, name, onOrder, onSeeDetail }) {
  return (
    <div className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer bg-white shadow-md">
      {/* Image */}
      <img src={image} alt={name} className="w-full h-full object-cover" />

      {/* Sliding panel from bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-t  bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out p-2 px-4 flex flex-col lg:flex-row justify-between items-start lg:items-center">
        <h3 className="text-gray-900 text-lg font-semibold text-start">{name}</h3>
        <ButtonGroup>
          <Button
            onClick={onSeeDetail}
            variant={"outline"}
            // className="w-full"
            size="lg"
          >
            <Eye className="h-4 w-4" />
            See Detail
          </Button>
          <Button
            onClick={onOrder}
            variant={"outline"}
            size="lg"
          >
            <ShoppingCart className=" h-4 w-4" />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
