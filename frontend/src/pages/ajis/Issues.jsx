import React, { useEffect, useState } from "react";
import Container from "@/components/common/Container";
import volumeService from "@/services/volumeService";

function VolumeCard({ volume }) {
  const { volumeNo, seriesNo, year, month, banner } = volume;

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200">
      {banner ? (
        <img
          src={banner}
          alt={`Vol. ${volumeNo} No. ${seriesNo} Banner`}
          className="w-full h-72 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-72 bg-gray-200 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}
      <div className="p-2">
        <p className="font-semibold text-lg text-center">
          {month}
        </p>
        <p className="font-semibold font-serif text-sm text-center">
          Vol. {volumeNo} No. {seriesNo} ({year})
        </p>
      </div>
    </div>
  );
}

function Issues() {
  const [selectedTab, setSelectedTab] = useState("current");
  const [volumes, setVolumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (err) {
        setError("Failed to load volumes.");
      } finally {
        setLoading(false);
      }
    }
    fetchVolumes();
  }, []);

  const latestVolume = volumes?.length > 0 ? volumes[0] : null;
  const archivesVolumes = volumes;

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
            onClick={() => setSelectedTab("current")}
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
            onClick={() => setSelectedTab("archives")}
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
                  <div>
                    <p className="mb-4 font-serif text-xl md:text-2xl font-semibold">
                      Vol. {latestVolume.volumeNo} No. {latestVolume.seriesNo} (
                      {latestVolume.year}): {latestVolume.month}
                    </p>
                    {latestVolume.banner ? (
                      <>
                        <img
                          src={latestVolume.banner}
                          alt={`Vol. ${latestVolume.volumeNo} No. ${latestVolume.seriesNo} Banner`}
                          className="max-h-[240px] object-contain rounded-lg shadow-lg"
                        />
                        <p className="mt-3 font-serif text-gray-500 font-medium">
                          <b>DOI:</b> <u>{latestVolume.doi}</u>
                        </p>
                        <p className="text-gray-500 font-serif text-sm">
                          <b>Published:</b>{" "}
                          {new Date(latestVolume.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </>
                    ) : (
                      <div className="mx-auto max-h-[360px] w-full bg-gray-200 flex items-center justify-center rounded-lg text-gray-400 h-[180px] md:h-[360px]">
                        No banner image available
                      </div>
                    )}
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
                {archivesVolumes.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {archivesVolumes.map((volume) => (
                      <VolumeCard key={volume._id} volume={volume} />
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
      </Container>
    </div>
  );
}

export default Issues;
