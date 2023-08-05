import DocViewer, { SpecialZoomLevel } from 'react-doc-viewer';
import { docs } from './documents/docs';

function MyComponent() {
  return (
    <div>
      <h1>My Documents</h1>
      <DocViewer
        documents={docs}
        pluginRenderers={{
          disableWorker: true,
          renderers: [
            {
              plugin: ({ blobUrl }) => ({
                onDocumentLoadSuccess: ({ numPages }) => {
                  console.log(`Document loaded with ${numPages} pages`);
                },
                onDocumentLoadError: (error) => {
                  console.error('Failed to load document', error);
                },
                onSourceError: (error) => {
                  console.error('Failed to fetch document', error);
                },
                renderMode: 'canvas',
                specialZoomLevel: SpecialZoomLevel.PAGE_FIT,
                viewerProps: {
                  hideRotation: true,
                  showToolbar: false,
                  showSidebarButton: false,
                  showNavigationButtons: false,
                  showZoomButtons: false,
                  showDownloadButton: true,
                  downloadFileName: 'document.pdf',
                },
              }),
              fileTypes: ['pdf'],
            },
          ],
        }}
      />
    </div>
  );
}

export default MyComponent;