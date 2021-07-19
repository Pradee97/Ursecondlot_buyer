import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {   
    return (
    <div style={{ height:"80vh", display: "flex", "align-items": "center", "justify-content": "center"}}>
        
        <ReactLoading type="spokes" color="#002768" height={'5%'} width={'5%'} />
      
    </div>
    );
  };
  
export default Loading ;
  
