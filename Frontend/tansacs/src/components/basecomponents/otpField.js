// import React, { useState, useRef, useEffect } from 'react';

// const OTPVerificationModal = () => {
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

//   useEffect(() => {
//     inputRefs[0]?.current?.focus();
//   }, []);

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (isNaN(value)) return; // Only allow numeric input

//     const updatedOtp = [...otp];
//     updatedOtp[index] = value;
//     setOtp(updatedOtp);

//     if (value !== '' && index < otp.length - 1) {
//       inputRefs[index + 1]?.current?.focus();
//     }
//   };

//   const handleSubmit = () => {
//     const otpValue = otp.join('');
//     console.log('OTP:', otpValue);
//   };

//   const handleBack = () => {
//     const emptyIndex = otp.findIndex((digit) => digit === '');
//     if (emptyIndex > 0) {
//       inputRefs[emptyIndex - 1]?.current?.focus();
//     }
//   };

//   return (
//       <div className=" w-full md:w-96 mx-auto mt-32 rounded-lg shadow-lg p-6">
//         <h3 className="text-xl font-medium">Enter OTP</h3>
//         <form className="space-y-4">
//           <div className="flex gap-2 justify-center items-center">
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 ref={inputRefs[index]}
//                 type="text"
//                 className="bg-rose-200 border text-dark border-rose-600 text-center  text-sm rounded-lg focus:ring-0  focus:border-red-500 h-12 w-12 px-2.5 py-2 "
//                 maxLength="1"
//                 value={digit}
//                 onChange={(e) => handleChange(e, index)}
//               />
//             ))}
//           </div>

//           <div className="flex">
//           <div className='w-max'>
//               <button
//                   type='button'
//                   className='px-3 py-1 block group relative w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white'
//                   onClick={handleBack} // Handle resend click
//               >
//                   Cancel
//               </button>
//               </div>
//           <div className='w-max'>
//               <button
//                   type='button'
//                   className='px-3 py-1 block group relative w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white'
//                   onClick={handleResendClick} // Handle resend click
//               >
//                   Resend
//               </button>
//               </div>
//           <div className='w-max'>
//           </div>
//               <button type='submit' className="px-4 py-1 block group relative  w-max overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Enter
//                   <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
//               </button>
//               {/* <a href="#" className="px-3 py-1 block group relative  w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Enter
//               <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
//               </a> */}
//         </div>

//         </form>
        
//       </div>
//   );
// };

// export default OTPVerificationModal;




































// <Formik
            
//             initialValues={ initialValues}
//             validationSchema={validationSchema}
//             onSubmit = {onSubmit}

//         >
//                 {
//                    ({ values, handleChange, handleBlur,setFieldValue, touched, errors })=>(

//                         <Form
//                         className='flex justify-center'>
//                             <div className='lg:w-1/5 w-full'>
                                
//                                 <div className='mb-5'>
//                                     <Field
//                                         id="otp"
//                                         name="otp"
//                                         type="text"
//                                         className= {touched.otp && errors.otp ? 'text-center text-xl border border-2 py-1 px-2 border-red-400 w-full rounded text-sm focus:outline-none focus:border-sky-400' : 'text-xl text-center border border-2 py-1 px-2 text-sm border-gray-400 w-full rounded focus:outline-none focus:border-sky-400'}
//                                         placeholder =" X X X X"
//                                         disabled={disableInput}
//                                     />
//                                     <div>
//                                         <p className='text-red-600 text-sm text-start font-bold'>

//                                             <ErrorMessage name='otp'/>

//                                         </p>

//                                     </div>
//                                 </div>
//                                 <div className='my-5'>
//                                     <p className='text-sm'>Did'nt recieve OTP <small className='text-red-600'>{Math.floor(timer / 60)}:{timer % 60}</small></p>
//                                 </div>

//                                 <div className="mt-10 flex justify-around items-center">
//                                     <div className='w-max'>
//                                         <button
//                                             type='button'
//                                             className='px-3 py-1 block group relative w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white'
//                                             onClick={redirectLogin} // Handle resend click
//                                         >
//                                             Cancel
//                                         </button>
//                                     </div>
//                                     <div className='w-max'>
//                                         <button
//                                             type='button'
//                                             className='px-3 py-1 block group relative w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white'
//                                             onClick={handleResendClick} // Handle resend click
//                                         >
//                                             Resend
//                                         </button>
//                                         </div>
//                                     <div className='w-max'>
//                                         <button type='submit' className="px-4 py-1 block group relative  w-max overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Enter
//                                             <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
//                                         </button>
//                                         {/* <a href="#" className="px-3 py-1 block group relative  w-full overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Enter
//                                         <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
//                                         </a> */}
//                                     </div>

//                                 </div>
//                             </div>

                            
//                         </Form>
                        
//                    )
//                 }
            
//         </Formik>
        
