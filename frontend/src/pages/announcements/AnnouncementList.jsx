import Container from "@/components/common/Container";
import { Separator } from "@/components/ui/separator";
import Card from "@/components/news-events/card";
import announcementService from "@/services/announcementService";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { formatDate } from "@/util/formatDate";
import CardSkeleton from "@/components/news-events/CardSkeleton";
import { NoData } from "@/components/common/NoData";
import { SmoothParallaxGrid } from "@/components/ui/parallax-scroll";

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const result = await announcementService.getAnnouncements();

      const data = result?.data?.data?.map((announcement) => ({
        ...announcement,
        createdAt: formatDate(announcement.createdAt),
      }));

      const filteredData = data.filter(
        (announcement) => announcement.status === "1"
      );

      setAnnouncements(filteredData || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      toast.error("Failed to fetch announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div>
    <Container className={"py-20 space-y-5 "}>
      <div className="flex flex-col md:flex-row space-y-5 justify-between ">
        <h1 className="font-serif relative inline-block text-3xl font-bold ">
          Announcements
        </h1>
      </div>
      <Separator className={"mb-10"}/>
      {!loading && announcements.length === 0 && <NoData title="No Announcements Available" description=" Check back soon for updates on our latest announcements." />}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardSkeleton totalCard={4}/>
        </div>
      ) : (
        <SmoothParallaxGrid className="min-h-[800px]">
          {announcements.map((data, i) => (
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

export default AnnouncementList