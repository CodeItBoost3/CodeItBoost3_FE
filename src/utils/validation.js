/**
 * 유효성 검사 함수
 */
export const validateInput = (name, value) => {
    let errorMessage = "";
    
    switch (name) {
        case "id":
            if (value.length < 6 || value.length > 15) {
                errorMessage = "6자 이상 15자 이하로 입력해 주세요.";
            } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
                errorMessage = "아이디는 영문과 숫자만 사용할 수 있습니다.";
            }
            break;

        case "password":
            if (value.length < 8 || value.length > 16) {
                errorMessage = "8자 이상 16자 이하로 입력해 주세요.";
            }
            break;

        case "nickname":
            if (value.length < 2 || value.length > 15) {
                errorMessage = "2자 이상 15자 이하로 입력해 주세요.";
            } else if (!/^[a-zA-Z0-9가-힣]+$/.test(value)) {
                errorMessage = "닉네임에 특수문자는 사용할 수 없습니다.";
            }
            break;

        default:
            break;
    }
    return errorMessage;
};
