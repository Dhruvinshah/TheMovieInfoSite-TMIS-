import { Component, OnInit } from '@angular/core';
import { homeRouteService } from '../../services/homeroute.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-trending-tv',
  templateUrl: './trending-tv.component.html',
  styleUrls: ['./trending-tv.component.css']
})
export class TrendingTvComponent implements OnInit {
  listmovies:any
  interval:number = 0;
  public isMobile:boolean=false;
  constructor(private _homeRouteService: homeRouteService, public breakpointObserver: BreakpointObserver)
  {
    
  }

  ngOnInit(): void {

    if (this.breakpointObserver.isMatched('(max-width: 599.99px)')) 
    {
    // console.log('Enough room!');
      this.isMobile = true;
    }

    this._homeRouteService.gettrendingtv()
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
