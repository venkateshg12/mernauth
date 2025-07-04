import { Navigate} from "react-router-dom";
import Spinner from "../constants/constant";
import  useAuth  from "../hooks/useAuth";

const AppContainer = () => {
  const { user, isLoading } = useAuth();
  console.log(user);
  return (
    <div>
      {
        isLoading ? (
          <Spinner />
        ) : user ? (
          null
        ) : (
          <Navigate
            to="/login"
            replace
            state={{ redirectUrl: window.location.pathname }}
          />
        )
      }
    </div>
  )
}

export default AppContainer;