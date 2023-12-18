import { Link } from "react-router-dom";

import { connect } from "react-redux";


function ServerError500(props) {
    return (
        <>
            <div className="w-full  flex  items-center justify-center p-4 my-10">
                <div className="w-full lg:w-1/2 shadow-md p-5">
                    <div className="w-full  flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center p-4">
                        <p className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-gray-300">500</p>
                        <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-300 mt-2">Server Error</p>
                        <p className="text-lg md:text-xl lg:text-2xl text-gray-500 my-12">Whoops, something went wrong on our servers.Please check your network connections.</p>

                        {props.isLogin ? (
                            props.is_superuser ? (
                                <Link to={'/admin/home'} className="px-3 py-1 block group relative overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white">
                                    Home
                                    <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                </Link>
                            ) : (
                                <Link to={'/tansacs/jobs'} className="px-3 py-1 block group relative overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white">
                                    Home
                                    <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                </Link>
                            )
                        ) : (
                            <Link to={'/'} className="px-3 py-1 block group relative  overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white">
                                Login
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                            </Link>
                        )}
                    </div>

                </div>
            </div>

        </>

    );
}

const mapStateToProps = state => {


    return {

        isLogin: state.login.isLogin,
        is_superuser: state.login.is_superuser,

    }
}


export default connect(mapStateToProps)(ServerError500);