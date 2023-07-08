import "./styles.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dirtyAndValidate, updateAndValidate } from "utils/forms";

export default function FormUserAdmin() {
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

  return (
    <div className="user-form-container">
      <div className="user-form-title">
        <h3>Adicionar administrador</h3>
      </div>
    </div>
  );
}
