import { Component, OnInit } from '@angular/core';
import { homeRouteService } from '../../services/homeroute.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-top-rated-tv',
  templateUrl: './top-rated-tv.component.html',
  styleUrls: ['./top-rated-tv.component.css']
})
export class TopRatedTvComponent implements OnInit {

  public isMobile:boolean=false;
  listmovies:any
  interval:number = 0;
  constructor(private _homeRouteService: homeRouteService, public breakpointObserver: BreakpointObserver)
  {
    
  }

  ngOnInit(): void {

    if (this.breakpointObserver.isMatched('(max-width: 599.99px)')) 
    {
    // console.log('Enough room!');
      this.isMobile = true;
    }

    this._homeRouteService.get_top_rated_tv()
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
