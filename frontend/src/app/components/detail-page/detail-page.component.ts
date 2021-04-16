import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { homeRouteService } from '../../services/homeroute.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {debounceTime} from 'rxjs/operators';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';

import { } from '@fortawesome/angular-fontawesome';
import {} from '@fortawesome/fontawesome-svg-core';
import {faTwitter, faFacebookSquare, faImdb, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  public id:any;
  public media_type: any;
  public movie_video:any;
  public title:any;
  public entire_movie_video:any;
  public cast:any;
  public cast_details:any;
  public cast_external:any;
  public reviews:any;
  public dct:any;
  public temp:any;
  public watch_temp:any;
  public cond_vall:Boolean= true;
  public succ_condition:Boolean = false;
  public danger_condition:Boolean = false;
  public succ:string= 'success';
  public dang:string = 'danger';
  public add_or_rem:any;
  public isMobile:boolean=false;
  public to_review:any;
  public to_cast:any;
  private _success = new Subject<string>();

  faTwitter = faTwitter;
  faFacebook = faFacebookSquare;
  faimdb = faImdb;
  fainsta = faInstagram;
  closeResult = '';
  successMessage = '';
  
  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;


  constructor(private route: ActivatedRoute, private _homeRouteService: homeRouteService, private modalService: NgbModal, public breakpointObserver: BreakpointObserver) { }
  
  ngOnInit(): void {
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });


    this.id = this.route.snapshot.paramMap.get('id');
    this.media_type = this.route.snapshot.paramMap.get('movie');
    if (this.breakpointObserver.isMatched('(max-width: 599.99px)')) 
    {
    // console.log('Enough room!');
      this.isMobile = true;
    }
    
    this.add_or_rem = JSON.parse(String(window.localStorage.getItem("watching")));
    console.log(this.add_or_rem)
    if(this.add_or_rem)
    { 
      if( String("movie_"+this.id) in this.add_or_rem)
      {
        console.log("hello from add or remove")
        this.cond_vall = false;
      }
      else if (String("tv_"+this.id)  in this.add_or_rem)
      {
        this.cond_vall = false;
      }
      else
      {
        this.cond_vall = true;
      }
    }
    
    
   

    if(this.media_type == "movie")
    {
      this.dct = {};
      this.dct["continue_watching"] = [];
      this.temp = JSON.parse(String(window.localStorage.getItem("continue_playing")));
      console.log("temp", this.temp)
      if(this.temp == null)
      {
        this.dct["continue_watching"] ={};
      }
      else
      {
        this.dct["continue_watching"] = this.temp;
      }

          this._homeRouteService.get_movie_video(this.id)
        .subscribe
        (
          data =>
          {
            // this.listmovies = data;
            console.log(data);
            this.entire_movie_video = data[0].key;
            this.movie_video  =data[0].key.substring(data[0].key.indexOf("=") + 1);
            
          }
        );

        this._homeRouteService.get_movie_details(this.id)
        .subscribe
        (
          data =>
          {
            // this.listmovies = data;
            console.log(data);
            this.title = data;
            console.log("movie-details" ,this.title.title);
            
            
            this.dct["continue_watching"][String("movie_"+this.id)] = {}
            this.dct["continue_watching"][String("movie_"+this.id)]["title"]=this.title.title;
            this.dct["continue_watching"][String("movie_"+this.id)]["poster_path"]=this.title.poster_path;
            this.dct["continue_watching"][String("movie_"+this.id)]["id"]=this.id;
            this.dct["continue_watching"][String("movie_"+this.id)]["media_type"]=this.media_type;
            // {"title" : this.title.title, "poster_path":this.title.poster_path};
            
            window.localStorage.setItem("continue_playing", JSON.stringify(this.dct["continue_watching"]));
            // "continue_watching"
            
            console.log("data:- ",this.temp);
            
            
          }
        );

        this._homeRouteService.get_movie_cast(this.id)
        .subscribe
        (
          data =>
          {
            // this.listmovies = data;
            console.log(data);
            if(data.length!=0)
            {
              this.cast = data;
              this.to_cast = true;
            }
            else
            {
              this.to_cast = false;
            }

            
            
          }
        );

        
        this._homeRouteService.get_movie_reviews(this.id)
        .subscribe
        (
          data =>
          {
            // this.listmovies = data;
            console.log(data);
            if(data.length == 0)
            {
              this.to_review =false;
            }
            else
            {
              this.to_review=true;
            }
            console.log(data, this.to_review)
            this.reviews = data;
            
          }
        );
        

  }
  else
  {

    this.dct = {};
    this.dct["continue_watching"] = [];
    this.temp = JSON.parse(String(window.localStorage.getItem("continue_playing")));
    console.log("temp", this.temp)
    if(this.temp == null)
    {
      this.dct["continue_watching"] ={};
    }
    else
    {
      this.dct["continue_watching"] = this.temp;
    }
    this._homeRouteService.get_tv_video(this.id)
    .subscribe
    (
      data =>
      {
        // this.listmovies = data;
        console.log(data);
        this.entire_movie_video = data[0].key;
        this.movie_video  =data[0].key.substring(data[0].key.indexOf("=") + 1);
        
      }
    );

    this._homeRouteService.get_tv_details(this.id)
    .subscribe
    (
      data =>
      {
        // this.listmovies = data;
        console.log(data);
        this.title = data;
        console.log("movie-details" ,this.title.title);
        
        
        this.dct["continue_watching"][String("tv_"+this.id)] = {}
        this.dct["continue_watching"][String("tv_"+this.id)]["title"]=this.title.title;
        this.dct["continue_watching"][String("tv_"+this.id)]["poster_path"]=this.title.poster_path;
        this.dct["continue_watching"][String("tv_"+this.id)]["id"]=this.id;
        this.dct["continue_watching"][String("tv_"+this.id)]["media_type"]=this.media_type;
        // {"title" : this.title.title, "poster_path":this.title.poster_path};
        
        window.localStorage.setItem("continue_playing", JSON.stringify(this.dct["continue_watching"]));
        // "continue_watching"
        
        console.log("data:- ",this.temp);
        
        
      }
    );

    this._homeRouteService.get_tv_cast(this.id)
    .subscribe
    (
      data =>
      {
        // this.listmovies = data;
        console.log(data);
        if(data.length!=0)
            {
              this.cast = data;
              this.to_cast = true;
            }
            else
            {
              this.to_cast = false;
            }
        
        
      }
    );

    
    this._homeRouteService.get_tv_reviews(this.id)
    .subscribe
    (
      data =>
      {
        // this.listmovies = data;
        console.log(data);
        if(data.length == 0)
            {
              this.to_review =false;
            }
            else
            {
              this.to_review=true;
            }
        this.reviews = data;
        
      }
    );
    

  }
  
  }
    

  open(content:any, c_id:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',  windowClass: 'modal-deep', size : 'lg', scrollable: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this._homeRouteService.get_cast_details(c_id)
    .subscribe
    (
      data =>
      {
        // this.listmovies = data;
        console.log(data);
        this.cast_details = data;
        
      }
    );

    this._homeRouteService.get_cast_external_id(c_id)
    .subscribe
    (
      data =>
      {
        // this.listmovies = data;
        console.log(data);
        this.cast_external = data;
        
      }
    );

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  watch(id:any)
  {
    this.watch_temp = JSON.parse(String(window.localStorage.getItem("watching")));
    
    if(this.watch_temp == null)
    {
      this.dct["watchlist"] ={};
    }
    else
    {
      this.dct["watchlist"] = this.watch_temp;
    }
    if(this.cond_vall == true)
    { 
        // this.succ_condition = true;
        // this.danger_condition = false;
        this.succ="success";
        this._success.next("Added to Watchlist");
        if(this.media_type == "movie")
        {
          this.dct["watchlist"][String("movie_"+this.id)] = {}
          this.dct["watchlist"][String("movie_"+this.id)]["title"]=this.title.title;
          this.dct["watchlist"][String("movie_"+this.id)]["poster_path"]=this.title.poster_path;
          this.dct["watchlist"][String("movie_"+this.id)]["id"]=this.id;
          this.dct["watchlist"][String("movie_"+this.id)]["media_type"]=this.media_type;
          window.localStorage.setItem("watching", JSON.stringify(this.dct["watchlist"]));
        }
        else
        {
          this.dct["watchlist"][String("tv_"+this.id)] = {}
          this.dct["watchlist"][String("tv_"+this.id)]["title"]=this.title.title;
          this.dct["watchlist"][String("tv_"+this.id)]["poster_path"]=this.title.poster_path;
          this.dct["watchlist"][String("tv_"+this.id)]["id"]=this.id;
          this.dct["watchlist"][String("tv_"+this.id)]["media_type"]=this.media_type;
          window.localStorage.setItem("watching", JSON.stringify(this.dct["watchlist"]));
        }
        
    }
    else
    {
        // this.succ_condition = false;
        // this.danger_condition = true;
        this.succ="danger";
        this._success.next(`Removed from Watchlist`);

        
        if(this.media_type == "movie")
        {
          delete this.dct["watchlist"][String("movie_"+this.id)];
          
          window.localStorage.setItem("watching", JSON.stringify(this.dct["watchlist"]));
        }
        else
        {
          delete this.dct["watchlist"][String("tv_"+this.id)];
          window.localStorage.setItem("watching", JSON.stringify(this.dct["watchlist"]));
        }
      
    }
    this.cond_vall= !this.cond_vall;
    
  }

}
