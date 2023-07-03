import "./styles.css";

import { Category } from "types/category";
import * as categoryService from "../../../../services/category-service";
import { Link } from "react-router-dom";

type Props = {
  category: Category;
  onDelete: Function;
};

export default function CategoryCrudCard({ category, onDelete }: Props) {
  const handleDelete = (categoryId: number) => {
    if (!window.confirm("Tem certeza que deseja deletar?")) {
      return;
    }

    categoryService.deleteById(categoryId).then(() => {
      onDelete();
    });
  };

  return (
    <div className="base-card category-crud-card">
      <div className="category-crud-name">
        <h5>{category.name}</h5>
      </div>

      <div className="category-crud-card-buttons-container">
        <button
          onClick={() => handleDelete(category.id)}
          className="btn btn-outline-danger category-crud-card-button category-crud-card-button-remove"
        >
          EXCLUIR
        </button>

        <Link to={`/admin/categories/${category.id}`}>
          <button className="btn btn-outline-secondary category-crud-card-button">
            EDITAR
          </button>
        </Link>
      </div>
    </div>
  );
}
