import Container from "@/components/common/Container";
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Card from "@/components/news-events/card";
import announcementService from "@/services/announcementService";
import { toast } from "sonner";
import { formatDate } from "@/util/formatDate";
import { NoData } from "@/components/common/NoData";
import CardSkeleton from "@/components/news-events/CardSkeleton";
import { useNavigate } from "react-router";
import { DATA_LIMIT, STATUS } from "@/constants/dataFilter";
import { SmoothParallaxGrid } from "@/components/ui/parallax-scroll";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const result = await announcementService.getAnnouncements(DATA_LIMIT.ANNOUNCEMENTS, { status: STATUS.ACTIVE });

      const data = result?.data?.data?.map((announcement) => ({
        ...announcement,
        createdAt: formatDate(announcement.createdAt),
      }));

      setAnnouncements(data || []);
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
        <div className="flex flex-col md:flex-row justify-between space-y-5">
          <h1 className="font-serif relative inline-block text-3xl font-bold ">
            Announcements
          </h1>
          <Button
            onClick={() => navigate("/announcements")}
            className={"max-w-fit bg-lighter-green rounded-sm"}
            size={"lg"}
          >
            View All <ArrowRight />
          </Button>
        </div>
        <Separator className={"mb-10"}/>
        {!loading && announcements.length === 0 && (
          <NoData
            title="No Announcements Available"
            description=" Check back soon for updates on our latest announcements."
          />
        )}
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
  );
};

export default Announcements;
