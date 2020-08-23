import dialogActionTypes from "./dialog.actionTypes";

const initState = {
  dialogName: "",
};

const DialogReducer = (state = initState, action) => {
  switch (action.type) {
    case dialogActionTypes.Login:
      return { ...state, dialogName: dialogActionTypes.Login };
    case dialogActionTypes.Singup:
      return { ...state, dialogName: dialogActionTypes.Singup };
    case dialogActionTypes.ForgotPass:
      return { ...state, dialogName: dialogActionTypes.ForgotPass };
    case dialogActionTypes.Close:
      return { ...state, dialogName: "" };
    case dialogActionTypes.CreateTripArchive:
      return {...state, dialogName: dialogActionTypes.CreateTripArchive};
    default:
      return state;
  }
};

export default DialogReducer;
