import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@/components/common/Container";
import volumeService from "@/services/volumeService";
import articleService from "@/services/articleService";
import { FileText } from "lucide-react";

function VolumeCard({ volume, onClick }) {
  const { volumeNo, seriesNo, year, month, banner } = volume;

  return (
    <div
      className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      {banner ? (
        <img
          src={banner}
          alt={`Vol. ${volumeNo} No. ${seriesNo} Banner`}
          className="w-full h-68 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-68 bg-gray-200 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}
      <div className="p-2">
        <p className="font-semibold text-lg text-center">{month}</p>
        <p className="font-semibold font-serif text-sm text-center">
          Vol. {volumeNo} No. {seriesNo} ({year})
        </p>
      </div>
    </div>
  );
}

function Issues() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("current");
  const [volumes, setVolumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(false);
  const [articlesError, setArticlesError] = useState(null);
  const [selectedArchiveVolume, setSelectedArchiveVolume] = useState(null);

  const latestVolume = volumes?.length > 0 ? volumes[0] : null;

  useEffect(() => {
    async function fetchVolumes() {
      setLoading(true);
      setError(null);
      try {
        // Fetch only volumes with status "1" (active volumes)
        const response = await volumeService.getVolumes(null, { status: "1" });
        if (response.success) {
          setVolumes(response.data);
        } else {
          setError(response.error || "Failed to load volumes.");
        }
      } catch (_) {
        setError("Failed to load volumes.");
      } finally {
        setLoading(false);
      }
    }
    fetchVolumes();
  }, []);

  // Effect to fetch articles when volume changes
  useEffect(() => {
    async function fetchArticles() {
      const currentVolume =
        selectedTab === "current" ? latestVolume : selectedArchiveVolume;
      if (!currentVolume) {
        setArticles([]);
        return;
      }

      setArticlesLoading(true);
      setArticlesError(null);
      try {
        // Filter articles by volumeNo and seriesNo and status active ("1")
        const response = await articleService.getArticles(null, {
          volumeNo: currentVolume.volumeNo,
          seriesNo: currentVolume.seriesNo,
          status: "1",
        });
        if (response.success) {
          setArticles(response.data);
        } else {
          setArticlesError(response.error || "Failed to load articles.");
        }
      } catch (err) {
        setArticlesError("Failed to load articles.");
      } finally {
        setArticlesLoading(false);
      }
    }
    fetchArticles();
  }, [volumes, selectedTab, selectedArchiveVolume, latestVolume]);
  const archivesVolumes = volumes;

  function formatAuthors(authors) {
    if (!authors || authors.length === 0) return "No authors";
    return authors
      .map((author) => {
        const firstName = author.firstName || author.firstname;
        const middleName = author.middleName || author.middlename;
        const lastName = author.lastName || author.lastname;

        // Format middle name: show first letter + "." if exists, otherwise empty
        const middleInitial = middleName ? `${middleName.charAt(0)}. ` : "";

        return `${firstName} ${middleInitial}${lastName}`;
      })
      .join(", ");
  }

  return (
    <div className="min-h-screen bg-white py-10">
      <Container>
        {/* Main Heading */}
        <div className="mb-4">
          <h1 className="font-serif text-4xl md:text-4xl font-bold mb-2">
            Asian Journal of Insect Science (AJIS)
          </h1>
          <h2 className="font-serif text-1xl md:text-2xl text-gray-600 font-semibold">
            Issues
          </h2>
        </div>

        {/* Tab buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`px-6 py-2 rounded font-semibold border-b-4 ${
              selectedTab === "current"
                ? "border-green-900 text-green-900"
                : "border-transparent text-gray-600 hover:text-green-900"
            }`}
            onClick={() => {
              setSelectedTab("current");
              setSelectedArchiveVolume(null);
            }}
            aria-selected={selectedTab === "current"}
            role="tab"
          >
            Current
          </button>
          <button
            className={`px-6 py-2 rounded font-semibold border-b-4 ${
              selectedTab === "archives"
                ? "border-green-900 text-green-900"
                : "border-transparent text-gray-600 hover:text-green-900"
            }`}
            onClick={() => {
              setSelectedTab("archives");
              setSelectedArchiveVolume(null);
            }}
            aria-selected={selectedTab === "archives"}
            role="tab"
          >
            Archives
          </button>
        </div>

        {loading && (
          <div className="text-center text-gray-500 mt-10">
            Loading volumes...
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 mt-10">Error: {error}</div>
        )}

        {!loading && !error && (
          <>
            {selectedTab === "current" && (
              <div>
                {latestVolume ? (
                  <div className="flex flex-col md:flex-row md:space-x-8">
                    {/* Left side: Volume banner and info */}
                    <div className="md:w-1/3 mb-6 md:mb-0">
                      <p className="mb-4 font-serif text-xl md:text-xl font-semibold">
                        Vol. {latestVolume.volumeNo} No. {latestVolume.seriesNo}{" "}
                        ({latestVolume.year}): {latestVolume.month}
                      </p>
                      {latestVolume.banner ? (
                        <>
                          <img
                            src={latestVolume.banner}
                            alt={`Vol. ${latestVolume.volumeNo} No. ${latestVolume.seriesNo} Banner`}
                            className="max-h-[280px] object-contain rounded-lg shadow-lg"
                          />
                          <p className="mt-3 font-serif text-gray-500 font-medium">
                            <b>DOI:</b>{" "}
                            <a href={latestVolume.doi}>
                              <u>{latestVolume.doi}</u>
                            </a>
                          </p>
                          <p className="text-gray-500 font-serif text-sm">
                            <b>Published:</b>{" "}
                            {new Date(
                              latestVolume.createdAt
                            ).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </>
                      ) : (
                        <div className="mx-auto max-h-[360px] w-full bg-gray-200 flex items-center justify-center rounded-lg text-gray-400 h-[180px] md:h-[360px]">
                          No banner image available
                        </div>
                      )}
                    </div>

                    {/* Right side: Articles List */}
                    <div className="md:w-2/3 border rounded-lg p-4 shadow-inner overflow-y-auto max-h-[360px]">
                      <h3 className="font-serif text-2xl font-semibold mb-4">
                        Articles
                      </h3>
                      {articlesLoading && (
                        <div className="text-gray-500">Loading articles...</div>
                      )}
                      {articlesError && (
                        <div className="text-red-500">
                          Error: {articlesError}
                        </div>
                      )}
                      {!articlesLoading &&
                        !articlesError &&
                        articles.length === 0 && (
                          <p className="text-gray-500">
                            No articles available.
                          </p>
                        )}
                      {!articlesLoading &&
                        !articlesError &&
                        articles.length > 0 && (
                          <ul className="space-y-4">
                            {articles.map((article) => (
                              <li
                                key={article._id}
                                className="border border-gray-200 rounded p-3 hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() =>
                                  navigate(
                                    `/ajis/issues/article/${article._id}`
                                  )
                                }
                              >
                                <h3 className="font-semibold font-serif mb-1 text-green-900 hover:text-green-700">
                                  {article.title}
                                </h3>
                                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                                  <span>{formatAuthors(article.authors)}</span>
                                  {article.pageRange && (
                                    <span className="text-gray-500">
                                      {article.pageRange}
                                    </span>
                                  )}
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Open PDF in new tab using the pdfFile URL from Cloudinary
                                    const pdfUrl = article.pdfFile || "#";
                                    window.open(
                                      pdfUrl,
                                      "_blank",
                                      "noopener,noreferrer"
                                    );
                                  }}
                                  className="flex items-center gap-1 px-3 py-1 text-sm font-semibold text-green-800 bg-white border border-green-800 rounded hover:bg-green-800 hover:text-white focus:outline-none transition-colors"
                                  type="button"
                                >
                                  <FileText className="w-4 h-4" />
                                  PDF
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500">
                    No current volume available.
                  </p>
                )}
              </div>
            )}

            {selectedTab === "archives" && (
              <>
                {selectedArchiveVolume ? (
                  <div className="flex flex-col md:flex-row md:space-x-8">
                    {/* Left side: Volume banner and info */}
                    <div className="md:w-1/3 mb-6 md:mb-0">
                      <p className="mb-4 font-serif text-xl md:text-xl font-semibold">
                        Vol. {selectedArchiveVolume.volumeNo} No.{" "}
                        {selectedArchiveVolume.seriesNo} (
                        {selectedArchiveVolume.year}):{" "}
                        {selectedArchiveVolume.month}
                      </p>
                      {selectedArchiveVolume.banner ? (
                        <>
                          <img
                            src={selectedArchiveVolume.banner}
                            alt={`Vol. ${selectedArchiveVolume.volumeNo} No. ${selectedArchiveVolume.seriesNo} Banner`}
                            className="max-h-[280px] object-contain rounded-lg shadow-lg"
                          />
                          <p className="mt-3 font-serif text-gray-500 font-medium">
                            <b>DOI:</b>{" "}
                            <a href={selectedArchiveVolume.doi}>
                              <u>{selectedArchiveVolume.doi}</u>
                            </a>
                          </p>
                          <p className="text-gray-500 font-serif text-sm">
                            <b>Published:</b>{" "}
                            {new Date(
                              selectedArchiveVolume.createdAt
                            ).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </>
                      ) : (
                        <div className="mx-auto max-h-[360px] w-full bg-gray-200 flex items-center justify-center rounded-lg text-gray-400 h-[180px] md:h-[360px]">
                          No banner image available
                        </div>
                      )}
                    </div>

                    {/* Right side: Articles List */}
                    <div className="md:w-2/3 border rounded-lg p-4 shadow-inner overflow-y-auto max-h-[360px]">
                      <h3 className="font-serif text-2xl font-semibold mb-4">
                        Articles
                      </h3>
                      {articlesLoading && (
                        <div className="text-gray-500">Loading articles...</div>
                      )}
                      {articlesError && (
                        <div className="text-red-500">
                          Error: {articlesError}
                        </div>
                      )}
                      {!articlesLoading &&
                        !articlesError &&
                        articles.length === 0 && (
                          <p className="text-gray-500">
                            No articles available.
                          </p>
                        )}
                      {!articlesLoading &&
                        !articlesError &&
                        articles.length > 0 && (
                          <ul className="space-y-4">
                            {articles.map((article) => (
                              <li
                                key={article._id}
                                className="border border-gray-200 rounded p-3 hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() =>
                                  navigate(
                                    `/ajis/issues/article/${article._id}`
                                  )
                                }
                              >
                                <h4 className="font-semibold font-serif mb-1 text-green-900 hover:text-green-700">
                                  {article.title}
                                </h4>
                                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                                  <span>{formatAuthors(article.authors)}</span>
                                  {article.pageRange && (
                                    <span className="text-gray-500">
                                      {article.pageRange}
                                    </span>
                                  )}
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Open PDF in new tab using the pdfFile URL from Cloudinary
                                    const pdfUrl = article.pdfFile || "#";
                                    window.open(
                                      pdfUrl,
                                      "_blank",
                                      "noopener,noreferrer"
                                    );
                                  }}
                                  className="flex items-center gap-1 px-3 py-1 text-sm font-semibold text-green-800 bg-white border border-green-800 rounded hover:bg-green-800 hover:text-white focus:outline-none transition-colors"
                                  type="button"
                                >
                                  <FileText className="w-4 h-4" />
                                  PDF
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                  </div>
                ) : (
                  <>
                    {archivesVolumes.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {archivesVolumes.map((volume) => (
                          <VolumeCard
                            key={volume._id}
                            volume={volume}
                            onClick={() => setSelectedArchiveVolume(volume)}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500">
                        No volumes in archives.
                      </p>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default Issues;
