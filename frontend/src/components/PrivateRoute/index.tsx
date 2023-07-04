import { Navigate } from "react-router-dom";
import { Role } from "types/role";
import { hasAnyRoles, isAuthenticated } from "utils/auth";

type Props = {
  children: JSX.Element;
  roles?: Role[];
};

export default function PrivateRoute({ children, roles = [] }: Props) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  } else {
    return !hasAnyRoles(roles) ? <Navigate to="/" /> : children;
  }
}
