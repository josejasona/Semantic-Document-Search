import "./index.css";
import { useState } from "react";
import PDFViewer from "./components/document";
import SearchBar from "./components/search-bar";

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log("File selected:", file); // 🔍 Check this

    if (file && file.type === "application/pdf") {
      setPdfFile(file);
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
              <SearchBar onSearch={setQuery} />
              <PDFViewer
                file={pdfFile}
                query={query}
                currentPage={currentPage}
              />
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
