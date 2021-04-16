import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
  public temp:any;
  public listitems:any[][] =[];
  public watch:boolean = false;
  public isMobile:boolean=false;
  constructor(private route: ActivatedRoute, public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.temp = JSON.parse(String(window.localStorage.getItem("watching")));
    console.log("watch me temp", this.temp)
    if (this.breakpointObserver.isMatched('(max-width: 599.99px)')) 
    {
    // console.log('Enough room!');
      this.isMobile = true;
    }
    console.log("this.watch ", this.watch)
    
    if( Object.keys(this.temp).length!== 0)
    {
      this.watch = true;
    }
    else
    {
      this.watch = false;
    }
    console.log("this.watch ", this.watch)
    let j = -1;
    let count = 0;
    for(let i in this.temp)
    {
      if(count%6==0)
      {
        j+=1
        this.listitems[j]=[]
        this.listitems[j].push(this.temp[i])
      }
      else
      {
        this.listitems[j].push(this.temp[i])
      }
      
      count+=1;

      // this.listitems.push(this.temp[i])
    }
    // console.log(this.listitems[0])
    if(this.listitems.length == j+1 && this.listitems.length!=0)
      {
        var n =this.listitems[j].length%6;
        if(n!= 0)
        {
          for(let k =0;k<6-n;k++)
          {
            this.listitems[j].push({})
          }
        }
        
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
