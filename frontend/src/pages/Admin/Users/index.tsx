import "./styles.css";

import ButtonPrimary from "components/ButtonPrimary";
import IdentificationInfoUsers from "./IdentificationInfoUsers";
import * as userService from "../../../services/user-service";
import { User } from "types/user";
import { useEffect, useState } from "react";
import UserCard from "./UsersCard";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState<Array<User>>();

  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    userService.getAllUsers().then((response) => {
      setUsers(response.data);
    });
  }

  function handleAddAdmin() {
    navigate("/admin/users/create");
  }

  return (
    <div className="user-crud-container">
      <div className="user-crud-container">
        <div className="user-crud-bar-container d-md-flex justify-content-between">
          <h3>Lista de usuários</h3>
          <div onClick={handleAddAdmin}>
            <ButtonPrimary text="Adicionar administrador" />
          </div>
        </div>

        <IdentificationInfoUsers />

        <div className="row">
          {users?.map((user) => (
            <div className="col-12">
              <UserCard user={user} key={user.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
