import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/user/user.selector";

const UserAuthComp = (
    redirectURL='/',
    WrappedComp,
) => {
    const history = useHistory();
    const user = useSelector(selectUserInfo);

  if (!user) history.push(redirectURL);

  return WrappedComp;

};

export default UserAuthComp;