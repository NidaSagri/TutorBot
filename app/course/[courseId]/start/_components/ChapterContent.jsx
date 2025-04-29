import React from "react";
import YouTube from "react-youtube";
import ReactMarkdown from "react-markdown";

// no need to specify width/height inside opts
const opts = {
  playerVars: {
    autoplay: 0,
  },
};

const ChapterContent = ({ chapter, content }) => {
  return (
    <div className="flex flex-col items-center justify-center my-6 px-3 sm:px-6 md:px-10 lg:px-20 min-h-screen">
      {/* Chapter Name */}
      <h2 className="font-semibold text-2xl sm:text-3xl text-center">
        {chapter?.ChapterName}
      </h2>

      {/* Chapter About */}
      <p className="text-gray-500 text-base sm:text-lg m-3 text-center">
        {chapter?.About}
      </p>

      {/* Video */}
      {content?.videoId && (
        <div className="w-full flex justify-center my-8">
          <div
            className="relative w-full h-0"
            style={{ paddingBottom: "56.25%" }}
          >
            <YouTube
              videoId={content?.videoId}
              opts={{
                ...opts,
                width: "100%",
                height: "100%",
              }}
              className="absolute top-0 left-0 w-full h-full"
              containerClassName="absolute top-0 left-0 w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Topics */}
      <div className="w-full">
        {content?.content?.topics?.map((item, index) => (
          <div key={index} className="p-4 sm:p-6 bg-slate-50 rounded-lg mb-8">
            <h3 className="font-semibold text-lg sm:text-xl mb-2">
              {item.title}
            </h3>

            <ReactMarkdown>{item.description}</ReactMarkdown>

            {item?.codeExample && (
              <div className="p-4 bg-black text-white rounded-md mt-4 overflow-x-auto ">
                <pre className="whitespace-pre overflow-x-auto">
                  <code>{item?.codeExample}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterContent;
