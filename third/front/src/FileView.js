import React from 'react';
import axios from 'axios';


class FileView extends React.Component {
    state ={
      fileId:'',
      url:''
    }
 
    handleInputChange =(event)=>{
      this.setState({fileId:event.target.value})
    }
 
    handleViewClick=async()=>{
      try{
        const response=await axios.get(`/view/${this.state.fileId}`,{
          responseType:'blob'
        })
        const url=window.URL.createObjectURL(new Blob([response.data]))
        this.setState({url})
      }catch(error){
        console.error(error)
      }
    }
 
    render(){
      return(
        <div>
          <input type="text" placeholder="Enter File ID" onChange={this.handleInputChange}/>
          <button onClick={this.handleViewClick}>View</button>
          {this.state.url && (
            <>
              {this.props.type==='image' ? (
                <img src={this.state.url} alt="file"/>
              ):(
                <embed src={this.state.url} type="application/pdf" width="100%" height="600px"/>
              )}
            </>
          )}
        </div>
      )
    }
 }

 export default FileView;
