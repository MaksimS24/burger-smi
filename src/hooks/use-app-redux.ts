import {useDispatch} from "react-redux";
import {AppDispatch} from "../services/store/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
