import { Navigate } from "react-router-dom";
import { Role } from "types/role";
import { isAuthenticated } from "utils/auth";

type Props = {
    children: JSX.Element;
    roles?: Role[];
}

export default function PrivateRoute({children, roles = []}: Props) {

}