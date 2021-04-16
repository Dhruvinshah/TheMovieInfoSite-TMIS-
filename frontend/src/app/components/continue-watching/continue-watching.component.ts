import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { homeRouteService } from '../../services/homeroute.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-continue-watching',
  templateUrl: './continue-watching.component.html',
  styleUrls: ['./continue-watching.component.css']
})
export class ContinueWatchingComponent implements OnInit {

  public id:any;
  public con:any;
  public isMobile:boolean = false;
  public to_show:any;
  constructor(private route: ActivatedRoute,private _homeRouteService: homeRouteService, public breakpointObserver: BreakpointObserver)
  {
    if (this.breakpointObserver.isMatched('(max-width: 599.99px)')) {
      // console.log('Enough room!');
      this.isMobile = true;
    }
  }

  
  listmovies:any
  interval:number = 0;
  ngOnInit(): void {
    // this.id = this.route.snapshot.paramMap.get('id');
    this.con = JSON.parse(String(window.localStorage.getItem("continue_playing")));
    let j = -1;
    var matrix: Object[][] = new Array()
    let count = 0
    for(let i in this.con)
    {
      if(count%6==0)
      {
        j+=1
        matrix[j]=[]
        matrix[j].push(this.con[i])
      }
      else
      {
        matrix[j].push(this.con[i])
      }
      
      count+=1;

    }
    if(matrix.length == j+1 && matrix.length!=0)
      {
        var n =matrix[j].length%6;
        if(n!= 0)
        {
          for(let k =0;k<6-n;k++)
          {
            matrix[j].push({})
          }
        }
        
      }
        
      if(matrix.length != 0)
      {
        this.to_show = true;
        this.listmovies = matrix;
      }
      else
      {

        this.to_show = false;
        this.listmovies = matrix;
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
