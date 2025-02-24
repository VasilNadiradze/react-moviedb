import { createContext } from "react";

export const MovieContext = createContext<string | undefined>(undefined);

const MovieProvider = (props: any) => {
  const test = "test";
  return (
    <MovieContext.Provider value={test}>{props.children}</MovieContext.Provider>
  );
};

export default MovieProvider;
