import { Link } from "react-router";
import { Button } from "./ui/Button";

const Product = ({ imageUrl, title, price, discount, productDetailsLink, company }) => {
  return (
    <article className="product">
      <span className="company">{company}</span>
      <Link to={productDetailsLink} target="_blank">
        <img src={imageUrl} alt={title} className="product-img" />
      </Link>
      <div className="product-content">
        <h2 className="title">{title}</h2>
        <p className="price">
          {price}
          {Number(price) ? "৳" : ""}&nbsp;&nbsp;
          {discount && <span className="discount">{`${discount}`}</span>}
        </p>
        {/* <Button>Add To Compare</Button> */}
      </div>
    </article>
  );
};

export default Product;
