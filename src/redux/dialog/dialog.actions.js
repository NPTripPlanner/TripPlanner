import DialogActionTypes from "./dialog.actionTypes";
import dialogActionTypes from "./dialog.actionTypes";

export const Login = () => ({
  type: DialogActionTypes.Login,
});

export const Signup = () => ({
  type: DialogActionTypes.Singup,
});

export const ForgotPassword = () => ({
  type: DialogActionTypes.ForgotPass,
});

export const Close = () => ({
  type: DialogActionTypes.Close,
});

export const CreateTripArchive = ()=>({
  type: dialogActionTypes.CreateTripArchive,
})
