import Container from "@/components/common/Container";
import { Separator } from "@/components/ui/separator";
import Card from "@/components/news-events/card";
import newsService from "@/services/newsService";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { formatDate } from "@/util/formatDate";
import CardSkeleton from "@/components/news-events/CardSkeleton";
import { NoData } from "@/components/common/NoData";
import { SmoothParallaxGrid } from "@/components/ui/parallax-scroll";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();

  const fetchNews = async () => {
    setLoading(true);
    try {
      const result = await newsService.getAllNews();

      const data = result?.data?.data?.map((newsItem) => ({
        ...newsItem,
        createdAt: formatDate(newsItem.createdAt),
      }));

      if(data.length === 0){
        setNews([]);
        return;
      }

      const filteredData = data.filter(
        (newsItem) => newsItem.status === "1"
      );

      setNews(filteredData || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div>
      <Container className={"py-20 space-y-5 "}>
        <div className="flex flex-col md:flex-row space-y-5 justify-between ">
          <h1 className="font-serif relative inline-block text-3xl font-bold ">
            News & Updates
          </h1>
           <Button onClick={() => navigate("/news-features")} className={"max-w-fit bg-lighter-green rounded-sm"} size={"lg"}>
            View All <ArrowRight />
          </Button>
        </div>
        <Separator className={"mb-10"}/>
        {!loading && news.length === 0 && <NoData title="No News Available" description="Check back soon for updates on our latest news." />}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CardSkeleton totalCard={4}/>
          </div>
        ) : (
          <SmoothParallaxGrid className="min-h-[800px]">
            {news.map((data, i) => (
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

export default NewsList;
