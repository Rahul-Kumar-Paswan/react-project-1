import React from 'react';
import axios from 'axios';

class Upload extends React.Component {

   state={
      selectedFile:null,
      message:''
   }

   onChangeHandler=event=>{
      this.setState({
         selectedFile:event.target.files[0]
      })
   }

   onClickHandler=()=>{
      const data=new FormData();
      data.append('pdf',this.state.selectedFile);

      axios.post("http://localhost:5000/upload",data)
         .then(res=>{
            this.setState({message:'File uploaded successfully!'});
         })
         .catch(err=>{
            console.error(err);
            this.setState({message:'Failed to upload file.'});
         });
   }

   render(){
      return(
         <div>
            <h2>Upload PDF File</h2>
            <input type="file" name="pdf" onChange={this.onChangeHandler} />
            <button type="button" onClick={this.onClickHandler}>Upload</button>
            <p>{this.state.message}</p>
         </div>
      );
   }
}

export default Upload;