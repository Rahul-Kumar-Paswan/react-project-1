/* import React from 'react'
import PdfViewer from './PdfViewer'

export default function App() {
  return (
	<div>
		<PdfViewer file={"pdf-viewer/front/src/files/ex.pdf"}/>
	</div>
  )
} */


/* import React from 'react'
import DocViewer from 'react-doc-viewer'

export default function App() {
  return (
	<div>
		<DocViewer documents={"pdf-viewer/front/src/files/ex.pdf"}/>
	</div>
  )
} */



/* import React from 'react'
import MyComponent from './MyComponent'
import { docs } from './documents/docs';

export default function App() {
  return (
	<div>
		<MyComponent documents={docs} />
	</div>
  )
} */


import React from 'react';
import DocViewer, { PDFRenderer, PNGRenderer } from 'react-doc-viewer';
import { docs } from './documents/docs';

function App() {
  return (
    <div>
      <h1>My Documents</h1>
      <DocViewer documents={docs} 
	  	pluginRenderers={[PDFRenderer, PNGRenderer]}
		  theme={{
			primary: "#5296d8",
			secondary: "#ffffff",
			tertiary: "#5296d899",
			textPrimary: "#ffffff",
			textSecondary: "#5296d8",
			textTertiary: "#00000099",
			disableThemeScrollbar: false,
		  }}
	  />
    </div>
  );
}

export default App;



/* import DocViewer from "react-doc-viewer";

function App() {
  const docs = [
    // { uri: "https://url-to-my-pdf.pdf" },
    { uri: require("./../src/files/ex.pdf") }, // Local File 
	{ uri: require("./../src/files/img1.jpg") }, // Local File 
  ];

  return <DocViewer documents={docs} />;
}

export default App; */
// file="file:///./pdf-viewer/front/src/files/ex.pdf"
//         file="C:/Users/acer/OneDrive/Documents/DEVOPS-PRACTISE/React-Project/pdf-viewer/front/src/files/ex.pdf"
// ./../src/files/ex.pdf */


/* 
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function App() {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <h1>PDF Viewer</h1>
      <Document
        file="file://./../src/files/ex.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </div>
  );
} 
export default App; */



/* 
import React from 'react';
import PdfViewer from './PdfViewer';

function App() {
  return (
    <div className="App">
      <PdfViewer file="C:/Users/acer/OneDrive/Documents/DEVOPS-PRACTISE/React-Project/pdf-viewer/front/src/files/ex.pdf" />
    </div>
  );
}

export default App; */


/* 
import React from 'react';
import PdfViewer from './PdfViewer';

function App() {
  return (
    <div className="App">
      <PdfViewer folder="files" />
    </div>
  );
}

export default App; */


/* import React, { useState } from "react";
import { Logger } from "logging-library";
import FileViewer from "react-file-viewer";
import { CustomErrorComponent } from "custom-error";

// const file = "/logo192.png";
// const type = "png";
const file = "./files/ex.pdf";
const type = "pdf";
// const file = "excel.xlsx";
// const type = "xlsx";
// const file = "proposal.docx";
// const type = "docx";
// const file = "new_user_credentials.csv";
// const type = "csv";

const App = () => {
  const [view, setView] = useState(false);

  const handleView = () => {
    setView(!view);
  };

  const onError = (e) => {
    Logger.logError(e, "error in file-viewer");
  };

  return (
    <>
      <button onClick={handleView}>View</button>
      {view && (
        <FileViewer
          fileType={type}
          filePath={file}
          errorComponent={CustomErrorComponent}
          onError={onError}
        />
      )}
    </>
  );
};

export default App; */


/* import axios from 'axios';

import React, { Component } from 'react';

class App extends Component {

	state = {

		// Initially, no file is selected
		selectedFile: null
	};

	// On file select (from the pop up)
	onFileChange = event => {

		// Update the state
		this.setState({ selectedFile: event.target.files[0] });

	};

	// On file upload (click the upload button)
	onFileUpload = () => {

		// Create an object of formData
		const formData = new FormData();

		// Update the formData object
		formData.append(
			"myFile",
			this.state.selectedFile,
			this.state.selectedFile.name
		);

		// Details of the uploaded file
		console.log(this.state.selectedFile);

		// Request made to the backend api
		// Send formData object
		axios.post("api/uploadfile", formData);
	};

	// File content to be displayed after
	// file upload is complete
	fileData = () => {

		if (this.state.selectedFile) {

			return (
				<div>
					<h2>File Details:</h2>
					<p>File Name: {this.state.selectedFile.name}</p>

					<p>File Type: {this.state.selectedFile.type}</p>

					<p>
						Last Modified:{" "}
						{this.state.selectedFile.lastModifiedDate.toDateString()}
					</p>

				</div>
			);
		} else {
			return (
				<div>
					<br />
					<h4>Choose before Pressing the Upload button</h4>
				</div>
			);
		}
	};

	render() {

		return (
			<div>
				<h1>
					GeeksforGeeks
				</h1>
				<h3>
					File Upload using React!
				</h3>
				<div>
					<input type="file" onChange={this.onFileChange} />
					<button onClick={this.onFileUpload}>
						Upload!
					</button>
				</div>
				{this.fileData()}
			</div>
		);
	}
} 

export default App; */
