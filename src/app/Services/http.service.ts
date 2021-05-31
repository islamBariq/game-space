import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, observable, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment'
import { APIResponse, Game } from '../Models';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }



  getGames(
    ordering:string,
    search?:string
  ):Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering',ordering)
    if(search) {
      params =new HttpParams().set('ordering',ordering).set('search',search)
    }
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`,{params:params});

  }
 

 getGameDetails(id:String):Observable<Game> {
const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`)
const gameTrailerRequest =this.http.get(`${env.BASE_URL}/games/${id}/movies`)
const gameScreenshots = this.http.get(`${env.BASE_URL}/games/${id}/screenshots`)
return forkJoin({
  gameInfoRequest,
  gameScreenshots,
  gameTrailerRequest
}).pipe(map((res:any)=>{
  return {
    ...res['gameInfoRequest'],
    screenshot: res['gameScreenshots'],
    trailers:res['gameTrailerRequest']
  }
}))



 }



}