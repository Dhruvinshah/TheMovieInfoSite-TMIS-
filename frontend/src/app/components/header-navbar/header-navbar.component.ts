import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';


@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.css']
})
export class HeaderNavbarComponent implements OnInit {
  public isMobile:boolean = false;
  public isMenuCollapsed = true;
  constructor(public breakpointObserver: BreakpointObserver) 
  {
    if (this.breakpointObserver.isMatched('(max-width: 599.99px)')) {
      console.log('Enough room!');
      this.isMobile = true;
    }
  }

  ngOnInit(): void {
  }

}
