import React from 'react';

function DownloadButton() {
  const handleDownload = () => {
    fetch('/download_file/Tansacsjobcriteria.pdf')
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Tansacsjobcriteria.pdf';
        a.click();
      });
  };

  return (

    <>


      <button onClick={handleDownload} className='text-red-600 font-semibold text-xl my-6 underline'>TANSACS Recruitment Eligibility Criteria.pdf</button>
    </>
  );
}

export default DownloadButton;
