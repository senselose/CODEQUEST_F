const initialState = {
    userId: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_ID':
        console.log('액션 payload:', action.payload);
        return {
          ...state,
          userId: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  
