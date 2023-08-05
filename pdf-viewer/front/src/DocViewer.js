import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

{/* <DocViewer
  pluginRenderers={DocViewerRenderers}
  const docs = [
    { uri: 'https://example.com/document1.pdf' },
    { uri: 'https://example.com/document2.pdf' },
  ];
/>; */}


function DocViewer({ docs }) {
    pluginRenderers={DocViewerRenderers}
    const docs = [
        { uri: require("./../src/files/ex.pdf") }, // Local File 
        { uri: require("./../src/files/img1.jpg") },
    ];
  /* return (
    <div style={{ height: '750px' }}>
      <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.7.570/pdf.worker.min.js">
        <Viewer fileUrl={file} plugins={[defaultLayoutPlugin]} />
      </Worker>
    </div>
  ); */
}

export default DocViewer;