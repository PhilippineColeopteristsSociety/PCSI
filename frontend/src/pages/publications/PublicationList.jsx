import Container from "@/components/common/Container";
import { Separator } from "@/components/ui/separator";
import Card from "@/components/news-events/card";
import publicationService from "@/services/publicationService";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { formatDate } from "@/util/formatDate";
import CardSkeleton from "@/components/news-events/CardSkeleton";
import { NoData } from "@/components/common/NoData";
import { SmoothParallaxGrid } from "@/components/ui/parallax-scroll";

const PublicationList = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(false);

    const fetchPublications = async () => {
    setLoading(true);
    try {
      const result = await publicationService.getPublications();

      const data = result?.data?.data?.map((publication) => ({
        ...publication,
        createdAt: formatDate(publication.createdAt),
      }));
      
      
      const filteredData = data.filter(
        (publication) => publication.status === "1"
      );

        setPublications(filteredData || []);
    } catch (error) {
      console.error("Error fetching publications:", error);
      toast.error("Failed to fetch publications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);
  return (
    <div>
    <Container className={"py-20 space-y-5 "}>
      <div className="flex flex-col md:flex-row space-y-5 justify-between ">
        <h1 className="font-serif relative inline-block text-3xl font-bold ">
          Publications
        </h1>
      </div>
      <Separator className={"mb-10"}/>
      {!loading && publications.length === 0 && <NoData title="No Publications Available" description=" Check back soon for updates on our latest publications." />}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardSkeleton totalCard={4}/>
        </div>
      ) : (
        <SmoothParallaxGrid className="min-h-[800px]">
          {publications.map((data, i) => (
            <Card
              key={i}
              image={data.banner || ""}
              title={data.title}
              description={data.description}             
            />
          ))}
        </SmoothParallaxGrid>
      )}
    </Container>
  </div>
  )
}

export default PublicationList