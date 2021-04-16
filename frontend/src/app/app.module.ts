import { NgModule, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import { YouTubePlayerModule } from '@angular/youtube-player';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HttpClientModule } from '@angular/common/http';
import { homeRouteService } from './services/homeroute.service';
import { TrendingComponent } from './components/trending/trending.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopratedComponent } from './components/toprated/toprated.component';
import { PopularComponent } from './components/popular/popular.component';
import { HeaderNavbarComponent } from './components/header-navbar/header-navbar.component';
import { SearchComponent } from './components/search/search.component';
import { CurrentlyPlayingComponent } from './components/currently-playing/currently-playing.component';
import { HomePageComponent } from './components/home-page/home-page.component';

import { DetailPageComponent } from './components/detail-page/detail-page.component';
import {RecommendedComponent} from './components/recommended/recommended.component';
import { SimilarComponent } from './components/similar/similar.component';
import { ContinueWatchingComponent } from './components/continue-watching/continue-watching.component';
import { WatchComponent } from './components/watch/watch.component';
import { TrendingTvComponent } from './components/trending-tv/trending-tv.component';
import { PopularTvComponent } from './components/popular-tv/popular-tv.component';
import { TopRatedTvComponent } from './components/top-rated-tv/top-rated-tv.component';
import { FooterComponent} from './components/footer/footer.component';
// import { RecommendedComponent } from './recommended/recommended.component';
// import { TopratedComponent } from './toprated/toprated.component';

@NgModule({
  declarations: [
    AppComponent,
    TrendingComponent,
    TopratedComponent,
    PopularComponent,
    HeaderNavbarComponent,
    SearchComponent,
    CurrentlyPlayingComponent,
    HomePageComponent,
    RecommendedComponent,
    DetailPageComponent,
    
    RecommendedComponent,
    
    SimilarComponent,
    
    ContinueWatchingComponent,
    
    WatchComponent,
    
    TrendingTvComponent,
    
    PopularTvComponent,
    
    TopRatedTvComponent,
    
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    YouTubePlayerModule,
    FontAwesomeModule,
    LayoutModule
  ],
  providers: [homeRouteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
