import {Navigate, useLocation} from "react-router-dom";
import PropTypes from "prop-types";
import {FC, ReactElement} from "react";
import {useAppSelector} from "../../hooks/use-app-redux";

const ProtectedRouteElement: FC<{element: ReactElement, onlyUnAuth?: boolean}> = ({element, onlyUnAuth = false}) => {

    const authChecked = useAppSelector((state) => state.profile.authChecked);
    const authUser = useAppSelector((state) => state.profile.authUser);
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