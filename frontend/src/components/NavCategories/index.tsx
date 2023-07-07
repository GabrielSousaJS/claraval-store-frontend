import "./styles.css";

import { Category } from "types/category";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import * as categoryService from "../../services/category-service";

export default function NavCategories() {
  const [categories, setCategories] = useState<Array<Category>>();

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    await categoryService.findAll().then((response) => {
      setCategories(response.data);
    })
  }

  return (
    <div className="bg-secondary container-category">
      <div className="container">
        <ul className="main-menu-category">
          {categories?.map((category) => (
            <li key={category.id} className="item-category">
              <NavLink to={`/category/${category.id}`}>{category.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
