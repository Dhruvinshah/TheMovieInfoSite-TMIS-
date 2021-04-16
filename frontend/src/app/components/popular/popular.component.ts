import { Component, OnInit } from '@angular/core';
import { homeRouteService } from '../../services/homeroute.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {

  public isMobile:boolean=false;
  constructor(private _homeRouteService: homeRouteService, public breakpointObserver: BreakpointObserver)
  {
    
  }

  popular_movies:any
  interval:number = 0;
  ngOnInit(): void {

    if (this.breakpointObserver.isMatched('(max-width: 599.99px)')) 
    {
    // console.log('Enough room!');
      this.isMobile = true;
    }


    this._homeRouteService.get_popular()
    .subscribe
    (
      data =>
      {
        // this.listmovies = data;
        console.log(data);
        this.popular_movies  =data;
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
