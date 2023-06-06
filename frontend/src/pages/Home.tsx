
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
// import { addToCart } from "../slices/cartSlice";
// import { useGetAllProductsQuery } from "../slices/productsApi";
import { products } from "../utils/data";

const Home = () => {
  // const { items: products, status } = useSelector((state) => state.products);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const { data, error, isLoading } = useGetAllProductsQuery();

  // const handleAddToCart = (product) => {
  //   dispatch(addToCart(product));
  //   navigate("/cart");
  // };

  return (
    <div className="home-container">
      {products.length > 0 ? (
        <>
          <h2>New Arrivals</h2>
          <div className="flex items-center justify-between">
            {products &&
              products?.map((product) => (
                <div key={product.id} className="product">
                  <h3>{product.name}</h3>
                  <img className="w-[300px]" src={product.image} alt={product.name} />
                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  {/* <button style={{ height: '100px' }} onClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </button> */}
                </div>
              ))}
          </div>
        </>
      ) : products.length < 0 ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  );
};

export default Home;