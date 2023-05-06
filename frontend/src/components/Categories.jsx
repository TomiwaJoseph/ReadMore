import "./categories.css";
import { allCategoryList, badGuy } from "../data";

const Categories = () => {
  // let randomFour = [];
  // let haveISBN = [];
  // for (let i = 0; i < badGuy.length; i++) {
  //   let content = badGuy[i];
  //   for (let j = 0; j < content.length; j++) {
  //     if (content[j]["availability"]) {
  //       if (content[j]["availability"].isbn) {
  //         haveISBN.push(content[j]);
  //       }
  //     }
  //   }
  //   randomFour.push(haveISBN[Math.floor(Math.random() * haveISBN.length)]);
  //   haveISBN = [];
  // }

  // for (let i = 0; i < randomFour.length; i++) {
  //   console.log(randomFour[i].title);
  // }

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
