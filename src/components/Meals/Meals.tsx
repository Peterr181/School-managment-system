import React from "react";
import tacos from "../../assets/tacos.jpg";
import sphagetti from "../../assets/sphagetti.jpg";
import chicken from "../../assets/stir-fry.jpg";
import salmon from "../../assets/salmon.jpg";
import curry from "../../assets/curry.jpg";
import "./Meals.scss";

interface Meal {
  day: string;
  name: string;
  image: string;
  description: string;
}

const Meals: React.FC = () => {
  const meals: Meal[] = [
    {
      day: "Monday",
      name: "Spaghetti Bolognese",
      image: sphagetti,
      description: "Classic Italian pasta dish with meat sauce.",
    },
    {
      day: "Tuesday",
      name: "Chicken Stir Fry",
      image: chicken,
      description: "Sautéed chicken and vegetables in a savory sauce.",
    },
    {
      day: "Wednesday",
      name: "Grilled Salmon",
      image: salmon,
      description: "Freshly grilled salmon fillet with lemon and herbs.",
    },
    {
      day: "Thursday",
      name: "Vegetable Curry",
      image: curry,
      description: "Aromatic vegetable curry with fragrant spices.",
    },
    {
      day: "Friday",
      name: "Beef Tacos",
      image: tacos,
      description: "Tender beef wrapped in tortillas with salsa and toppings.",
    },
  ];

  return (
    <div className="school-week-meals">
      <h2>Meals for the School Week</h2>
      <div className="meal-container">
        {meals.map((meal, index) => (
          <div key={index} className="meal-card">
            <h3>{meal.day}</h3>
            <div className="meal-details">
              <img className="meal-image" src={meal.image} alt={meal.name} />
              <div className="meal-info">
                <h4>{meal.name}</h4>
                <p>{meal.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meals;
