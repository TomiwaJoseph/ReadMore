import "./categories.css";
import { allCategoryList } from "../data";

const Categories = () => {
  return (
    <div className="search-categories-container">
      <hr className="mb-4" />
      <div className="row">
        {allCategoryList.map((cat) => (
          <div key={cat.name} className="col-6 col-sm-4 col-md-4 col-lg-2">
            <div className="each-category">
              <div className="category-img-box">
                <img src={cat.image} alt={cat.name} />
              </div>
              <button className="btn">{cat.name}</button>
            </div>
          </div>
        ))}
      </div>
      <hr className="mb-4" />
    </div>
  );
};

export default Categories;
