import "../../css/preview.css"


function Preview() {
    return ( 
        <>



<div className="form-container w-2/3">
  <h1>TAMILNADU STATE AIDS CONTROL SOCIETY (TANSACS)</h1>

  <form action="your-backend-handler" method="post">
    <h2 className="section-header">Personal Details</h2>
    <table>
      <tr><th>UNIQUE ID</th><td><input  className = { 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="unique_id"/></td></tr>
      <tr><th>SELECT JOB POSTING</th><td><input className = { 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '}type="text" name="job_post"/></td></tr>
      <tr><th>NAME OF THE APPLICANT</th><td><input className={'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="applicant_name"/></td></tr>
      <tr><th>APPLICANT MOBILE NUMBER</th><td><input className={'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="mobile_number"/></td></tr>
      <tr><th>DATE OF BIRTH</th><td><input className={'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="dob"/></td></tr>
      <tr><th>AGE</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="age"/></td></tr>
      <tr><th>GENDER</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="gender"/></td></tr>
      <tr><th>MAIL ID</th><td><input className={'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="mail"/></td></tr>
      <tr><th>NAME OF GUARDIAN</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="guardian name"/></td></tr>
      <tr><th>AADHAR CARD NUMBER</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="aadhar"/></td></tr>
      <tr><th>EMERGENCY CONTACT NUMBER</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="emergency"/></td></tr>
    

    </table>

    <h2 className="section-header">Permenant Address</h2>
    <table>
      <tr><th>ADDRESS LINE 1</th><td  className="w-"><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="address_line1"/></td></tr>
      <tr><th>STATE</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="state"/></td></tr>
      <tr><th>DISTRICT</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="district"/></td></tr>
      <tr><th>TOWN/TALUK/CITY</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="town"/></td></tr>
      <tr><th>PINCODE</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="pincode"/></td></tr>

    </table>

    <h2 className="section-header">Education Details</h2>
    <table>
      <tr><th>SSLC REGISTER NUMBER</th><td className="w-100"><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="sslc_reg_no"/></td></tr>
      <tr><th>MONTH / YEAR OF PASSING</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="sslc_pass_year"/></td></tr>
      <tr><th>TYPE OF BOARD</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="sslc_board"/></td></tr>
      <tr><th>PERCENTAGE</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="sslc_percentage"/></td></tr>
      <p><input type="button" value="Certificate.pdf"/></p>

      <tr><th>HSE REGISTER NUMBER</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="hse_reg_no"/></td></tr>
      <tr><th>MONTH / YEAR OF PASSING</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="hse_pass_year"/></td></tr>
      <tr><th>TYPE OF BOARD</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="hse_board"/></td></tr>
      <tr><th>PERCENTAGE</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="hse_percentage"/></td></tr>
      <p><input type="button" value="Certificate.pdf"/></p>

      <tr><th>UG DEGREE</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="ug_degree"/></td></tr>
      <tr><th>UG REGISTER NUMBER</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="ug_reg_no"/></td></tr>
      <tr><th>MONTH / YEAR OF PASSING</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="ug_pass_year"/></td></tr>
      <tr><th>PERCENTAGE</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="ug_percentage"/></td></tr>
      <p><input type="button" value="Certificate.pdf"/></p>

      <tr><th>PG DEGREE</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="pg_degree"/></td></tr>
      <tr><th>PG REGISTER NUMBER</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="pg_reg_no"/></td></tr>
      <tr><th>MONTH / YEAR OF PASSING</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="pg_pass_tear"/></td></tr>
      <tr><th>PERCENTAGE</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="pg_percentage"/></td></tr>
      <p><input type="button" value="Certificate.pdf"/></p>
      
    </table>

    <h2 className="section-header">Experience Details</h2>
    <table>
      <tr><th>SELECTED DEGREE</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="selected_degree"/></td></tr>
      <tr><th>COMPANY NAME</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="company_name"/></td></tr>
      <tr><th>YEAR OF EXPERIENCE</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="exp_year"/></td></tr>
      <p><input type="submit" value="Certificate.pdf"/></p>

    </table>

    <h2 className="section-header">In Addition, preferable Work Experience</h2>
    <table>
      <tr><th>YEAR OF NACO EXPERIENCE</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="naco"/></td></tr>
      <p><input type="submit" value="Certificate.pdf"/></p>

      <tr><th>YEAR OF TANSACS EXPERIENCE</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="tansacs"/></td></tr>
      <p><input type="submit" value="Certificate.pdf"/></p>

      <tr><th>YEAR OF TSU EXPERIENCE</th><td><input className={ 'shadow-md font-bold border border-2 w-full py-1 px-2 rounded focus:outline-none focus:border-sky-400  border-gray-300 '} type="text" name="tsu"/></td></tr>
      <p><input type="submit" value="Certificate.pdf"/></p>
      
    </table>

  </form>
</div>



        </>
     );
}

export default Preview;