import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import { Container } from "../components/Utls";
import HomeSkeleton from "../components/skeleton/HomeSkeleton";
const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [items, setItems] = useState([]);
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

        const groups = {};
        data.data.forEach((plant) => {
          const catTitle = plant.category?.title || "Uncategorized";
          if (!groups[catTitle]) {
            groups[catTitle] = [];
          }
          groups[catTitle].push(plant);
        });
        const groupedPlants = Object.entries(groups).map(
          ([category, plants]) => ({
            category,
            plants,
          })
        );

        console.log("groups", groupedPlants);

        setItems(groupedPlants);
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
        items.length > 0 &&
        items.map((item) => (
          <div className="mb-10" key={item.category}>
            <h2 className="text-2xl font-semibold mb-4">{item.category}</h2>
            <div className="grid grid-cols-4 gap-4">
              {item.plants.length > 0 &&
                item.plants.map((plant) => (
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
          </div>
        ))
      )}
    </Container>
  );
};

export default Home;
