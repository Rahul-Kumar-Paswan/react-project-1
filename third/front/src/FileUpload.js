import React from 'react';
import axios from 'axios';

class FileUpload extends React.Component {
  state = {
    selectedFile: null,
    message: '',
  };

  handleFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  handleUploadClick = async () => {
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);

    try {
      await axios.post('/upload', formData);
      this.setState({ message: 'File uploaded successfully!' });
    } catch (error) {
      console.error(error);
      this.setState({ message: 'Error uploading file' });
    }
  };

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleFileChange} />
        <button onClick={this.handleUploadClick}>Upload</button>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default FileUpload;
