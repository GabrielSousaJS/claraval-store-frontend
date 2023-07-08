import "./styles.css";

import { User } from "types/user";

type Props = {
  user: User;
};

export default function UserCard({ user }: Props) {
  return (
    <div className="base-card user-card-container">
      <div className="row user-info">
        <div className="col-md-4 text-start text-center user-text-info">{user.name}</div>
        <div className="col-md-4 text-start text-center user-text-info">{user.email}</div>
        <div className="col-md-4 text-start text-center user-text-info">{user.address.state}</div>
      </div>
    </div>
  );
}
