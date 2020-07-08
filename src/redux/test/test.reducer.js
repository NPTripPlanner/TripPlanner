const initTest = {
  message: "",
};

const TestReducer = (state = initTest, action = null) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export default TestReducer;
