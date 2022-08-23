export interface MoviesSeries{
    Poster:string,
    Title:string,
    Type:string,
    Year:string,
    imdbID:string,
    isFavorite:boolean,
    id?:string
}
export type MoviesSeriesType = MoviesSeries[];