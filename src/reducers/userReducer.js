const initialState = {
    userId: null,
    isAuthenticated: false, // 로그인 여부 추가
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_ID':
        console.log('액션 payload 아이디:', action.payload);
        return {
          ...state,
          userId: action.payload,
          isAuthenticated: true, // 로그인 상태 true
        };

        case 'LOGOUT':
          return {
            ...state,
            userId: null,
            isAuthenticated: false, // 로그인 상태 false
          }
        
      default:
        return state;
    }
  };
  
  export default userReducer;
  
