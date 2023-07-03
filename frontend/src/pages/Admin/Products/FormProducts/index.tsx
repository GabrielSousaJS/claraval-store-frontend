import "./styles.css";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Category } from "types/category";
import * as categoryService from "../../../../services/category-service";
import * as productService from "../../../../services/product-service";
import { dirtyAndValidate, toValues, updateAll, updateAndValidate } from "utils/forms";
import FormInput from "components/FormInput";
import FormSelect from "components/FormSelect";
import { selectStyles } from "utils/select";
import FormTextArea from "components/FormTextArea";
import ButtonPrimary from "components/ButtonPrimary";

type UrlParams = {
  productId: string;
};

export default function FormProducts() {
  const { productId } = useParams<UrlParams>();

  const isEditing = productId !== "create";

  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    name: {
      value: "",
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Nome do produto",
      validation: function (value: string) {
        return /^.{3,80}$/.test(value);
      },
      message: "Informe um nome entre 3 a 80 caracteres",
    },
    price: {
      value: "",
      id: "price",
      name: "price",
      type: "number",
      placeholder: "Preço",
      validation: function (value: any) {
        return Number(value) > 0;
      },
      message: 'Informe um preço positivo'
    },
    quantity: {
      value: "",
      id: "quantity",
      name: "quantity",
      type: "number",
      placeholder: "Quantidade",
      validation: function (value: any) {
        let quantityProduct = Number(value).toFixed(0);
        return Number(quantityProduct) > 0;
      },
      message: "Informar quantidade positiva",
    },
    description: {
      value: "",
      id: "description",
      name: "description",
      type: "text",
      placeholder: "Descrição",
      validation: function (value: string) {
        return /^.{10,}$/.test(value);
      },
      message: "A descrição deve ter ao menos 10 caracteres",
    },
    imgUrl: {
      value: "",
      id: "imgUrl",
      name: "imgUrl",
      type: "text",
      placeholder: "Link da imagem",
      validation: function (value: any) {
        return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
          value
        );
      },
      message: "Informe um link válido",
    },
    categories: {
      value: [],
      id: "categories",
      name: "categories",
      placeholder: "Categorias",
      validation: function (value: Category[]) {
        return value.length > 0;
      },
      message: "Selecione uma categoria",
    },
  });

  const [categories, setCategories] = useState<Array<Category>>([]);

  useEffect(() => {
    categoryService.findAll().then((response) => {
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    if (isEditing) {
      productService.findById(Number(productId)).then((response) => {
        setFormData(updateAll(formData, response.data));
      });
    }
  }, [productId]);

  function handleInputChange(event: any) {
    setFormData(
      updateAndValidate(formData, event.target.name, event.target.value)
    );
  }

  function handleCancel() {
    navigate("/admin/products");
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
    <div className="base-card product-crud-form-card">
      <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>

      <form onSubmit={handleSubmit}>
        <div className="row product-crud-inputs-container">
          <div className="col-lg-6 product-crud-inputs-left">
            <div className="row">
              <div className="col-lg-12 product-form-input">
                <FormInput
                  {...formData.name}
                  className="form-control base-input claraval-form-control"
                  onTurnDirty={handleTurnDirty}
                  onChange={handleInputChange}
                />
                <div className="form-error">{formData.name.message}</div>
              </div>
              <div className="col-md-6 product-form-input">
                <FormInput
                  {...formData.price}
                  className="form-control base-input claraval-form-control"
                  onTurnDirty={handleTurnDirty}
                  onChange={handleInputChange}
                />
                <div className="form-error">{formData.price.message}</div>
              </div>
              <div className="col-md-6 product-form-input">
                <FormInput
                  {...formData.quantity}
                  className="form-control base-input claraval-form-control"
                  onTurnDirty={handleTurnDirty}
                  onChange={handleInputChange}
                />
                <div className="form-error">{formData.quantity.message}</div>
              </div>

              <div className="col-lg-12 product-form-input">
                <FormSelect
                  {...formData.categories}
                  styles={selectStyles}
                  className="claraval-form-control form-select-container"
                  options={categories}
                  isMulti
                  onChange={(obj: any) => {
                    const newFormData = updateAndValidate(
                      formData,
                      "categories",
                      obj
                    );
                    setFormData(newFormData);
                  }}
                  onTurnDirty={handleTurnDirty}
                  getOptionLabel={(obj: any) => obj.name}
                  getOptionValue={(obj: any) => String(obj.id)}
                />
                <div className="form-error">{formData.categories.message}</div>
              </div>

              <div className="col-lg-12 product-form-input">
                <FormInput
                  {...formData.imgUrl}
                  className="form-control base-input claraval-form-control"
                  onTurnDirty={handleTurnDirty}
                  onChange={handleInputChange}
                />
                <div className="form-error">{formData.imgUrl.message}</div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 product-form-input">
            <FormTextArea
              {...formData.description}
              className="form-control base-input product-crud-textarea claraval-form-control"
              onTurnDirty={handleTurnDirty}
              onChange={handleInputChange}
            />
            <div className="form-error">{formData.description.message}</div>
          </div>
        </div>

        <div className="product-crud-bottons">
          <button
            className="btn btn-outline-danger product-crud-button"
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
