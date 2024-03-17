import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRouteElement = ({element, onlyUnAuth = false}) => {

    const authChecked = useSelector((state) => state.profile.authChecked);
    const authUser = useSelector((state) => state.profile.authUser);
    const location = useLocation();

    if (!authChecked) {
        return null;
    }

    if (onlyUnAuth && authUser) {
        return <Navigate to='/'/>;
    }

    if (!onlyUnAuth && !authUser) {
        return <Navigate to='/login' state={{from: location}}/>;
    }

    return element;
};
    ProtectedRouteElement.propTypes = {
        element: PropTypes.element.isRequired,
    }

export default ProtectedRouteElement;