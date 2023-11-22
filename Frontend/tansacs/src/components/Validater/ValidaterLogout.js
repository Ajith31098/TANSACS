import React, { useEffect } from 'react';
import { useNavigate ,Outlet} from 'react-router-dom';
import { connect } from 'react-redux';

function ValidaterLogout(props) {
    const navigate = useNavigate();

    useEffect(() => {
        // If user is not logged in, redirect to 'signin'
        if (props.isLogin) {
            navigate('/jobs');
        }
    }, [props.isLogin, navigate]);

    // Render nothing here, as the redirect will happen via useEffect
    return !props.isLogin ? <Outlet /> : null;
}

const mapStateToProps = state => {
    return {
        isLogin: state.isLogin
    };
};

export default connect(mapStateToProps)(ValidaterLogout);
