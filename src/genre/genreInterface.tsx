
export interface genreContextProps {
  genres: IGenreList
}
export interface IGenre {
  id : number
  name : string
}
export interface IGenreList {
  movie : Array<IGenre>
  tv : Array<IGenre>
}
export const initialValueGenreList = {
  movie : [],
  tv : [],
}