import React, { useState, useEffect } from "react";
import Container from "@/components/common/Container";
import SubPageHero from "@/components/common/SubPageHero";
import { Separator } from "@/components/ui/separator";
import IssueCard from "@/components/ajis/IssueCard";
import publicationService from "@/services/publicationService";
import { toast } from "sonner";
import { formatDate } from "@/util/formatDate";
import CardSkeleton from "@/components/news-events/CardSkeleton";
import { NoData } from "@/components/common/NoData";

function Issues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchIssues = async () => {
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

      setIssues(filteredData || []);
    } catch (error) {
      console.error("Error fetching issues:", error);
      toast.error("Failed to fetch issues");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SubPageHero />
      <Container className="py-10">
        {/* Main Heading */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-4xl font-bold mb-2">
            Asian Journal of Insect Science (AJIS)
          </h1>
          <h2 className="font-serif text-1xl md:text-2xl text-gray-600 font-semibold">
            Issues
          </h2>
        </div>

        <Separator className="mb-10" />

        {!loading && issues.length === 0 && (
          <NoData
            title="No Issues Available"
            description="Check back soon for updates on our latest journal issues."
          />
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CardSkeleton totalCard={6} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {issues.map((issue, i) => (
              <IssueCard
                key={i}
                image={issue.banner || ""}
                title={issue.title}
                date={issue.createdAt}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default Issues;
