import "./styles.css";

import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import FormInput from "components/FormInput";
import { dirtyAndValidate, toValues, updateAndValidate } from "utils/forms";
import ButtonPrimary from "components/ButtonPrimary";

export default function Login() {
  const [formData, setFormData] = useState<any>({
    email: {
      value: "",
      id: "email",
      name: "email",
      type: "text",
      validation: function (value: string) {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
      },
      message: "Email inválido",
    },
    password: {
      value: "",
      id: "password",
      name: "password",
      type: "password",
      validation: function (value: string) {
        return value.length > 0;
      },
      message: "Campo inválido",
    },
  });

  function handleInputChange(event: any) {
    setFormData(
      updateAndValidate(formData, event.target.name, event.target.value)
    );
  }

  function handleTurnDirty(name: string) {
    setFormData(dirtyAndValidate(formData, name));
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    const requestBody = toValues(formData);

    console.log(requestBody);
  }

  return (
    <>
      <header className="bg-secondary">
        <Link to="/">
          <img src={Logo} alt="Logo da empresa" className="logo-img" />
        </Link>
      </header>

      <section>
        <div className="modal-box login-container p-4">
          <h3 className="pb-3">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-login">
              <label>e-mail</label>
              <FormInput
                {...formData.email}
                className="form-control base-input claraval-form-control"
                onTurnDirty={handleTurnDirty}
                onChange={handleInputChange}
              />
              <div className="form-error">{formData.email.message}</div>
            </div>

            <div className="input-login">
              <label>senha</label>
              <FormInput
                {...formData.password}
                className="form-control base-input claraval-form-control"
                onTurnDirty={handleTurnDirty}
                onChange={handleInputChange}
              />
              <div className="form-error">{formData.password.message}</div>
            </div>

            <button className="btn btn-secondary button-login">
              Continuar
            </button>
          </form>

          <div className="login-text">
            Ainda não tem cadastro?{" "}
            <Link to={"/singup"} className="login-link-singup">
              Cadastre-se
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
