import "./styles.css";

import { Category } from "types/category";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import * as categoryService from "../../services/category-service";

export default function NavCategories() {
  const [categories, setCategories] = useState<Array<Category>>();

  useEffect(() => {
    categoryService.findAll().then((response) => {
      setCategories(response.data);
    });
  }, []);

  return (
    <div className="bg-secondary container-category">
      <div className="container">
        <ul className="main-menu">
          {categories?.map((category) => (
            <li key={category.id}>
              <NavLink to={`/categories/${category.id}`}>
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
