import { Link } from "react-router";
import { Button } from "./ui/Button";

const Product = ({ imageUrl, title, price, discount, productDetailsLink, company }) => {
  return (
    <article className="product">
      <span className="company">{company}</span>
      <div className="product-img-container">
        <Link to={productDetailsLink} target="_blank">
          <img src={imageUrl} alt={title} className="product-img" />
        </Link>
      </div>
      <div className="product-content-container">
        <div className="product-content">
          <h2 className="title">{title}</h2>
          <div>
            <p className="price">
              {price}
              {Number(price) ? "৳" : ""}
            </p>
            {discount && price != "Out Of Stock" && <p className="discount">{`${discount}`}</p>}
          </div>
          {/* <Button>Add To Compare</Button> */}
        </div>
      </div>
    </article>
  );
};

export default Product;
