/* import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PdfViewer({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  );
}

export default PdfViewer; */



/* import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PdfViewer({ folder }) {
  const [files, setFiles] = useState([]);

  function fetchFiles() {
    const fileNames = require.context(`./${folder}`, false, /\.pdf$/).keys();
    setFiles(fileNames);
  }

  function renderPdf(file) {
    return (
      <div key={file}>
        <Document file={`./${folder}/${file}`}>
          <Page pageNumber={1} />
        </Document>
        <p>{file}</p>
      </div>
    );
  }

  return (
    <div>
      <button onClick={fetchFiles}>Load PDFs</button>
      {files.map(renderPdf)}
    </div>
  );
}

export default PdfViewer; */


/* import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import fs from 'fs';

function PdfViewer({ folder }) {
  const [files, setFiles] = useState([]);

  function fetchFiles() {
    const fileNames = fs.readdirSync(`./${folder}`).filter(name => name.endsWith('.pdf'));
    setFiles(fileNames);
  }

  function renderPdf(file) {
    return (
      <div key={file}>
        <Document file={`./${folder}/${file}`}>
          <Page pageNumber={1} />
        </Document>
        <p>{file}</p>
      </div>
    );
  }

  return (
    <div>
      <button onClick={fetchFiles}>Load PDFs</button>
      {files.map(renderPdf)}
    </div>
  );
}

export default PdfViewer; */


import React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

function PdfViewer({ file }) {
  return (
    <div style={{ height: '750px' }}>
      <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.7.570/pdf.worker.min.js">
        <Viewer fileUrl={file} plugins={[defaultLayoutPlugin]} />
      </Worker>
    </div>
  );
}

export default PdfViewer;