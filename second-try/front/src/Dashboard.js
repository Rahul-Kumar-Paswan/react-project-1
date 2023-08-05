import React, { useState ,useEffect} from 'react';
import axios from 'axios';

function Dashboard() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [filesList, setFilesList] = useState([]);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  // Function to handle file submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('File uploaded successfully!');
      setFileName('');
      setFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to fetch files list from the server
  const fetchFilesList = async () => {
    try {
      const response = await axios.get('/api/files');
      setFilesList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

   // Call fetchFilesList function when component mounts
   useEffect(() => {
     fetchFilesList();
   }, []);

   return (
     <div>
       <h1>Dashboard</h1>

       {/* File upload form */}
       <form onSubmit={handleSubmit}>
         <input type="file" onChange={handleFileUpload} />
         <button type="submit">Upload</button>
         {fileName && <p>Selected file: {fileName}</p>}
       </form>

       {/* Files list */}
       <h2>Files List</h2>
       {filesList.length > 0 ? (
         <ul>
           {filesList.map((file) => (
             <li key={file.id}>
               <a href={`/api/files/${file.id}`} target="_blank" rel="noopener noreferrer">
                 {file.name}
               </a>
             </li>
           ))}
         </ul>
       ) : (
         <p>No files found.</p>
       )}

     </div>
   );
 }

 export default Dashboard;