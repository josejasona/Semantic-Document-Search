// src/components/document.jsx
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

// Set the PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDFViewer({ file }) {
  const [numPages, setNumPages] = useState(null);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="flex flex-col items-center">
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
  );
}

export default PDFViewer;
