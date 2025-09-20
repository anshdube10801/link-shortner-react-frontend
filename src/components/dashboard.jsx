import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { createUrl } from "../apis/urlApi";

const Dashboard = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [back, setBack] = useState("");

  const handleSubmitURL = async (e) => {
    e.preventDefault();

    if (!originalUrl) {
      return;
    }

    try {
      const urlshort = await createUrl(originalUrl.trim());
      const finalShortUrl = `${
        import.meta.env.VITE_FRONTEND_DOMAIN
      }/${urlshort}`;
      const back = `${import.meta.env.VITE_BASE_URL}/${urlshort}`;
      setShortUrl(finalShortUrl);
      setBack(back);
      setOriginalUrl("");
    } catch (error) {
      console.error(error);
    }
  };

  const copyToClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(back.trim());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        {!shortUrl && (
          <div className="max-w-2xl w-full text-center mb-28">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Short Links, Big Impact
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Shorter links mean more clicks, better engagement, and a cleaner
              way to share.
            </p>
            <form
              onSubmit={handleSubmitURL}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <input
                autoFocus
                type="text"
                placeholder="Enter Your URL"
                className="w-full sm:w-auto flex-grow px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 dark:bg-gray-700 dark:text-gray-100"
                required
                onChange={(e) => {
                  setOriginalUrl(e?.target?.value);
                }}
              />
              <button
                type="submit"
                disabled={shortUrl}
                className="flex items-center justify-center px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                <span>Short URL for Free</span>
                <ArrowRightIcon className="h-5 w-5 ml-3" />
              </button>
            </form>
          </div>
        )}

        {shortUrl && (
          <div className="max-w-2xl w-full text-center py-2">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Short. Sweet. Impactful!
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Here is your shortcut to success!.
            </p>

            <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={back}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-grow px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-blue-800 font-bold hover:underline"
              >
                {shortUrl}
              </a>

              <button
                onClick={copyToClipboard}
                type="button"
                disabled={isCopied}
                className={`flex items-center justify-center px-6 py-2 ${
                  isCopied
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}
              >
                <span>{isCopied ? "Copied!" : "Copy"}</span>
                <ArrowRightIcon className="h-5 w-5 ml-3" />
              </button>
            </form>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => {
                  setShortUrl("");
                }}
                className="flex items-center justify-center px-2 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                <span>Short new URL</span>
                <ArrowRightIcon className="h-5 w-5 ml-3" />
              </button>
            </div>
          </div>
        )}

        <p className="absolute bottom-0 left-0 w-full text-center py-2 text-gray-500 dark:text-gray-400">
          &#169; {new Date().getFullYear()} - Designed & Developed by{" "}
          <a
            href="https://www.linkedin.com/in/ansh-dube/"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            Ansh Dube
          </a>
        </p>
      </div>
    </>
  );
};

export default Dashboard;
