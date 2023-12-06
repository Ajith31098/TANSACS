import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { Logout , removeexp_age } from '../../redux'
import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Ribbon from '../../logo/ribbon.png' 




function Jobs(props) {

    const navigate  = useNavigate()

    useEffect(()=>{
        if (! props.isLogin){
            navigate('/')
        }
    },[props.isLogin])

    useEffect(()=>{

        props.removeexp_age()
    },[])

  return (
    <>
    <div className='mt-5'>
        <h4 className='text-4xl text-red-600 font-bold mb-5'>Tamil Nadu State AIDS Control Society</h4>

        <div className='flex flex-col gap-2 mb-3'>
            <p className='font-semibold'>Tamil Nadu State AIDS Control Society (TANSACS), Chennai invites applications
             from eligible candidates with the qualifications / requirements mentioned against each along with recent passport
              size photographs with self attested  Xerox copies of Mark sheet (10th, +2, UG degree & PG degree) & Experience 
              certificates (to be uploaded) for the following contractual posts on consolidated monthly remuneration and purely
               temporary</p>
  
        </div>

        
    </div>
    <div className='flex flex-col items-center'>
        <div className='w-10/12 m-auto grid lg:grid-cols-11 grid-cols-1 justify-center  gap-1'>
            <div className="col-span-4 flex flex-col gap-4 lg:mt-14 mt-0 order-2 lg:order-2">
                <div className='w-full'>
                    <Link to={'/tansacs/cluster_manager'} className="p-2 block group relative  w-full overflow-hidden rounded-2xl bg-red-600 text-sm font-semibold text-white">
                        Cluster Program Manager ( Post-7 )
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                    </Link>
                    
                </div>
                <div className='w-full'>
                    <Link to={'/tansacs/clinical_officer'} className="p-2 block group relative  w-full overflow-hidden rounded-2xl bg-red-600 text-sm font-semibold text-white">
                        Clinical Server Officer - 2 Post
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                    </Link>
                    
                </div>
                <div className='w-full'>
                    <Link to={'/tansacs/data_monitoring_officer'} className="p-2 block group relative  w-full overflow-hidden rounded-2xl bg-red-600 text-sm font-semibold text-white">
                        Data Monitoring Documentation Officer - 1 Post
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                    </Link>
                    
                </div>
                <div className='w-full'>
                    <Link to={'/tansacs/deputy_director_ls'} className="p-2 block group relative  w-full overflow-hidden rounded-2xl bg-red-600 text-sm font-semibold text-white">
                        Deputy Director (LS) - 1 Post
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                    </Link>
                    
                </div>
                
            </div>
            <div className="col-span-3 order-1 lg:order-2 flex flex-col justify-between">
                <p className='text-red-600 mb-2 font-bold underline'>Please Select Your Job</p>
                <img src={Ribbon} alt="ribbon"  className='block w-full h-3/4' />

            </div>
            <div className="col-span-4 flex flex-col gap-4 lg:mt-14 mt-0 order-3">
                    <Link to={'/tansacs/deputy_director_si'} className="p-2 block group relative  w-full overflow-hidden rounded-2xl bg-red-600 text-sm font-semibold text-white">
                        Deputy Director (SI) - 1 Post
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                    </Link>

                    <Link to={'/tansacs/assistant_director_ictc'} className="p-2 block group relative  w-full overflow-hidden rounded-2xl bg-red-600 text-sm font-semibold text-white">
                        Assistant Director (ICTC) / (BSD) - 1 Post
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                    </Link>

                    <Link to={'/tansacs/assistant_director_ti'} className="p-2 block group relative  w-full overflow-hidden rounded-2xl bg-red-600 text-sm font-semibold text-white">
                        Assistant Director (Prevention) / (TI) - 2 Post
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                    </Link>

                    <Link to={'/tansacs/assistant_director_iec'} className="p-2 block group relative  w-full overflow-hidden rounded-2xl bg-red-600 text-sm font-semibold text-white">
                        Assistant Director (IEC) - 1 Post
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                    </Link>

                
                
            </div>
            
            
            
        </div>

        
    </div>
    <div className='text-center'>
        <p className='text-red-600 font-semibold text-lg my-5 underline cursor-pointer' onClick={props.logout}>logout</p>

    </div>
    </>
  );
}

const mapStateToProps =  state =>{


    return {

        isLogin : state.login.isLogin,
        state:state
    }
}

const mapDispatchToProps = dispatch =>{

    return {
        logout : ()=> dispatch(Logout()),
        removeexp_age : ()=> dispatch(removeexp_age())
    }
}



export default connect(mapStateToProps , mapDispatchToProps)( Jobs);
