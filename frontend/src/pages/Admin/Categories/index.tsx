import "./styles.css";

import { Link } from "react-router-dom";
import ButtonPrimary from "components/ButtonPrimary";
import * as categoryService from "../../../services/category-service";
import { useEffect, useState } from "react";
import { Category } from "types/category";
import CategoryCrudCard from "./CategoryCrudCard";

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Array<Category>>();

  useEffect(() => {
    getCategories();
  }, [])

  async function getCategories() {
    await categoryService.findAll().then((response) => {
      setCategories(response.data);
    })
  }

  return (
    <div className="category-crud-container">
      <div className="category-crud-bar-container">
        <div>
          <h2 className="category-card-title">Lista de categorias</h2>
        </div>
        <Link to={"/admin/categories/create"}>
          <ButtonPrimary text={"Adicionar"} />
        </Link>
      </div>

      <div className="row">
        {categories?.map((category) => (
          <div className="col-xl-6" key={category.id}>
            <CategoryCrudCard
              category={category}
              onDelete={() => getCategories()}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
