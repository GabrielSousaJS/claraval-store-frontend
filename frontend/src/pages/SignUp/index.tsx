import "./styles.css";

import { useState } from "react";
import Logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "components/FormInput";
import ptBR from "date-fns/locale/pt-BR";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as userService from "../../services/user-service";

import {
  dirtyAndValidate,
  dirtyAndValidateAll,
  hasAnyInvalid,
  setBackendErrors,
  toValues,
  updateAndValidate,
} from "utils/forms";
import ButtonInverse from "components/ButtonInverse";

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

  const [formAddressData, setFormAddressData] = useState<any>({
    publicPlace: {
      value: "",
      id: "publicPlace",
      name: "publicPlace",
      type: "text",
      placeholder: "Logradouro",
      validation: function (value: string) {
        return /^\S.{2}[a-zA-Z\s\d\W]*$/g.test(value);
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
      validation: function (value: any) {
        const numberAddress = Number(value).toFixed(0);
        return Number(numberAddress) > 0;
      },
      message: "Campo inválido",
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

  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<any>(null);

  const [errorDateMessage, setErrorMessage] = useState<string>("");

  function formatDate(date: any) {
    let formatISO8601 = new Date(date).toISOString();

    return formatISO8601;
  }

  const handleDateChange = (date: any) => {
    const currentDate = new Date();
    const eighteenYearsAgo = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    if (date <= eighteenYearsAgo) {
      setSelectedDate(date);
      setErrorMessage("");
    } else {
      setErrorMessage("Idade mínima é de 18 anos.");
      setSelectedDate(null);
    }
  };

  function handleTurnDiryUser(name: string) {
    setFormUserData(dirtyAndValidate(formUserData, name));
  }

  function handleTurnDirtyAddress(name: string) {
    setFormAddressData(dirtyAndValidate(formAddressData, name));
  }

  function handleInputUserChange(event: any) {
    setFormUserData(
      updateAndValidate(formUserData, event.target.name, event.target.value)
    );
  }

  function handleInputAdressChange(event: any) {
    setFormAddressData(
      updateAndValidate(formAddressData, event.target.name, event.target.value)
    );
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    const formDataUserValidated = dirtyAndValidateAll(formUserData);
    const formDataAddressValidated = dirtyAndValidateAll(formAddressData);

    if (hasAnyInvalid(formDataUserValidated) && hasAnyInvalid(formDataAddressValidated) && selectedDate === null) {
      setErrorMessage("Campo inválido");
      setFormUserData(formDataUserValidated);
      setFormAddressData(formDataAddressValidated)
      return;
    }

    const userAddress = toValues(formAddressData);
    const requestBody = toValues(formUserData);

    requestBody.birthDate = formatDate(selectedDate);
    requestBody.address = userAddress;

    return userService
      .insertUser(requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        const newInputs = setBackendErrors(
          formDataUserValidated,
          error.response.data.errors
        );
        setFormUserData(newInputs);
      });
  }

  return (
    <div className="container-form-singup">
      <div className="container base-card">
        <div className=" img-container">
          <Link to="/">
            <img src={Logo} alt="Logo da empresa" />
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row container-form">
            <div className="col-md-8 container-form-input">
              <FormInput
                {...formUserData.name}
                className="form-control base-input claraval-form-control"
                onTurnDirty={handleTurnDiryUser}
                onChange={handleInputUserChange}
              />
              <div className="form-error">{formUserData.name.message}</div>
            </div>

            <div className="col-md-4 container-form-input">
              <ReactDatePicker
                selected={selectedDate}
                id="birthDate"
                locale={ptBR}
                className="form-control base-input claraval-form-control"
                placeholderText="Data de nascimento"
                onChange={handleDateChange}
                dateFormat={"dd/MM/yyyy"}
              />
              {!selectedDate ? (
                <div className="date-picker-error">{errorDateMessage}</div>
              ) : (
                <div></div>
              )}
            </div>

            <div className="col-sm-12 container-form-input">
              <FormInput
                {...formUserData.email}
                className="form-control base-input claraval-form-control"
                onTurnDirty={handleTurnDiryUser}
                onChange={handleInputUserChange}
              />
              <div className="form-error">{formUserData.email.message}</div>
            </div>

            <div className="col-sm-12 container-form-input">
              <FormInput
                {...formUserData.password}
                className="form-control base-input claraval-form-control"
                onTurnDirty={handleTurnDiryUser}
                onChange={handleInputUserChange}
              />
              <div className="form-error">{formUserData.password.message}</div>
            </div>

            <div className="col-md-9 container-form-input">
              <FormInput
                {...formAddressData.publicPlace}
                className="form-control base-input claraval-form-control"
                onTurnDirty={handleTurnDirtyAddress}
                onChange={handleInputAdressChange}
              />
              <div className="form-error">
                {formAddressData.publicPlace.message}
              </div>
            </div>

            <div className="col-md-3 container-form-input claraval-form-control">
              <FormInput
                {...formAddressData.number}
                className="form-control base-input claraval-form-control"
                onTurnDirty={handleTurnDirtyAddress}
                onChange={handleInputAdressChange}
              />
              <div className="form-error">{formAddressData.number.message}</div>
            </div>
            <div className="col-md-4 container-form-input">
              <FormInput
                {...formAddressData.city}
                className="form-control base-input claraval-form-control"
                onTurnDirty={handleTurnDirtyAddress}
                onChange={handleInputAdressChange}
              />
              <div className="form-error">{formAddressData.city.message}</div>
            </div>

            <div className="col-md-4 container-form-input">
              <FormInput
                {...formAddressData.state}
                className="form-control base-input claraval-form-control"
                onTurnDirty={handleTurnDirtyAddress}
                onChange={handleInputAdressChange}
              />
              <div className="form-error">{formAddressData.state.message}</div>
            </div>

            <div className="col-md-4 container-form-input">
              <FormInput
                {...formAddressData.cep}
                className="form-control base-input claraval-form-control"
                onTurnDirty={handleTurnDirtyAddress}
                onChange={handleInputAdressChange}
              />
              <div className="form-error">{formAddressData.cep.message}</div>
            </div>

            <div className="col-sm-6 container-form-input">
              <FormInput
                {...formAddressData.country}
                className="form-control base-input claraval-form-control"
                onTurnDirty={handleTurnDirtyAddress}
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
                <button className="btn btn-secondary btn-singup">
                  cadastrar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
