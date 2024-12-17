const initialState = {
    userId: null,
    nickName: null, // 닉네임 추가

  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_ID':
        console.log('액션 payload 아이디:', action.payload);
        return {
          ...state,
          userId: action.payload,
        };
        // case "SET_NICK_NAME":
        //   console.log('액션 payload 닉네임:', action.payload); // 여기서 값 확인
        //   return {
        //     ...state,
        //     nickName: action.payload, // Redux state 업데이트
        //   };
      default:
        return state;
    }
  };
  
  export default userReducer;
  
