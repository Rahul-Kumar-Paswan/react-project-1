import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileList() {
  const [pdf_files, setFiles] = useState([]);

  useEffect(() => {
    axios.get('/api/files')
      .then(response => {
        setFiles(response.data);
        console.log("files",pdf_files)
      })
      .catch(error => {
        console.log("frontend-error",error);
      });
  }, [pdf_files]);

  function handleViewClick(fileId) {
    console.log(fileId)
    window.open(`/api/files/${fileId}`, '_blank');
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Filename</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        {pdf_files.map(file => (
          <tr key={pdf_files.id}>
            <td>{pdf_files.id}</td>
            <td>{pdf_files.name}</td>
            <td><button onClick={() => handleViewClick(pdf_files.id)}>View</button></td>
          </tr>
          // <td><button onClick={() => handleViewClick(pdf_files.id)}>View</button></td>
        ))}
        <td><button onClick={() => handleViewClick(pdf_files.id)}>View</button></td>
      </tbody>
    </table>
  );
}

export default FileList;