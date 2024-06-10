import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import { IsLoginState, UserState } from "../recoil/RecoilState";
import { useEffect } from "react";
import { axiosMe } from "./axios";

const useCheckMe = () => {
    const [isLogin, setIsLogin] = useRecoilState(IsLoginState);
    const [userInfo, setUserInfo] = useRecoilState(UserState);
    const location = useLocation();

    const unLogin = () => {
        setIsLogin(false);
        setUserInfo({ email: null, id: null, name: null, profileImage: null });
    };

    const loadUser = async () => {
        try {
            const response = await axiosMe();
            if (response.data.data !== false) {
                setIsLogin(true);
                const { email, id, name } = response.data.data;
                setUserInfo({ email, id, name });
            } else {
                unLogin();
            }
        } catch (e) {
            console.error(e);
            unLogin();
        }
    };

    useEffect(() => {
        loadUser();
    }, []);
};

export default useCheckMe;