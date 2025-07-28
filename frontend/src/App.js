import "./index.css";
import { useState } from "react";
import PDFViewer from "./components/document";
import SearchBar from "./components/search-bar";
import { uploadPDFToBackend } from "./utils/uploadPdf";

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(null);
  const [results, setResults] = useState([]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log("File selected:", file);

    // 🔍 Check this

    if (file && file.type === "application/pdf") {
      setPdfFile(file);

      // Upload to backend
      try {
        await uploadPDFToBackend(file);
      } catch (err) {
        alert("Failed to upload PDF");
      }
    }
  };

  return (
    <div className="">
      <header className="flex flex-row items-center w-full h-20 border-4 border-red-500 p-2">
        <div className="font-bold text-3xl">Semantic Document Search</div>
      </header>
      <main className="flex flex-col items-center w-full h-auto border-4 border-green-500">
        <div className="font-bold text-2xl">Please Attach a PDF</div>
        {/* Put the PDF Viewer under this comment */}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          className="mb-4"
        />
        <div className="border-2 border-red-500">
          {pdfFile ? (
            <>
              <input
                type="number"
                min="1"
                placeholder="Go to page..."
                onChange={(e) => {
                  const page = parseInt(e.target.value);
                  if (!isNaN(page)) setCurrentPage(page);
                }}
              />
              <SearchBar onSearch={setQuery} onResults={setResults} />
              <PDFViewer
                file={pdfFile}
                query={query}
                currentPage={currentPage}
              />
              <div className="w-full max-w-3xl mt-4 p-4 bg-gray-100 rounded shadow">
                <h2 className="text-xl font-semibold mb-2">Top Matches:</h2>
                {results.length > 0 ? (
                  results.map((res, idx) => (
                    <div key={idx} className="mb-4">
                      <p className="text-sm text-gray-600">
                        Score: {res.score.toFixed(4)}
                      </p>
                      <p className="text-md">{res.paragraph}</p>
                      <hr className="my-2" />
                    </div>
                  ))
                ) : (
                  <p>No results yet. Try a search.</p>
                )}
              </div>
            </>
          ) : (
            <p>Please upload a PDF file</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
