import "./styles.css";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as categoryService from "../../../../services/category-service";
import {
  dirtyAndValidate,
  toValues,
  updateAll,
  updateAndValidate,
} from "utils/forms";
import FormInput from "components/FormInput";
import ButtonPrimary from "components/ButtonPrimary";

type UrlParams = {
  categoryId: string;
};

export default function FormCategory() {
  const { categoryId } = useParams<UrlParams>();

  const isEditing = categoryId !== "create";

  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    name: {
      value: "",
      name: "name",
      type: "text",
      placeholder: "Nome da categoria",
      validation: function (value: string) {
        return /^.{3,50}$/.test(value);
      },
      message: "Informe um nome entre 3 a 50 caracteres",
    },
  });

  useEffect(() => {
    if (isEditing) {
      categoryService.findById(Number(categoryId)).then((response) => {
        setFormData(updateAll(formData, response.data));
      });
    }
  });

  function handleInputChange(event: any) {
    setFormData(
      updateAndValidate(formData, event.target.name, event.target.value)
    );
  }

  function handleCancel() {
    navigate("/admin/categories");
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
    <div className="base-card category-crud-form-card">
      <h1 className="category-crud-form-title">DADOS DA CATEGORIA</h1>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <FormInput
              {...formData.name}
              className="form-control base-input claraval-form-control"
              onTurnDirty={handleTurnDirty}
              onChange={handleInputChange}
            />
            <div className="form-error">{formData.name.message}</div>
          </div>
        </div>
        <div className="category-crud-buttons">
          <button
            className="btn btn-outline-danger category-crud-button"
            onClick={handleCancel}
          >
            CANCELAR
          </button>
          <ButtonPrimary text={"SALVAR"} />
        </div>
      </form>
    </div>
  );
}
