import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// ✅ Define the Movie type
interface Movie {
  id: number;
  title: string;
}

// ✅ Define the context type
interface MovieContextType {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

// ✅ Define props for the provider
interface MovieProviderProps {
  children: ReactNode;
}

// ✅ Create the context with an explicit type
const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};

// ✅ Correctly type the MovieProvider
const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) {
      try {
        setFavorites(JSON.parse(storedFavs) || []); // ✅ Ensure it's always an array
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
        setFavorites([]); // ✅ Fallback to empty array if parsing fails
      }
    }
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      // ✅ Only save if there are favorites
      localStorage.setItem("favorites", JSON.stringify(favorites));
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
