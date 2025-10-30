import React, { useState } from "react";
import { images } from "@/constants/images";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Card({ image, title, description }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Function to strip HTML tags and check if description is long enough to need truncation
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  
  const plainTextDescription = stripHtmlTags(description);
  const shouldShowToggle = plainTextDescription.length > 150; // Show toggle if description is longer than 150 characters
  
  return (
    <div className="flex flex-col shadow-sm outline  outline-gray-200 rounded-lg h-full overflow-clip mb-4">
      <div
        className="h-[250px] overflow-clip bg-muted"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
        }}
      ></div>
      <div className="p-5">
        <h1 className="font-serif font-semibold">{title}</h1>
        <div className="mt-4 text-sm prose prose-sm max-w-none">
          {isExpanded ? (
            <div 
              className="overflow-visible"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <div 
              className="line-clamp-4 overflow-hidden"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
        
        {shouldShowToggle && (
          <Button 
            size="sm" 
            variant="link" 
            className="text-xs mt-4 w-min text-lighter-green"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="ml-1 h-3 w-3" />
              </>
            ) : (
              <>
                See More <ChevronDown className="ml-1 h-3 w-3" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
