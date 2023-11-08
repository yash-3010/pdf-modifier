"use client";

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {

  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  const [numPages, setNumPages] = useState<number | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Document className="md:hidden max-w-[285px] mx-auto h-[500px] border-2 border-[#003B73] rounded-md overflow-y-scroll" file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: numPages || 0 }, (_, index) => (
          <Page key={index + 1} pageNumber={index + 1} width={270} renderTextLayer={false} />
        ))}
      </Document>
      <Document className="hidden md:block max-w-[400px] mx-auto h-[500px] border-2 border-[#003B73] rounded-md overflow-y-scroll" file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: numPages || 0 }, (_, index) => (
          <Page key={index + 1} pageNumber={index + 1} width={379} renderTextLayer={false} />
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;
