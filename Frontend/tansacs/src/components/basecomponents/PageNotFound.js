import { Link } from "react-router-dom";

import { connect } from "react-redux";

const PageNotFound = (props) => {

    return (

        <div className="font-Roboto text-center p-[50px] text-custom-red">

            <h1 style={{
                fontSize: "40px"
            }}>
                404 Error
            </h1>

            <p style={{
                fontSize: "20px"
            }}>
                Oops! The page you are looking for cannot be found.

            </p>
            <div className="flex flex-col justify-center items-center mt-5">

                <div className="w-max">
                    {props.isLogin ? (
                        props.is_superuser ? (
                            <Link to={'/admin/home'} className="px-5 py-1 block group relative overflow-hidden rounded-lg bg-custom-red text-sm font-semibold text-white">
                                Home
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                            </Link>
                        ) : (
                            <Link to={'/tansacs/jobs'} className="px-5 py-1 block group relative overflow-hidden rounded-lg bg-custom-red text-sm font-semibold text-white">
                                Home
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                            </Link>
                        )
                    ) : (
                        <Link to={'/'} className="px-5 py-1 block group relative  overflow-hidden rounded-lg bg-custom-red text-sm font-semibold text-white">
                            Login
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                        </Link>
                    )}
                </div>
            </div>

        </div>
    )
}


const mapStateToProps = state => {


    return {

        isLogin: state.login.isLogin,
        is_superuser: state.login.is_superuser,

    }
}


export default connect(mapStateToProps)(PageNotFound)