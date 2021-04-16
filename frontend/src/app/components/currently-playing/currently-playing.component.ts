import { Component, OnInit } from '@angular/core';
import { homeRouteService } from '../../services/homeroute.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-currently-playing',
  templateUrl: './currently-playing.component.html',
  styleUrls: ['./currently-playing.component.css']
})
export class CurrentlyPlayingComponent implements OnInit {
  public isMobile:boolean = false;
  constructor(private _homeRouteService: homeRouteService, public breakpointObserver: BreakpointObserver)
  {
    if (this.breakpointObserver.isMatched('(max-width: 599.99px)')) {
      // console.log('Enough room!');
      this.isMobile = true;
    }
  }
  listmovies:any
  interval:number = 5000;
  ngOnInit(): void {
    this._homeRouteService.get_currently_playing()
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


