import { Link } from "react-router";

const Product = ({ imageUrl, title, price, discount, productDetailsLink }) => {
  return (
    <article className="product">
      <Link to={productDetailsLink} target="_blank">
        <img src={imageUrl} alt={title} className="product-img" />
      </Link>
      <div className="product-content">
        <h2 className="title">{title}</h2>
        <p className="price">{price}</p>
        {discount && <p className="discount">{discount}</p>}
      </div>
    </article>
  );
};

export default Product;
