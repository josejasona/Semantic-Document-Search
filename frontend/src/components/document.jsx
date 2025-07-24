// src/components/document.jsx
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

// Correct way to load worker from public folder
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`;

function PDFViewer({ file }) {
  const [numPages, setNumPages] = useState(null);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

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
            />
          ))}
        </Document>
      </div>
    </div>
  );
}

export default PDFViewer;
