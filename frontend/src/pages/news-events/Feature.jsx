import Container from "@/components/common/Container";
import React, { useState, useEffect } from "react";
import { images } from "@/constants/images";
import featureService from "@/services/featureService";
import { toast } from "sonner";
import { NoData } from "@/components/common/NoData";
import { DATA_LIMIT, STATUS } from "@/constants/dataFilter";
import { Spinner } from "@/components/ui/spinner";

const Feature = () => {
  const [feature, setFeature] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchFeature = async () => {
    setLoading(true);
    try {
      const result = await featureService.getFeatures(DATA_LIMIT.FEATURES, { status: STATUS.ACTIVE });
      
      setFeature(result.data.data[0] || null);
    } catch (error) {
      console.error("Error fetching feature:", error);
      toast.error("Failed to fetch feature");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchFeature();
  }, []);
  // Don't render the section if there's no active featured beetle
  if (!loading && !feature) {
    return null;
  }

  return (
    <div className="bg-accent">
      <Container className={"py-20 space-y-5 "}>
        <h1 className="font-serif relative inline-block text-4xl font-bold  ">
          Featured Beetle of the Month!
        </h1>

        {loading ? (
          <div className="flex items-center justify-center py-10">
            {/* <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div> */}
            <Spinner className={"size-6"}/>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row lg:p-4 gap-15">
            <div className="aspect-square flex-shrink-0 overflow-hidden w-full bg-muted md:w-1/3">
              {feature.banner || images.beatle_8 ? (
                <img
                  src={feature.banner || images.beatle_8}
                  alt={feature.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="text-muted-foreground text-sm text-center">
                    No Image Available
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-4 flex-1 min-w-0 max-w-full">
              <h1 className="font-serif italic text-2xl font-bold break-words">
                {feature.name}
              </h1>
              <div 
                className="text-sm prose prose-sm max-w-full wrap-break-word"
                style={{ wordBreak: 'break-normal', overflowWrap: 'anywhere' }}
                dangerouslySetInnerHTML={{ __html: feature.description }}
              />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Feature;
