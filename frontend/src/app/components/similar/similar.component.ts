import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { homeRouteService } from '../../services/homeroute.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.css']
})
export class SimilarComponent implements OnInit {

  public id:any;
  public media_type:any;
  public isMobile:boolean=false;
  public movie_or_tv:any;
  public to_show:any;
  constructor(private route: ActivatedRoute,private _homeRouteService: homeRouteService, public breakpointObserver: BreakpointObserver)
  {
    
  }

  
  listmovies:any
  interval:number = 0;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.media_type = this.route.snapshot.paramMap.get('movie');
    if (this.breakpointObserver.isMatched('(max-width: 599.99px)')) 
    {
    // console.log('Enough room!');
      this.isMobile = true;
    }
    
    if(this.media_type == "movie")
    {
      this._homeRouteService.get_similar_movies(this.id)
        .subscribe
        (
          data =>
          {
            // this.listmovies = data;
            console.log(data.length);
            if(data.length == 0)
            {
              this.to_show = false;
            }
            else
            {

              this.to_show = true;
            }
            this.movie_or_tv = "Similar Movies";
            this.listmovies  =data;
          }
        );
      }
      else
    {
      this._homeRouteService.get_similar_tv(this.id)
        .subscribe
        (
          data =>
          {
            // this.listmovies = data;
            console.log(data);
            if(data.length == 0)
            {
              this.to_show = false;
            }
            else
            {
              this.to_show = true;
            }
            this.movie_or_tv = "Similar TV Shows";
            this.listmovies  =data;
          }
        );
      }
    

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
