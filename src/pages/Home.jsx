import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import { Container } from "../components/Utls";
import HomeSkeleton from "../components/skeleton/HomeSkeleton";
import { getProducts } from "../api/products";
const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitial = async () => {
      setIsLoading(true);
      try {
        const data = await getProducts({ page: 1, pageSize: 12 });
        setProducts(data.data);
        console.log("Fetched products:", data);
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };

    fetchInitial();
  }, []);
  return (
    <Container>
      {isLoading ? (
        <HomeSkeleton />
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {products.length > 0 &&
            products.map((product) => (
              <ProductCard
                key={product.documentId}
                thumbnail={product.image.formats?.thumbnail.url}
                title={product.title}
                summary={product.summary}
                price={product.price}
                productId={product.documentId}
              />
            ))}
        </div>
      )}
    </Container>
  );
};

export default Home;
