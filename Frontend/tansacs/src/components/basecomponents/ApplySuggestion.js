import Modal from '../basecomponents/model';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import { USER_DETAIL } from '../endpoints/user/userEndpoints';
import { set_permission } from '../../redux';
import { useNavigate } from 'react-router-dom';

function ApplyButton(props) {
    const navigate = useNavigate()

    const formData = new FormData();
    formData.append('position', props.position);
    const fetchData = async () => {
        try {
            const response = await axios.post(USER_DETAIL(), formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${props.token}`
                }
            });
            return response.data;
        } catch (error) {
            // console.error('Error fetching data:', error);
            throw new Error(error);
        }
    };

    const [data, setData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetchData()
            .then((data) => {
                setData(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }, []);


    const redirect = () => {
        props.set_permission()
        navigate(props.link)
    }



    if (isLoading) {
        return (
            <button
                className="px-5 py-1 block group relative ms-5 w-max overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white"
            >
                Apply
                <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

            </button>
        )
    } else {
        if (props.job >= 2) {
            return (<Modal job_count={true} />)
        }
        else if (data && data.has_applied) {
            return (<Modal apply={false} applied={true} />);
        }
        if ((props.age > props.min_age) && (props.age <= props.emin_age)) {

            return (<Modal min_age={props.min_age} emin_age={props.emin_age} apply={true} link={props.link} applied={false} />);
        } else if ((props.age > props.min_age) && (props.age > props.emin_age)) {

            return (<Modal main={props.main ? true : false} min_age={props.min_age} emin_age={props.emin_age} apply={false} applied={false} />);

        } else {


            return (

                <Modal link={props.link} normal_check={true} />

                // <button
                //     onClick={redirect}
                //     data-modal-hide="default-modal"
                //     type="button"
                //     className="px-5 py-1 block group relative ms-5 w-max overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white"
                // >
                //     Apply
                //     <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>

                // </button>
                // <Link to={props.link} className="px-3 py-1 block group relative  w-max overflow-hidden rounded-lg bg-red-600 text-sm font-semibold text-white">
                //     Apply  
                //     <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                // </Link>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        age: state.login.user_age,
        token: state.login.token,
        job: state.login.job
    };
};

const mapDispatchToProps = dispatch => {

    return {

        set_permission: () => dispatch(set_permission())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyButton);
