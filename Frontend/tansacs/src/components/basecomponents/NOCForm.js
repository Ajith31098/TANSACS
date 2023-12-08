import React from 'react';
import axios from 'axios';

function DownloadNOCButton() {
    const handleDownload = () => {
        axios({
            url: 'http://127.0.0.1:8000/download_file/NOCForm.pdf',
            method: 'GET',
            responseType: 'blob', // Important
        })
            .then((response) => {
                // Create a new Blob object using the response data of the onload object
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'NOCForm.pdf'); // or any other extension
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url); // Clean up and remove the object URL
            })
            .catch((error) => console.error('Download error:', error));
    };

    return (
        <>
            <button onClick={handleDownload} className='text-red-600 font-semibold text-xl mt-2 underline'>
                NOC Form.pdf
            </button>
        </>
    );
}

export default DownloadNOCButton;
