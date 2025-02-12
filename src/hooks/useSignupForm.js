import { useState } from "react";
import { validateInput } from "@/utils/validation"; // ✅ 유효성 검사 함수 임포트

/**
 * 회원가입 폼 상태 관리 커스텀 훅
 */
export default function useSignupForm() {
    const [formData, setFormData] = useState({
        id: "",
        password: "",
        nickname: "",
    });

    const [errors, setErrors] = useState({
        id: "",
        password: "",
        nickname: "",
    });

    /**
     * 입력값 변경 핸들러
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        const error = validateInput(name, value);
        setErrors({ ...errors, [name]: error });
    };

    return { formData, setFormData, errors, handleChange };
}
