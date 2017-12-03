import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class MovieProvider {

  private baseApiPath = "https://api.themoviedb.org/3/";

  constructor(public http: HttpClient) {
    console.log('Hello MovieProvider Provider');
  }

  getLatestMovies(page = 1): Observable<any> {
    return this.http.get(this.baseApiPath + "movie/popular?api_key=f89d88bba85c80576f38504ea1980a41&language=pt-BR&page=" + page);
  }

  getMovieDetails(filmeId): any {
    return this.http.get(this.baseApiPath + "movie/" + filmeId + "?api_key=f89d88bba85c80576f38504ea1980a41&language=pt-BR");
    //return this.http.get(this.baseApiPath + `movie/${filmeId}?api_key=f89d88bba85c80576f38504ea1980a41&language=pt-BR`);
  }
  
}
