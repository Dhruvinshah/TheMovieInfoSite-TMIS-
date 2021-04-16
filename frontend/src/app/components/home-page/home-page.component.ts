import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public isMobile:boolean=false;
  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {

    if (this.breakpointObserver.isMatched('(max-width: 599.99px)')) 
    {
    // console.log('Enough room!');
      this.isMobile = true;
    }
  }

}
