import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPageComponent } from './components/detail-page/detail-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { WatchComponent} from './components/watch/watch.component';
// import {TrendingComponent} from './components/trending/trending.component';
// import {TopratedComponent} from './components/toprated/toprated.component'

const routes: Routes = [
  {path:'', component: HomePageComponent},
  {path:'watch/:movie/:id', component: DetailPageComponent},
  {path:'mylist', component: WatchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
