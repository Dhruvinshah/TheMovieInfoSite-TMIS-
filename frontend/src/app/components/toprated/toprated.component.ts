import { Component, OnInit } from '@angular/core';
import { homeRouteService } from '../../services/homeroute.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-toprated',
  templateUrl: './toprated.component.html',
  styleUrls: ['./toprated.component.css']
})
export class TopratedComponent implements OnInit {

  public isMobile:boolean=false;
  constructor(private _homeRouteService: homeRouteService, public breakpointObserver: BreakpointObserver)
  {
    
  }
  list_top_movies:any
  interval:number = 0
  ngOnInit(): void {

    if (this.breakpointObserver.isMatched('(max-width: 599.99px)')) 
    {
    // console.log('Enough room!');
      this.isMobile = true;
    }

    this._homeRouteService.get_top_rated()
    .subscribe
    (
      data =>
      {
        // this.listmovies = data;
        console.log(data);
        this.list_top_movies  =data;
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
