import React from 'react';
import {Link} from 'react-router-dom'

function Jobs() {
  return (
    <>
    <div className='mt-5'>
        <h4 className='text-4xl text-red-600 font-bold mb-5'>Tamil Nadu State AIDS Control Society</h4>

        
        <div className='flex flex-col gap-2 mb-3'>
            <p className='font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
             fuga placeat magnam aliquam debitis amet? Tenetur, voluptatibus molestiae. Provident possimus ex 
             vitae odio voluptate sit tempora aliquid maiores quia reprehenderit!
             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate enim nisi voluptas tenetur. 
             Ab rem perferendis ex aliquam, sint unde expedita recusandae, reiciendis qui quos pariatur, totam 
             dolorum eius commodi.</p>
  
        </div>
        
    </div>
    <div className='flex flex-col items-center'>
        <div className='w-10/12 m-auto grid lg:grid-cols-10 grid-cols-1 justify-center  gap-4'>
            <div className="col-span-4 flex flex-col gap-4 lg:mt-14 mt-0 order-2 lg:order-2">
                <div className='w-full'>
                    <Link to={'/cluster_manager'} className="p-2 block group relative  w-full overflow-hidden rounded-2xl bg-red-600 text-md font-semibold text-white">
                        Cluster Program Manager ( Post-7 )
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                    </Link>
                    
                </div>
                <div className='w-full'>
                    <Link to={'/clinical_officer'} className="p-2 block group relative  w-full overflow-hidden rounded-2xl bg-red-600 text-md font-semibold text-white">
                        Clinical Server Officer - 2 Post
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                    </Link>
                    
                </div>
                <div className='w-full'>
                    <Link to={'/data_monitoring_officer'} className="p-2 block group relative  w-full overflow-hidden rounded-2xl bg-red-600 text-md font-semibold text-white">
                        Data Monitoring Documentation Officer - 1 Post
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                    </Link>
                    
                </div>
                <div className='w-full'>
                    <Link to={'/deputy_director_ls'} className="p-2 block group relative  w-full overflow-hidden rounded-2xl bg-red-600 text-md font-semibold text-white">
                        Deputy Director (LS) - 1 Post
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                    </Link>
                    
                </div>
                
            </div>
            <div className="col-span-2 order-1 lg:order-2">
                <p className='text-red-600 mb-2 font-bold underline'>Please Select Your Job</p>

            </div>
            <div className="col-span-4 flex flex-col gap-4 lg:mt-14 mt-0 order-3">
                    <Link to={'/deputy_director_si'} className="p-2 block group relative  w-full overflow-hidden rounded-2xl bg-red-600 text-md font-semibold text-white">
                        Deputy Director (SI) - 1 Post
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                    </Link>

                    <Link to={'/assistant_director_ictc'} className="p-2 block group relative  w-full overflow-hidden rounded-2xl bg-red-600 text-md font-semibold text-white">
                        Assistant Director (ICTC) / (BSD) - 1 Post
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                    </Link>

                    <Link to={'/assistant_director_ti'} className="p-2 block group relative  w-full overflow-hidden rounded-2xl bg-red-600 text-md font-semibold text-white">
                        Assistant Director (Prevention) / (TI) - 2 Post
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                    </Link>

                    <Link to={'/assistant_director_iec'} className="p-2 block group relative  w-full overflow-hidden rounded-2xl bg-red-600 text-md font-semibold text-white">
                        Assistant Director (IEC) - 1 Post
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                    </Link>

                
                
            </div>
            
            
            
        </div>

        
    </div>
    </>
  );
}

export default Jobs;
