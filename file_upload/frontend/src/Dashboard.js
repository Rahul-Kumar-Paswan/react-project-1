import React, { useState } from 'react';
import axios from 'axios';
// import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";

function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(null);
  
  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
  }
  
  function handleUpload() {
    const formData = new FormData();
    
    formData.append('file', selectedFile);
    
    axios.post('/upload', formData)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
      
     setSelectedFile(null); 
   }
   
   const [filesList, setFilesList] = useState([]);
   
   function fetchFiles() {
     axios.get('/files')
       .then(response => setFilesList(response.data))
       .catch(error => console.error(error));
   }
   
   return (
     <div>
       <h1>Dashboard</h1>
       
       <input type="file" onChange={handleFileChange} />
       <button onClick={handleUpload}>Upload</button>
       
       <hr />
       
       <h2>Files List</h2>
       
       <ul>
         {filesList.map(({ id ,name }) =>
           <li key={id}>
             <a href={`http://localhost:5000/login/${name}`} target="_blank" rel="noreferrer">{name}</a>
           </li>
         )}
       </ul>
       
       <button onClick={fetchFiles}>Refresh Files List</button>
     </div>
   );
}

export default Dashboard;