import "./index.css";
import { useState } from "react";
import PDFViewer from "./components/document";

function App() {
  const [pdfFile, setPdfFile] = useState(null);

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
        <div className="bg-gray-600 border-8">
          {pdfFile ? (
            <PDFViewer file={pdfFile} />
          ) : (
            <p>Please upload a PDF file</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
