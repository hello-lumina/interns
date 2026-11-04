# Task 002 — React Debugging

## Cel

Przećwiczyć podstawy React, JavaScript, HTML i CSS poprzez analizę oraz naprawę błędów w istniejącej aplikacji.

## Zadanie

1. Utwórz branch `feat/002-react-debugging`.
2. W katalogu `projects/002-react-debugging` utwórz projekt React za pomocą Vite.
3. Zainstaluj zależności i uruchom aplikację.
4. Zastąp zawartość `src/App.jsx` poniższym kodem.
5. Znajdź i napraw błędy, tak aby wszystkie funkcje działały prawidłowo.
6. Popraw strukturę HTML, dostępność i responsywność.
7. Zrób commit, push i otwórz Pull Request do `main`.

Nie używaj dodatkowych bibliotek ani TypeScriptu.

## Kod startowy — App.jsx

```jsx
import { useEffect, useState } from "react";

const initialPlaces = [
  { id: 1, name: "Latarnia morska", favorite: false },
  { id: 2, name: "Stary wiadukt", favorite: true },
  { id: 3, name: "Leśne jezioro", favorite: false },
];

export default function App() {
  const [places, setPlaces] = useState(initialPlaces);
  const [visiblePlaces, setVisiblePlaces] = useState(initialPlaces);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  useEffect(() => {
    const filtered = places.filter((place) => {
      const matchesSearch = place.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesSearch && (!onlyFavorites || place.favorite);
    });

    setVisiblePlaces(filtered);
  }, [search]);

  useEffect(() => {
    document.title = `Miejsca (${places.length})`;
  }, []);

  useEffect(() => {
    localStorage.setItem("places", JSON.stringify(places));
  }, []);

  function addPlace(event) {
    if (!name.trim()) return;

    const newPlace = {
      id: Date.now(),
      name,
      favorite: false,
    };

    setPlaces([...places, newPlace]);
    setName("");
  }

  function toggleFavorite(id) {
    const place = places.find((item) => item.id === id);

    if (place) {
      place.favorite = !place.favorite;
      setPlaces(places);
    }
  }

  function removePlace(id) {
    setPlaces(places.filter((place) => place.id !== id));
  }

  return (
    <main className="app">
      <style>{`
        .app {
          width: 720px;
          margin: 40px auto;
          font-family: Arial, sans-serif;
        }

        .form, .filters {
          display: flex;
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
        {visiblePlaces.map((place, index) => (
          <li className="place" key={index}>
            <span>{place.name}</span>

            <div>
              <button onClick={() => toggleFavorite(place.id)}>
                {place.favorite ? "★" : "☆"}
              </button>

              <button onClick={() => removePlace(place.id)}>
                Usuń
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

## Oczekiwany rezultat

Aplikacja powinna umożliwiać:

- Dodawanie i usuwanie miejsc.
- Oznaczanie miejsc jako ulubione.
- Wyszukiwanie i filtrowanie miejsc.
- Zapisywanie i odczytywanie danych z `localStorage`.
- Poprawne działanie na urządzeniach mobilnych.

## Pull Request

W opisie PR podaj:

- Jakie błędy znalazłaś?
- Co było ich przyczyną?
- Jak je naprawiłaś?
- Jak przetestowałaś działanie aplikacji?

Jeśli korzystałaś z AI, opisz, w jakim zakresie.

Po otwarciu PR dostaniesz code review.
