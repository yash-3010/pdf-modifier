"use client";

import React from 'react';

interface DownloadButtonProps {
  pdfUrl: string;
  css: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ pdfUrl, css }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();

      // Create a Blob URL for the PDF Blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a download link
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'server_pdf.pdf'; // Specify the filename with a .pdf extension
      link.click();

      // Clean up the Blob URL
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div>
      <button className={css} onClick={handleDownload}>Download</button>
    </div>
  );
};

export default DownloadButton;
