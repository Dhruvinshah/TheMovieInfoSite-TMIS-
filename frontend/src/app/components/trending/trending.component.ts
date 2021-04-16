import { Component, OnInit } from '@angular/core';
import { homeRouteService } from '../../services/homeroute.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
// import { Trending } from '../../classes/trending';


@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

  // constructor() { }
  public isMobile:boolean=false;
  constructor(private _homeRouteService: homeRouteService, public breakpointObserver: BreakpointObserver)
  {
    
  }
  // trendings = [];
  // listmovies:Trending[][] = [];
  listmovies:any
  interval:number = 0;
  ngOnInit(): void {
    if (this.breakpointObserver.isMatched('(max-width: 599.99px)')) 
    {
    // console.log('Enough room!');
      this.isMobile = true;
    }



    this._homeRouteService.gettrending()
    .subscribe
    (
      data =>
      {
        // this.listmovies = data;
        console.log(data);
        this.listmovies  =data;
      }
    );
  }

  getUrl(image:any)
  {
    var url:any;
    if(image.media_type == "movie")
    {
      url = "/watch/movie/" + image.id;
    }
    else
    {
      url = "/watch/tv/" + image.id;
    }
    return url
  }
}


