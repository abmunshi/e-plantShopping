import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import { Container } from "../components/Utls";
import HomeSkeleton from "../components/skeleton/HomeSkeleton";
const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await fetch(`${API_URL}/api/plants?populate=*`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch plants");
        }
        const data = await res.json();
        setPlants(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    fetchPlants();
  }, []);
  return (
    <Container>
      {isLoading ? (
        <HomeSkeleton />
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {plants.length > 0 &&
            plants.map((plant) => (
              <ProductCard
                key={plant.id}
                name={plant.title}
                subtitle={plant.subtitle}
                image={
                  plant.thumbnail.formats?.small.url || plant.thumbnail.url
                }
                description={plant.description}
                cost={plant.price}
              />
            ))}
        </div>
      )}
    </Container>
  );
};

export default Home;
