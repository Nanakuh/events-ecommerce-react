import { useState, useEffect } from "react";
import CharacterCard from "./character-card/character-card";
import data from '../data/data.json';
import Header from "./Header";
import Form from "./Form"

function App() {
  const [characters, setCharacters] = useState([]);

  const fetchCharacters = async () => {
    try {
      const response = await fetch(
        "https://api.disneyapi.dev/character?pageSize=50"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setCharacters(data.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div>
     <Header />
      <div className="every-card">
        {characters.map((character) => (
          <CharacterCard
            imagen={character.imageUrl}
            titulo={character.name}
            key={character._id}
          />
        ))}
      </div>
     <Form /> 
    </div>
  );
}

export default App;