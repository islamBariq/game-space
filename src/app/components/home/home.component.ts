import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/Models';
import { HttpService } from 'src/app/Services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {


  public sort:string='';
  public games : Array<Game>=[];
  private routeSub: Subscription = new Subscription;
  private gameSub: Subscription = new Subscription;
  

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }




  ngOnInit(): void {

this.routeSub =this.activatedRoute.params.subscribe((params:Params) =>{
  if(params['game-search']) {
    this.searchGames('metacrit',params['game-search'])
  } else {
    this.searchGames('metacrit')
  }
}) 


}

searchGames(sort:string,search?: string):void {
 this.gameSub =this.httpService.getGames(sort,search)
  .subscribe((gameList:APIResponse<Game>)=>{
    this.games=gameList.results;
    console.log(this.games)
  })
}

openGameDetails(gameId:any) {
  this.router.navigate(['details',gameId])
  }
ngOnDestroy(): void {  
  if(this.gameSub) {
    this.gameSub.unsubscribe()
  }
  if(this.routeSub){
    this.routeSub.unsubscribe()
  }
}

}

