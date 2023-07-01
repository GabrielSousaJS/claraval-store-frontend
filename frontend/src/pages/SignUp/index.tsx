import "./styles.css";

import { useState } from "react";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import FormInput from "components/FormInput";
import ptBR from "date-fns/locale/pt-BR";
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
      message: "Informe um nome entre 3 a 80 caracteres",
    },
    birthDate: {
      value: "",
      id: "birthDate",
      name: "birthDate",
      type: "text",
      placeholderText: "Data de nascimento",
      validation: function (value: any) {
        return;
      },
      message: "Campo inválido",
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
        return /^.{8,}$/.test(value);
      },
      message: "Campo inválido. No mínimo 8 caracteres",
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
      message: "Campo inválido",
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
    <div className="container-form-singup">
      <div className="container base-card">
        <Link to="/">
          <div className=" img-container">
            <img src={Logo} alt="Logo da empresa" />
          </div>
        </Link>

        <form onSubmit={handleSubmit}>
          <div className="row container-form">
            <div className="col-md-8 container-form-input">
              <FormInput
                {...formUserData.name}
                className="form-control base-input claraval-form-control"
                onTurnDiry={handleTurnDiryUser}
                onChange={handleInputUserChange}
              />
              <div className="form-error">{formUserData.name.message}</div>
            </div>

            <div className="col-md-4 container-form-input">
              <ReactDatePicker
                {...formUserData.birthDate}
                selected={selectedDate}
                id="birthDate"
                locale={ptBR}
                className="form-control base-input claraval-form-control"
                onChange={(date: any) => {
                  let formatISO8601 = new Date(date).toISOString;
                  const newFormData = updateAndValidate(
                    formUserData,
                    "birthDate",
                    formatISO8601
                  );
                  setSelectedDate(date);
                  setFormUserData(newFormData);
                }}
                dateFormat={"dd/MM/yyyy"}
                onBlur={handleTurnDiryUser}
              />
              <div className="form-error">{formUserData.birthDate.message}</div>
            </div>

            <div className="col-sm-12 container-form-input">
              <FormInput
                {...formUserData.email}
                className="form-control base-input claraval-form-control"
                onTurnDiry={handleTurnDiryUser}
                onChange={handleInputUserChange}
              />
              <div className="form-error">{formUserData.email.message}</div>
            </div>

            <div className="col-sm-12 container-form-input">
              <FormInput
                {...formUserData.password}
                className="form-control base-input claraval-form-control"
                onTurnDiry={handleTurnDiryUser}
                onChange={handleInputUserChange}
              />
              <div className="form-error">{formUserData.password.message}</div>
            </div>

            <div className="col-md-9 container-form-input">
              <FormInput
                {...formAddressData.publicPlace}
                className="form-control base-input claraval-form-control"
                onTurnDiry={handleTurnDirtyAddress}
                onChange={handleInputAdressChange}
              />
              <div className="form-error">
                {formAddressData.publicPlace.message}
              </div>
            </div>

            <div className="col-md-3 container-form-input claraval-form-control">
              <FormInput
                {...formAddressData.number}
                className="form-control base-input"
                onTurnDiry={handleTurnDirtyAddress}
                onChange={handleInputAdressChange}
              />
              <div className="form-error">{formAddressData.number.message}</div>
            </div>
            <div className="col-md-6 container-form-input">
              <FormInput
                {...formAddressData.city}
                className="form-control base-input claraval-form-control"
                onTurnDiry={handleTurnDirtyAddress}
                onChange={handleInputAdressChange}
              />
              <div className="form-error">{formAddressData.city.message}</div>
            </div>

            <div className="col-md-6 container-form-input">
              <FormInput
                {...formAddressData.state}
                className="form-control base-input claraval-form-control"
                onTurnDiry={handleTurnDirtyAddress}
                onChange={handleInputAdressChange}
              />
              <div className="form-error">{formAddressData.state.message}</div>
            </div>

            <div className="col-sm-6 container-form-input">
              <FormInput
                {...formAddressData.country}
                className="form-control base-input claraval-form-control"
                onTurnDiry={handleTurnDirtyAddress}
                onChange={handleInputAdressChange}
              />
              <div className="form-error">
                {formAddressData.country.message}
              </div>
            </div>

            <div className="button-form">
              <div className="button-form-cancel">
                <Link to="/">
                  <ButtonInverse text={"cancelar"} />
                </Link>
              </div>
              <div className="button-form-confirm">
                <ButtonPrimary text={"cadastrar"} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
