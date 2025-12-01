import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@/components/common/Container";
import articleService from "@/services/articleService";
import { FileText } from "lucide-react";

function ArticleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      setLoading(true);
      setError(null);
      try {
        const response = await articleService.getArticle(id);
        if (response.success) {
          setArticle(response.data.data);
        } else {
          setError(response.error || "Failed to load article.");
        }
      } catch (_) {
        setError("Failed to load article.");
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchArticle();
    }
  }, [id]);

  const formatAuthors = (authors) => {
    if (!authors || authors.length === 0) return "No authors";
    return authors.map((author, index) => {
      const firstName = author.firstName || author.firstname;
      const middleName = author.middleName || author.middlename;
      const lastName = author.lastName || author.lastname;

      // Format middle name: show first letter + "." if exists, otherwise empty
      const middleInitial = middleName ? `${middleName.charAt(0)}. ` : "";

      const fullName = `${firstName} ${middleInitial}${lastName}`;

      const affiliation =
        author.department && author.school
          ? `${author.department}, ${author.school}`
          : author.department || author.school || "";

      return (
        <div key={index} className="mb-2">
          <p className="font-semibold text-gray-800">{fullName}</p>
          {affiliation && (
            <p className="text-sm text-gray-600 italic">{affiliation}</p>
          )}
          {(author.city || author.country) && (
            <p className="text-sm text-gray-500">
              {[author.city, author.country].filter(Boolean).join(", ")}
            </p>
          )}
        </div>
      );
    });
  };

  const formatAuthorsAPA = (authors) => {
    if (!authors || authors.length === 0) return "";
    return authors
      .map((author, index) => {
        const firstName = author.firstName || author.firstname;
        const middleName = author.middleName || author.middlename;
        const lastName = author.lastName || author.lastname;

        // APA format: Last name, First initial. Middle initial.
        const firstInitial = firstName ? `${firstName.charAt(0)}.` : "";
        const middleInitial = middleName ? ` ${middleName.charAt(0)}.` : "";

        const apaName = `${lastName}, ${firstInitial}${middleInitial}`;

        return apaName;
      })
      .join(", ");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-10">
        <Container>
          <div className="text-center text-gray-500 mt-10">
            Loading article details...
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white py-10">
        <Container>
          <div className="text-center text-red-500 mt-10">Error: {error}</div>
          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/ajis/issues")}
              className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-900"
            >
              Back to Issues
            </button>
          </div>
        </Container>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white py-10">
        <Container>
          <div className="text-center text-gray-500 mt-10">
            Article not found.
          </div>
          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/ajis/issues")}
              className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-900"
            >
              Back to Issues
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10">
      <Container>
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/ajis/issues")}
            className="flex items-center text-green-800 hover:text-green-900 font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Issues
          </button>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            <span>
              Vol. {article.volumeNo} No. {article.seriesNo} ({article.year}):{" "}
              {article.month}
            </span>
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-gray-900 pb-4 border-b border-gray-200">
            {article.title}
          </h1>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side: Article Content */}
          <div className="md:w-2/3">
            {/* Authors Section */}
            <div className="mb-6">
              <div className="space-y-3">{formatAuthors(article.authors)}</div>
            </div>

            <div>
              {article.doi && (
                <p className="font-serif text-1xl font-semibold mb-5 text-gray-900">
                  <strong>DOI:</strong>{" "}
                  <a
                    href={`https://doi.org/${article.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {article.doi}
                  </a>
                </p>
              )}
            </div>

            {/* Keywords Section */}
            {article.keywords && article.keywords.length > 0 && (
              <div className="mb-8">
                <h3 className="font-serif text-1xl text-gray-900">
                  <strong>Keywords:</strong> {article.keywords.join(", ")}
                </h3>
              </div>
            )}

            {/* Abstract Section */}
            {article.abstract && (
              <div className="mb-8">
                <h2 className="font-serif text-lg font-semibold mb-4 text-gray-900">
                  Abstract
                </h2>
                <div
                  className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.abstract }}
                />
              </div>
            )}

            {/* PDF Download Button */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <button
                onClick={() => {
                  const pdfUrl = article.pdfFile
                    ? article.pdfFile
                    : article.doi
                    ? `https://doi.org/${article.doi}`
                    : "#";
                  window.open(pdfUrl, "_blank", "noopener,noreferrer");
                }}
                className="flex items-center gap-1 px-3 py-3 text-sm font-semibold text-green-800 bg-white border border-green-800 rounded hover:bg-green-800 hover:text-white focus:outline-none transition-colors"
                type="button"
              >
                <FileText className="w-4 h-4" />
                View Full Article (PDF)
              </button>
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="hidden md:block w-px bg-gray-300"></div>

          {/* Right Side: Banner and Citation */}
          <div className="md:w-1/3">
            {/* Banner Image */}
            <div className="mb-8">
              {article.banner ? (
                <img
                  src={article.banner}
                  alt="Article Banner"
                  className="w-full max-h-48 object-cover rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                  No banner image available
                </div>
              )}
            </div>

            {/* Date Published Section */}
            <div className="mb-8">
              <h3 className="font-serif text-lg font-semibold mb-2 text-gray-900">
                Date Published
              </h3>
              <div className="bg-gray-50 p-3 rounded-lg border">
                <p className="text-sm text-gray-700">
                  {new Date(article.createdAt).toISOString().split("T")[0]}
                </p>
              </div>
            </div>

            {/* How to Cite Section */}
            <div>
              <h3 className="font-serif text-lg font-semibold mb-2 text-gray-900">
                How to Cite
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {formatAuthorsAPA(article.authors)} ({article.year}).{" "}
                  {article.title}. <em>Asian Journal of Insect Science</em>,{" "}
                  {article.volumeNo}({article.seriesNo}),
                  {article.doi && (
                    <span>
                      {" "}
                      <a
                        href={`https://doi.org/${article.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {article.doi}
                      </a>
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ArticleDetails;
