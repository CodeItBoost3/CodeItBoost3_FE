import {useEffect, useState} from "react";

export default function useValidateLogin() {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("accessToken"));

  useEffect(() => {
    const handleStorageToken = () => {
      setIsLogin(!!localStorage.getItem("accessToken"));
    };

    handleStorageToken();
  }, []);

  return {isLogin, setIsLogin};
}