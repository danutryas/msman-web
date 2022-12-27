
export interface genreContextProps {
  genres: GenreList
}
export interface GenreList {
  movie : Array<Genre>
  tv : Array<Genre>
}
export const initialValueGenreList = {
  movie : [],
  tv : [],
}
export interface Genre {
  id : number
  name : string
}