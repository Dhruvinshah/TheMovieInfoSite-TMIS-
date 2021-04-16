import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError  } from 'rxjs/operators';
import { homeRouteService } from '../../services/homeroute.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public model:any;
  constructor(private _homeRouteService: homeRouteService)
  {
    
  }

  ngOnInit(): void {
    

  

  
  
  }
  search = (text$: Observable<string>) => {
    return text$.pipe(      
        debounceTime(200), 
        distinctUntilChanged(),
        // switchMap allows returning an observable rather than maps array
        switchMap( (searchText) =>  this._homeRouteService.get_search(searchText) )
        
    );                 
  }


  resultFormatBandListValue(value: any) {            
  return value.title;
  } 
/**
* Initially binds the string value and then after selecting
* an item by checking either for string or key/value object.
*/
  inputFormatBandListValue(value: any)   {
  if(value.title)
    return value.title
  return value;
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

  itemselected($event:any)
  {
    location.replace('/watch/' +$event.item.media_type +'/'+$event.item.id);
  }
}
