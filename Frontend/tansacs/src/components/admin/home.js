import { useQuery } from "react-query";
import axios from "axios";
import { APPLICANT_COUNT } from "../endpoints/admin/AdminEndPoints";
import LoadingComponent from "../basecomponents/loading";
import {connect} from 'react-redux'
import { Link } from "react-router-dom";
import {useMutation } from 'react-query'    
import { useNavigate } from 'react-router-dom'
import { Logout } from '../../redux'
import React from "react";
import { useEffect } from "react";


function AdminHome(props) {


    async function LogoutUser() {
        try {
            const response = await axios.post('http://127.0.0.1:8000/logout', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${props.token}`
                    
                },
            });
            return response.data;
        } catch (error) {
            // Handle errors here if needed
            console.error('Error:', error);
            throw error; // Re-throw the error to be caught by the caller
        }
    }

    const navigate = useNavigate()


    const [loading, setLoading] = React.useState(false);


    const mutation = useMutation(LogoutUser)

    function logoutButton(){
       
        props.logout()
        // setLoading(true)

        // mutation.mutate( {

          
        //     onSuccess:(data)=>{


        //         setLoading(false)

        //     },
        //     onError: (error) => {
                
        //         console.log(error.response.data);
                
        //             setLoading(false)

        //       },
        //  })
    }


    useEffect(() => {

        if(!props.isLogin){
            navigate('/')
        }

       }, [props.isLogin]);


    const {isLoading , data} = useQuery("applicant_count" , ()=>{
       return axios.get(APPLICANT_COUNT , {
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `token ${props.token}`
        }
       })
    })

    if (isLoading){
        return <LoadingComponent/>
    }

    return ( 
        <>
        {console.log(data , props.token)}
        <h4 className='text-4xl text-red-600 font-bold mt-14 mb-14'>Tamil Nadu State AIDS Control Society</h4>

        <p className=' text-2xl font-semibold '>DASHBORD HAS TO BE ESTABLISHED TO TRACK RECIEVED JOB POSTING</p>
        <div className="text-end">
            <button onClick={()=>{logoutButton()}}  className="px-4 py-1 block group relative  w-max overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white" >Logout
                <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
            </button>
        </div>
        <div className="grid grid-cols-3 mt-10 gap-10">
            <div className="lg:col-span-1">
                <div className='w-full mb-10'>
                    <Link to={'CPM'} className="p-0 truncate px-3 block group relative  w-full overflow-hidden rounded-xl bg-red-600 text-lg font-semibold text-white">
                    Cluster Program MAnager - 7 Post
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                    </Link>
                    <a href="#" className="p-0 truncate px-3 block group relative  w-full overflow-hidden rounded-xl bg-red-600 text-lg font-semibold text-white" >
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                    </a>
                </div>
                <div className="flex justify-center">
                    <table className="items-center bg-transparent w-2/3 border rounded-lg">
                        
                        <thead>
                        <tr className="bg-gray-200">
                            <th className=" text-red-500 align-middle border border-solid border-black py-3 text-xs uppercase  whitespace-nowrap font-semibold">
                                        Post
                            </th>
                            <th className=" text-red-500 align-middle border border-solid border-black py-3 text-xs uppercase  whitespace-nowrap font-semibold">
                                        Applicant
                            </th>
                            
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <th className="border border-solid border-black align-middle  text-xs whitespace-nowrap  p-4  ">
                                APPLICENT RECIVED 
                            </th>
                            <td className="border border-solid border-black align-middle  text-xs whitespace-nowrap p-4 ">
                                {data.data.find(position => position.abbreviation === 'CPM')?.applicants_count || 0}
                            </td>
                            
                            
                        </tr>
                        
                        </tbody>

                    </table>
                </div>
            </div>
            <div className="lg:col-span-1 col-span-3">
                <div className='w-full mb-10'>
                    <a href="#" className="p-0 truncate px-3 block group relative  w-full overflow-hidden rounded-xl bg-red-600 text-lg font-semibold text-white" >Deputy Director (SI) - 1 Post
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                    </a>
                </div>
                <div className="flex justify-center">
                    <table className="items-center bg-transparent w-2/3 border rounded-lg">
                        
                        <thead>
                        <tr className="bg-gray-200">
                            <th className=" text-red-500 align-middle border border-solid border-black py-3 text-xs uppercase  whitespace-nowrap font-semibold">
                                        Post
                            </th>
                            <th className=" text-red-500 align-middle border border-solid border-black py-3 text-xs uppercase  whitespace-nowrap font-semibold">
                                        Applicant
                            </th>
                            
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <th className="border border-solid border-black align-middle  text-xs whitespace-nowrap  p-4  ">
                                APPLICENT RECIVED 
                            </th>
                            <td className="border border-solid border-black align-middle  text-xs whitespace-nowrap p-4 ">
                                {data.data.find(position => position.abbreviation === 'DD_SI')?.applicants_count || 0}

                            </td>
                            
                            
                        </tr>
                        
                        </tbody>

                    </table>
                </div>
            </div>
            <div className="lg:col-span-1 col-span-3">
                <div className='w-full mb-10'>
                    <a href="#" className="p-0 truncate px-3 block group relative  w-full overflow-hidden rounded-xl bg-red-600 text-lg font-semibold text-white" >Deputy Director (LS) - 1 Post
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                    </a>
                </div>
                <div className="flex justify-center">
                    <table className="items-center bg-transparent w-2/3 border rounded-lg">
                        
                        <thead>
                        <tr className="bg-gray-200">
                            <th className=" text-red-500 align-middle border border-solid border-black py-3 text-xs uppercase  whitespace-nowrap font-semibold">
                                        Post
                            </th>
                            <th className=" text-red-500 align-middle border border-solid border-black py-3 text-xs uppercase  whitespace-nowrap font-semibold">
                                        Applicant
                            </th>
                            
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <th className="border border-solid border-black align-middle  text-xs whitespace-nowrap  p-4  ">
                                APPLICENT RECIVED 
                            </th>
                            <td className="border border-solid border-black align-middle  text-xs whitespace-nowrap p-4 ">
                                {data.data.find(position => position.abbreviation === 'DD_LS')?.applicants_count || 0}

                            </td>
                            
                            
                        </tr>
                        
                        </tbody>

                    </table>
                </div>
            </div>
           <div className="lg:col-span-1 col-span-3">
                <div className='w-full mb-10'>
                    <a href="#" className="p-0 truncate px-3 block group relative  w-full overflow-hidden rounded-xl bg-red-600 text-lg font-semibold text-white" >Clinical Server Officer - 2 Post
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                    </a>
                </div>
                <div className="flex justify-center">
                <table className="items-center bg-transparent w-2/3 border rounded-lg">
                        
                        <thead>
                        <tr className="bg-gray-200">
                            <th className=" text-red-500 align-middle border border-solid border-black py-3 text-xs uppercase  whitespace-nowrap font-semibold">
                                        Post
                            </th>
                            <th className=" text-red-500 align-middle border border-solid border-black py-3 text-xs uppercase  whitespace-nowrap font-semibold">
                                        Applicant
                            </th>
                            
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <th className="border border-solid border-black align-middle  text-xs whitespace-nowrap  p-4  ">
                                APPLICENT RECIVED 
                            </th>
                            <td className="border border-solid border-black align-middle  text-xs whitespace-nowrap p-4 ">
                            {data.data.find(position => position.abbreviation === 'CSO')?.applicants_count || 0}

                            </td>
                            
                            
                        </tr>
                        
                        </tbody>

                    </table>
                </div>
            </div>
           <div className="lg:col-span-1 col-span-3">
                <div className='w-full mb-10'>
                    <a href="#" className="truncate px-3 p-0 block group relative  w-full overflow-hidden rounded-xl bg-red-600 text-lg font-semibold text-white" >Assistant Director (ICTC) / (BSD) - 1 Post
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                    </a>
                </div>
                <div className="flex justify-center">
                    <table className="items-center bg-transparent w-2/3 border rounded-lg">
                        
                        <thead>
                        <tr className="bg-gray-200">
                            <th className=" text-red-500 align-middle border border-solid border-black py-3 text-xs uppercase  whitespace-nowrap font-semibold">
                                        Post
                            </th>
                            <th className=" text-red-500 align-middle border border-solid border-black py-3 text-xs uppercase  whitespace-nowrap font-semibold">
                                        Applicant
                            </th>
                            
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <th className="border border-solid border-black align-middle  text-xs whitespace-nowrap  p-4  ">
                                APPLICENT RECIVED 
                            </th>
                            <td className="border border-solid border-black align-middle  text-xs whitespace-nowrap p-4 ">
                            {data.data.find(position => position.abbreviation === 'AD_ICTC')?.applicants_count || 0}
                                
                            </td>
                            
                            
                        </tr>
                        
                        </tbody>

                    </table>
                </div>
            </div>
            <div className="lg:col-span-1 col-span-3">
                <div className='w-full mb-10'>
                    <a href="#" className="truncate px-3 p-0 block group relative  w-full overflow-hidden rounded-xl bg-red-600 text-lg font-semibold text-white" >Assistant Director (IEC) - 1 Post
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                    </a>
                </div>
                <div className="flex justify-center">
                    <table className="items-center bg-transparent w-2/3 border rounded-lg">
                        
                        <thead>
                        <tr className="bg-gray-200">
                            <th className=" text-red-500 align-middle border border-solid border-black py-3 text-xs uppercase  whitespace-nowrap font-semibold">
                                        Post
                            </th>
                            <th className=" text-red-500 align-middle border border-solid border-black py-3 text-xs uppercase  whitespace-nowrap font-semibold">
                                        Applicant
                            </th>
                            
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <th className="border border-solid border-black align-middle  text-xs whitespace-nowrap  p-4  ">
                                APPLICENT RECIVED 
                            </th>
                            <td className="border border-solid border-black align-middle  text-xs whitespace-nowrap p-4 ">
                            {data.data.find(position => position.abbreviation === 'AD_IEC')?.applicants_count || 0}

                            </td>
                            
                            
                        </tr>
                        
                        </tbody>

                    </table>
                </div>
            </div>
           <div className="lg:col-span-1 col-span-3">
                <div className='w-full mb-10'>
                    <a href="#" className="p-0 block truncate px-3 group relative  w-full overflow-hidden rounded-xl bg-red-600 text-lg font-semibold text-white" >Data Monitoring Documentation Officer - 1 Post
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                    </a>
                </div>
                <div className="flex justify-center">
                    <table className="items-center bg-transparent w-2/3 border rounded-lg">
                        
                        <thead>
                        <tr className="bg-gray-200">
                            <th className=" text-red-500 align-middle border border-solid border-black py-3 text-xs uppercase  whitespace-nowrap font-semibold">
                                        Post
                            </th>
                            <th className=" text-red-500 align-middle border border-solid border-black py-3 text-xs uppercase  whitespace-nowrap font-semibold">
                                        Applicant
                            </th>
                            
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <th className="border border-solid border-black align-middle  text-xs whitespace-nowrap  p-4  ">
                                APPLICENT RECIVED 
                            </th>
                            <td className="border border-solid border-black align-middle  text-xs whitespace-nowrap p-4 ">
                            {data.data.find(position => position.abbreviation === 'DMDO')?.applicants_count || 0}
                                
                            </td>
                            
                            
                        </tr>
                        
                        </tbody>

                    </table>
                </div>
            </div>
           <div className="lg:col-span-1 col-span-3">
                <div className='w-full mb-10 '>
                    <a href="#" className="p-1 truncate block px-3 group relative  w-full overflow-hidden rounded-xl bg-red-600 text-lg font-semibold text-white" >Assistant Director (Prevention) / (TI) - 2 Post
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                    </a>
                </div>
                <div className="flex justify-center">
                    <table className="items-center bg-transparent w-2/3 border rounded-lg">
                        
                        <thead>
                        <tr className="bg-gray-200">
                            <th className=" text-red-500 align-middle border border-solid border-black py-3 text-xs uppercase  whitespace-nowrap font-semibold">
                                        Post
                            </th>
                            <th className=" text-red-500 align-middle border border-solid border-black py-3 text-xs uppercase  whitespace-nowrap font-semibold">
                                        Applicant
                            </th>
                            
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <th className="border border-solid border-black align-middle  text-xs whitespace-nowrap  p-4  ">
                                APPLICENT RECIVED 
                            </th>
                            <td className="border border-solid border-black align-middle  text-xs whitespace-nowrap p-4 ">
                            {data.data.find(position => position.abbreviation === 'AD_TI')?.applicants_count || 0}
                                
                            </td>
                            
                            
                        </tr>
                        
                        </tbody>

                    </table>
                </div>
            </div>
            
        </div>
        </>
     );
}


const mapStateToProps =  state =>{


    return {

        isLogin : state.login.isLogin,
        // isSuperuser:state.login.is_superuser,
        token : state.login.token
    }
}

const mapDispatchToProps = dispatch =>{

    return {
        logout : ()=> dispatch(Logout())
    }
}

export default connect(mapStateToProps , mapDispatchToProps) (AdminHome);

                