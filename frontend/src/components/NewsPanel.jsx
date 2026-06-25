import {
  RefreshCw,
  Newspaper,
} from "lucide-react";

export default function NewsPanel({
  articles = [],
  loading = false,
  onRefresh,
}) {
  if (loading) {
    return (
      <div className="space-y-4">

        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="
              bg-white
              rounded-xl
              shadow
              p-4
              animate-pulse
            "
          >
            <div className="flex gap-4">

              <div className="w-24 h-24 bg-gray-200 rounded-lg" />

              <div className="flex-1">

                <div className="h-5 bg-gray-200 rounded mb-3 w-3/4" />

                <div className="h-4 bg-gray-200 rounded mb-2" />

                <div className="h-4 bg-gray-200 rounded w-5/6" />

              </div>

            </div>
          </div>
        ))}

      </div>
    );
  }

  if (
    !Array.isArray(articles) ||
    articles.length === 0
  ) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">

        <Newspaper
          size={48}
          className="mx-auto text-gray-400 mb-4"
        />

        <h3 className="text-lg font-semibold">
          No News Available
        </h3>

        <p className="text-gray-500 mt-2 mb-6">
          Unable to load market news.
        </p>

        {onRefresh && (
          <button
            onClick={onRefresh}
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              bg-blue-600
              text-white
              rounded-lg
              hover:bg-blue-700
              transition
            "
          >
            <RefreshCw size={16} />
            Refresh News
          </button>
        )}

      </div>
    );
  }

  return (
    <div className="space-y-4">

      {articles.map(
        (article, index) => (
          <a
            key={
              article?.id ||
              index
            }
            href={
              article?.url ||
              "#"
            }
            target="_blank"
            rel="noreferrer"
            className="
              block
              bg-white
              rounded-xl
              shadow
              hover:shadow-lg
              transition
              overflow-hidden
            "
          >

            <div className="flex flex-col md:flex-row">

              {article?.image && (
                <img
                  src={
                    article.image
                  }
                  alt={
                    article?.title ||
                    "News"
                  }
                  className="
                    w-full
                    md:w-56
                    h-48
                    md:h-auto
                    object-cover
                  "
                />
              )}

              <div className="p-4 flex-1">

                <div className="flex justify-between items-center mb-2">

                  <span
                    className="
                      text-xs
                      bg-blue-100
                      text-blue-700
                      px-2
                      py-1
                      rounded-full
                    "
                  >
                    {article
                      ?.source
                      ?.name ||
                      "News"}
                  </span>

                  {article?.publishedAt && (
                    <span className="text-xs text-gray-500">
                      {new Date(
                        article.publishedAt
                      ).toLocaleDateString()}
                    </span>
                  )}

                </div>

                <h3 className="font-semibold text-lg mb-2 hover:text-blue-600">
                  {article?.title ||
                    "Untitled Article"}
                </h3>

                {article?.description && (
                  <p className="text-gray-600 line-clamp-3">
                    {
                      article.description
                    }
                  </p>
                )}

              </div>

            </div>

          </a>
        )
      )}

    </div>
  );
}