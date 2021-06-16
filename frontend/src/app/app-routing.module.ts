import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from "./pages/landing/landing.component"
import { LoginComponent } from './pages/login/login.component'
import { SignupComponent } from './pages/signup/signup.component'
import { AuthGuard } from "./guards/auth.guard"
import { DashboardComponent } from "./pages/dashboard/dashboard.component"
import { SearchComponent } from "./pages/search/search.component"
import { NotfoundComponent } from "./pages/notfound/notfound.component"
import { CoffeeComponent } from "./pages/coffee/coffee.component"
import { SearchresultsComponent } from "./pages/searchresults/searchresults.component"
import { FindrecipeComponent } from "./pages/findrecipe/findrecipe.component"
import {ExploreComponent} from "./pages/explore/explore.component";

const routes: Routes = [
  { path:"", component: LandingComponent},
  { path:"search", component: SearchComponent},
  { path:"login", component: LoginComponent},
  { path:"signup", component: SignupComponent},
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  { path: "notfound", component: NotfoundComponent},
  { path: "coffee", component: CoffeeComponent},
  { path: "results", component: SearchresultsComponent},
  { path: "recipe/:id", component: FindrecipeComponent},
  { path: "explore", component: ExploreComponent},
  { path: "**", redirectTo: "notfound"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
