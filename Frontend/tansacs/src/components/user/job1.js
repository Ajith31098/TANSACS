import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import ApplyButton from '../basecomponents/ApplySuggestion';

function Job1(props) {
    return (
        <>
            <div className='mt-5'>
                <h4 className='text-4xl text-red-600 font-bold mb-14'>Tamil Nadu State AIDS Control Society</h4>


                <h4 className='text-2xl my-5 underline font-semibold'>CLUSTER PROGRAM MANAGER - 7 POSTS</h4>


            </div>

            <div className="grid grid-cols-3 gap-5  mt-5 p-10">

                <div className="lg:col-span-2 col-span-3">
                    <div className="border border-black p-3 flex flex-col gap-5 text-start">
                        <p>Bachelor’s Degree in Medical or Allied Health Sciences / Master’s
                            Degree in Public Health / Healthcare Management / Healthcare Administration /
                            Social Science / Psychology / Applied Epidemiology / Demography / Statistics /
                            Population Sciences or similar fields.
                        </p>

                        <p className="text-base font-bold">Experience:</p>
                        <ul className="list-disc mx-4">
                            <li>Three years’ experience for candidates with Master’s Degree in Public Health / Healthcare Management / Healthcare Administration / Applied Epidemiology.</li>
                            <li>Five years’ experience in Public Health for Bachelor’s Degree in Medical and Allied Sciences / Masters in Social Science / Psychology / Demography / Statistics / Population Sciences including a minimum two years of experience in HIV/AIDS sector.</li>
                        </ul>
                        <p>
                            <small className="text-base font-bold"> Age limit:</small>
                            For the existing employees of NACO/TANSACS/TSU, the upper age limit is 55
                            years as on 30.06.2023. For other candidates,
                            upper age limit is 50 years as on 30.06.2023.
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-1 col-span-3">


                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full  border-collapse border border-gray-400">
                            <caption className="caption-top bg-red-600 p-4 font-semibold text-white">
                                CONSOLIDATED MONTHLY REMUNERATION
                                ( PER MONTH ) RS 54,300/-
                            </caption>
                            <thead>
                                <tr className="bg-gray-200 border-2 border-gray-400">
                                    <th className="border-gray-400 text-red-500 align-middle border-2 border-solid  py-3 text-xs uppercase  whitespace-nowrap font-semibold">
                                        S.NO
                                    </th>
                                    <th className="border-gray-400 text-red-500 align-middle border-2 border-solid  py-3 text-xs uppercase  whitespace-nowrap font-semibold">
                                        DISTRICT
                                    </th>
                                    <th className="border-gray-400 text-red-500 align-middle border-2 border-solid  py-3 text-xs uppercase  whitespace-nowrap font-semibold">
                                        POST
                                    </th>

                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <th className="border-2 border-gray-400 align-middle  text-xs whitespace-nowrap  px-7 py-2  ">
                                        1
                                    </th>
                                    <td className="border-2 border-gray-400  align-middle  text-xs whitespace-nowrap px-7 py-2 ">
                                        TRICHY
                                    </td>
                                    <td className="border-2 border-gray-400  align-center  text-xs whitespace-nowrap px-7 py-2">
                                        1
                                    </td>

                                </tr>
                                <tr>
                                    <th className="border-2 border-gray-400  align-middle  text-xs whitespace-nowrap px-7 py-2 ">
                                        2
                                    </th>
                                    <td className="border-2 border-gray-400  align-middle  text-xs whitespace-nowrap px-7 py-2">
                                        NAMAKAL
                                    </td>
                                    <td className="border-2 border-gray-400  align-middle  text-xs whitespace-nowrap px-7 py-2">
                                        1
                                    </td>

                                </tr>
                                <tr>
                                    <th className="border-2 border-gray-400 align-middle  text-xs whitespace-nowrap px-7 py-2 ">
                                        3
                                    </th>
                                    <td className="border-2 border-gray-400  align-middle  text-xs whitespace-nowrap px-7 py-2">
                                        SALEM
                                    </td>
                                    <td className="border-2 border-gray-400  align-middle  text-xs whitespace-nowrap px-7 py-2">
                                        1
                                    </td>

                                </tr>
                                <tr>
                                    <th className="border-2 border-gray-400  align-middle  text-xs whitespace-nowrap px-7 py-2 ">
                                        4
                                    </th>
                                    <td className="border-2 border-gray-400  align-middle  text-xs whitespace-nowrap px-7 py-2">
                                        THANJAVUR
                                    </td>
                                    <td className="border-2 border-gray-400  align-middle  text-xs whitespace-nowrap px-7 py-2">
                                        1
                                    </td>

                                </tr>
                                <tr>
                                    <th className="border-2 border-gray-400  align-middle  text-xs whitespace-nowrap px-7 py-2 ">
                                        5
                                    </th>
                                    <td className="border-2 border-gray-400  align-middle  text-xs whitespace-nowrap px-7 py-2">
                                        VILLUPURAM
                                    </td>
                                    <td className="border-2 border-gray-400  align-middle  text-xs whitespace-nowrap px-7 py-2">
                                        1
                                    </td>

                                </tr>
                                <tr>
                                    <th className="border-2 border-gray-400  align-middle  text-xs whitespace-nowrap px-7 py-2 ">
                                        6
                                    </th>
                                    <td className="border-2 border-gray-400  align-middle  text-xs whitespace-nowrap px-7 py-2">
                                        KRISHNAGIRI
                                    </td>
                                    <td className="border-2 border-gray-400  align-middle  text-xs whitespace-nowrap px-7 py-2">
                                        1
                                    </td>

                                </tr>
                                <tr>
                                    <th className="border-2 border-gray-400  align-middle  text-xs whitespace-nowrap px-7 py-2 ">
                                        7
                                    </th>
                                    <td className="border-2 border-gray-400  align-middle  text-xs whitespace-nowrap px-7 py-2">
                                        KANCHEEPURAM
                                    </td>
                                    <td className="border-2 border-gray-400  align-middle  text-xs whitespace-nowrap px-7 py-2">
                                        1
                                    </td>

                                </tr>
                            </tbody>

                        </table>
                    </div>

                </div>

            </div>

            <div className='flex justify-center'>
                
                <ApplyButton position="Cluster Program Manager" min_age ={50} emin_age = {55} link = {'/tansacs/cluster_manager/apply'} />
                    
                   
                
            </div>

        </>
    );
}




export default  Job1;