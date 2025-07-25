// src/components/document.jsx
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useEffect } from "react";
import "react-pdf/dist/Page/TextLayer.css";

// Correct way to load worker from public folder
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`;

function PDFViewer({ file, query, currentPage }) {
  const [numPages, setNumPages] = useState(null);
  const [pdfTextPages, setPdfTextPages] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const onLoadSuccess = async (pdf) => {
    setNumPages(pdf.numPages);

    const pages = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const text = textContent.items.map((item) => item.str).join(" ");
      pages.push({ page: i, text });
    }

    setPdfTextPages(pages);
  };

  useEffect(() => {
    if (!query || !pdfTextPages.length) {
      setSearchResults([]);
      return;
    }

    const matches = pdfTextPages.filter((page) =>
      page.text.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(matches);
    console.log("Search matches:", matches); // for debug
  }, [query, pdfTextPages]);

  function highlightMatch(text, query) {
    if (!query) return text;

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape regex special chars
    const pattern = new RegExp(escapedQuery, "gi");

    return text.replace(pattern, (value) => `<mark>${value}</mark>`);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="overflow-y-scroll overflow-x-auto h-[600px] p-4 bg-white rounded">
        <Document
          file={file}
          onLoadSuccess={onLoadSuccess}
          className="border border-gray-300"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderTextLayer={true}
              renderAnnotationLayer={false}
              customTextRenderer={({ str }) => {
                return highlightMatch(str, query);
              }}
              inputRef={(ref) => {
                if (ref && currentPage === index + 1) {
                  ref.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            />
          ))}
        </Document>
      </div>
    </div>
  );
}

export default PDFViewer;
