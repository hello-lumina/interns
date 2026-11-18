import { useEffect, useState } from "react";

const initialPlaces = [
  { id: 1, name: "Latarnia morska", favorite: false },
  { id: 2, name: "Stary wiadukt", favorite: true },
  { id: 3, name: "Leśne jezioro", favorite: false },
];

function loadPlaces(){
  const saved = localStorage.getItem("places");
  if(saved){
    return JSON.parse(saved);
  }
  return initialPlaces
}

export default function App() {
  const [places, setPlaces] = useState(loadPlaces);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);

const visiblePlaces = places.filter((place) => {
  const matchesSearch = place.name
    .toLowerCase()
    .includes(search.toLowerCase());

   return matchesSearch && (!onlyFavorites || place.favorite);
    });

  useEffect(() => {
    document.title = `Miejsca (${places.length})`;
  }, [places.length]);

  useEffect(() => {
    localStorage.setItem("places", JSON.stringify(places));
  }, [places]);

  function addPlace(event) {
    event.preventDefault();
    if (!name.trim()) return;

    const newPlace = {
      id: Date.now(),
      name: name.trim(),
      favorite: false,
    };

    setPlaces([...places, newPlace]);
    setName("");
  }

  function toggleFavorite(id) {
    const updatedPlaces = places.map((place) => {
      if (place.id === id){
        return{
          ...place,
          favorite: !place.favorite,
        };
      }
      return place;
    });
    setPlaces(updatedPlaces);
  }

  function removePlace(id) {
    setPlaces(places.filter((place) => place.id !== id));
  }

  return (
    <main className="app">
      <style>{`
        .app {
          width: 100%;
          max-width: 720px;
          margin: 40px auto;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        .form, .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 20px;
        }

        input {
          padding: 10px;
        }

        button {
          padding: 10px;
          cursor: pointer;
        }

        .place {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #ddd;
        }
      `}</style>

      <h1>Moje miejsca</h1>

      <form className="form" onSubmit={addPlace}>
        <input
          type="text"
          placeholder="Nazwa miejsca"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button type="submit">Dodaj</button>
      </form>

      <div className="filters">
        <input
          type="search"
          placeholder="Szukaj miejsc..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <label>
          <input
            type="checkbox"
            checked={onlyFavorites}
            onChange={(event) =>
              setOnlyFavorites(event.target.checked)
            }
          />
          Tylko ulubione
        </label>
      </div>

      <p>Liczba miejsc: {places.length}</p>

      <ul>
        {visiblePlaces.map((place) => (
          <li className="place" key={place.id}>
            <span>{place.name}</span>

            <div>
              <button 
              type="button"
              onClick={() => toggleFavorite(place.id)}
              aria-label={`Ulubione: ${place.name}`}
              aria-pressed={place.favorite}
              >
             {place.favorite ? "★" : "☆"}
              </button>

              <button 
              type="button"
              onClick={() => removePlace(place.id)}
              aria-label={`Usuń: ${place.name}`}
              >
                Usuń
              </button>
            </div>
          </li>
        ))}
      </ul>
      {visiblePlaces.length === 0 && <p>Brak miejsc.</p>}
    </main>
  );
}