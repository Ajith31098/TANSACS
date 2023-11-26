import React, { useEffect } from 'react';
import { useNavigate ,Outlet} from 'react-router-dom';
import { connect } from 'react-redux';

function ValidaterLogin(props) {
    const navigate = useNavigate();

    useEffect(() => {
        // If user is not logged in, redirect to 'signin'
        if (!props.isLogin) {
            navigate('/');
        }
    }, [props.isLogin]);

    // Render nothing here, as the redirect will happen via useEffect
    return props.isLogin ? <Outlet /> : null;
}

const mapStateToProps = state => {
    return {
        isLogin: state.isLogin
    };
};

export default connect(mapStateToProps)(ValidaterLogin);
