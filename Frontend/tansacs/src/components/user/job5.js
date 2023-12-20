import { Link } from 'react-router-dom'
import ApplyButton from '../basecomponents/ApplySuggestion';
import { connect } from 'react-redux'
import { removeexp_age } from '../../redux'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { DEPUTY_SI_DIRECTOR } from '../initialValues/JobPost'

function Job5(props) {
    const navigate = useNavigate()

    useEffect(() => {
        if (!props.isLogin) {
            navigate('/')
        }
    }, [props.isLogin])

    useEffect(() => {

        props.removeexp_age()
    })
    return (
        <>
            <div className='mt-5'>
                <h4 className='text-custom-red font-bold mb-7  lg:text-[50px] md:text-[40px] text-[35px]'>Tamil Nadu State AIDS Control Society</h4>


                <h4 className='text-2xl my-5 underline font-semibold'> DEPUTY DIRECTOR (SI) - 1 POST</h4>


            </div>

            <div className="lg:col-span-1 col-span-3">


                <div className="block w-full overflow-x-auto rounded-t-md">
                    <table className="items-center bg-transparent w-full  border-collapse border border-gray-400">
                        <caption className="caption-top bg-red-600 p-4 font-semibold text-white">
                            CONSOLIDATED MONTHLY REMUNERATION
                            ( PER MONTH ) RS 50,680/-
                        </caption>
                        {/* <thead>
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
                                        THENI
                                    </td>
                                    <td className="border-2 border-gray-400  align-center  text-xs whitespace-nowrap px-7 py-2">
                                        1
                                    </td>

                                </tr> */}



                        {/* </tbody> */}

                    </table>
                </div>

            </div>

            <div className="grid grid-cols-3 gap-5 ">

                <div className="lg:col-span-3 col-span-3">
                    <div className="border border-slate-400 rounded-b-md p-5 flex flex-col gap-5 text-start">
                        <p className="text-base font-bold uppercase">Essential Qualification:</p>
                        <li>Bachelors Degree in Medical Sciences and MD/DNB (Community
                            Medicine / Epidemiology)
                            OR
                            Master / Post Graduation in Public Health / Health Administration
                            / Applied Epidemiology or Diploma in Public Health/Masters in
                            Demography / Statistics / Population Sciences / Social Sciences /
                            Computer Application (Two year course) and similar streams from
                            a Recognized University
                        </li>

                        <p className="text-base font-bold uppercase">Essential Experience:</p>
                        <ul className="list-disc mx-4">
                            <li>5 year's experience in Public Health in surveillance / research
                                / M&E / Epidemiology.
                            </li>

                            <li>Working knowledge of computers including MS office package
                                and SPSS </li>

                            <li>Good working knowledge of Epidemiological analysis and
                                biostatistics.
                            </li>
                        </ul>

                        <p className="text-base font-bold uppercase">Desirable:</p>
                        <ul className="list-disc mx-4">
                            <li>Past experience of working in HIV/AIDS programme or
                                projects under Government or bilateral / multi-lateral
                                agencies in India. Good working knowledge of
                                Epidemiological analysis and other statistical packages.
                            </li>
                            <li>Preference will be given to the candidate working in the
                                field of HIV/AIDS.
                            </li>

                        </ul>

                        <p className="text-base font-bold uppercase">Age limit:</p>

                        <ul className="list-disc mx-4">
                            <li> 60 year's as on 30.06.2023</li>

                        </ul>
                    </div>
                </div>



            </div>

            <div className='flex justify-center mt-5'>
                <ApplyButton position={DEPUTY_SI_DIRECTOR} min_age={60} emin_age={60} link={'/tansacs/deputy_director_si/apply'} />

                {/* <Link to={'/deputy_director_si/apply'} className="px-3 py-1 block group relative  w-max overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white">
                        Apply
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                    </Link> */}
            </div>

        </>
    );
}

const mapStateToProps = state => {


    return {

        isLogin: state.login.isLogin,
    }
}

const mapDispatchToProps = dispatch => {

    return {
        removeexp_age: () => dispatch(removeexp_age())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Job5);