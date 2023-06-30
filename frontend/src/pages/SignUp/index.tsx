import "./styles.css";

import { useState } from "react";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import FormInput from "components/FormInput";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  dirtyAndValidate,
  dirtyAndValidateAll,
  hasAnyInvalid,
  toValues,
  updateAndValidate,
} from "utils/forms";
import ButtonInverse from "components/ButtonInverse";
import ButtonPrimary from "components/ButtonPrimary";

export default function SingUp() {
  const [formUserData, setFormUserData] = useState<any>({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Nome completo",
      validation: function (value: string) {
        return /^.{3,80}$/.test(value);
      },
      message: "Informe um nome 3 a 80 caracteres",
    },
    birthDate: {
      value: "",
    },
    email: {
      value: "",
      id: "email",
      name: "email",
      type: "text",
      placeholder: "Email",
      validation: function (value: string) {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
      },
      message: "Digite um email válido",
    },
    password: {
      value: "",
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Senha",
      validation: function (value: string) {
        return /^\S.*[a-zA-Z\s]*$/g.test(value);
      },
      message: "A senha não pode ser vazia",
    },
    address: {
      value: {},
    },
  });

  const [formAddressData, setAddressData] = useState<any>({
    publicPlace: {
      value: "",
      id: "publicPlace",
      name: "publicPlace",
      type: "text",
      placeholder: "Logradouro",
      validation: function (value: string) {
        return /^\S.*[a-zA-Z\s]*$/g.test(value);
      },
      message: "O endereço não pode ser vazio",
    },
    cep: {
      value: "",
      id: "cep",
      name: "cep",
      type: "text",
      placeholder: "CEP",
      validation: function (value: string) {
        return /^[0-9]{5}-[0-9]{3}$/.test(value);
      },
      message: "CEP inválido",
    },
    number: {
      value: "",
      id: "number",
      name: "number",
      type: "number",
      placeholder: "Número",
      validation: function (value: number) {
        return value > 0;
      },
      message: "Número inválido",
    },
    city: {
      value: "",
      id: "city",
      name: "city",
      type: "text",
      placeholder: "Cidade",
      validation: function (value: string) {
        return /^.{3,100}$/.test(value);
      },
      message: "Campo inválido",
    },
    state: {
      value: "",
      id: "state",
      name: "state",
      type: "text",
      placeholder: "Estado",
      validation: function (value: string) {
        return /^.{3,100}$/.test(value);
      },
      message: "Campo inválido",
    },
    country: {
      value: "",
      id: "country",
      name: "country",
      type: "text",
      placeholder: "País",
      validation: function (value: string) {
        return /^.{3,100}$/.test(value);
      },
      message: "Campo inválido",
    },
  });

  const [selectedDate, setSelectedDate] = useState<any>(null);

  const dateFormat = (date: any) => {
    let formatISO8601 = new Date(date).toISOString();
    return formatISO8601;
  };

  function handleTurnDiryUser(name: string) {
    setFormUserData(dirtyAndValidate(formUserData, name));
  }

  function handleTurnDirtyAddress(name: string) {
    setAddressData(dirtyAndValidate(formAddressData, name));
  }

  function handleInputUserChange(event: any) {
    setFormUserData(
      updateAndValidate(formUserData, event.target.name, event.target.value)
    );
  }

  function handleInputAdressChange(event: any) {
    setAddressData(
      updateAndValidate(formAddressData, event.target.name, event.target.value)
    );
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    const formDataValidated = dirtyAndValidateAll(formUserData);
    if (hasAnyInvalid(formDataValidated)) {
      setFormUserData(formDataValidated);
      return;
    }

    const requestBody = toValues(formUserData);

    console.log(requestBody);
  }

  return (
    <div className="container base-card modal-box">
      <Link to="/">
        <div className=" img-container">
          <img src={Logo} alt="Logo da empresa" />
        </div>
      </Link>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <FormInput
            {...formUserData.name}
            className="form-control base-input"
            onTurnDiry={handleTurnDiryUser}
            onChange={handleInputUserChange}
          />

          <ReactDatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="form-control base-input"
            id="birthDate"
            placeholderText="Data de nascimento"
            dateFormat={"dd/MM/yyyy"}
          />

          <FormInput
            {...formUserData.email}
            className="form-control base-input"
            onTurnDiry={handleTurnDiryUser}
            onChange={handleInputUserChange}
          />

          <FormInput
            {...formUserData.password}
            className="form-control base-input"
            onTurnDiry={handleTurnDiryUser}
            onChange={handleInputUserChange}
          />

          <FormInput
            {...formAddressData.publicPlace}
            className="form-control base-input"
            onTurnDiry={handleTurnDirtyAddress}
            onChange={handleInputAdressChange}
          />

          <FormInput
            {...formAddressData.number}
            className="form-control base-input"
            onTurnDiry={handleTurnDirtyAddress}
            onChange={handleInputAdressChange}
          />

          <FormInput
            {...formAddressData.city}
            className="form-control base-input"
            onTurnDiry={handleTurnDirtyAddress}
            onChange={handleInputAdressChange}
          />

          <FormInput
            {...formAddressData.state}
            className="form-control base-input"
            onTurnDiry={handleTurnDirtyAddress}
            onChange={handleInputAdressChange}
          />

          <FormInput
            {...formAddressData.country}
            className="form-control base-input"
            onTurnDiry={handleTurnDirtyAddress}
            onChange={handleInputAdressChange}
          />

          <ButtonInverse text={"cancelar"} />
          <ButtonPrimary text={"cadastrar"} />
        </div>
      </form>
    </div>
  );
}
