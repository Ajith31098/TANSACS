import React from 'react';
import axios from 'axios';

function DownloadButton(props) {
  const handleDownload = () => {
    axios({
      url: `http://127.0.0.1:8000/download_file/${props.file_name}`,
      method: 'GET',
      responseType: 'blob', // Important for handling the binary data
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', props.file_name);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Download error:', error);
      });
  };


  return (
    <>
      <button onClick={handleDownload} className='text-red-600 font-semibold text-xl mt-2 underline'>
        {props.content}
      </button>
    </>
  );
}

export default DownloadButton;
