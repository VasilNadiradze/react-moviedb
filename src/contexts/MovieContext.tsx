import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// აღვწეროთ ტიპი Movie
interface Movie {
  id: number;
  title: string;
}

// აღვწეროთ ფავორიტი ფილმების კონტექსტის ტიპი
interface MovieContextType {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

// აღვწეროთ კონტექსტის პროვაიდერის რეკვიზიტები
interface MovieProviderProps {
  children: ReactNode;
}

// შევქმნათ კონტექსტი და განვუსაზღვროთ ტიპი
const MovieContext = createContext<MovieContextType | null>(null);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error(
      "useMovieContext უნდა გამოვიყენოთ მხოლოდ MovieProvider პროვაიდერში"
    );
  }
  return context;
};

const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) {
      try {
        setFavorites(JSON.parse(storedFavs) || []); // დავრწმუნდეთ რომ ყოველთვის მასივია
      } catch (error) {
        setFavorites([]); // ხარვეზის შემთხვევაში ფავორიტებად ჩავსვათ ცარიელი მასივი
      }
    }
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      localStorage.removeItem("favorites");
    }
  }, [favorites]);

  const addToFavorites = (movie: Movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId: number) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId: number): boolean => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value: MovieContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};

export default MovieProvider;
