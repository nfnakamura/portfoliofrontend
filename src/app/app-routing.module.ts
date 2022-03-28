import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ExpEducationComponent } from './components/exp-education/exp-education.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProyectsComponent } from './components/proyects/proyects.component';
import { RegisterComponent } from './components/register/register.component';
import { SkillsComponent } from './components/skills/skills.component';

const routes: Routes = [
{
  pathMatch:'full',
  path:"",
  redirectTo:'home'
},  
{
  path:'home',
  component: HomeComponent
},
{
  path:'about',
  component:AboutComponent
},
{
  path:'exp-edu',
  component:ExpEducationComponent
},
{
  path:'projects',
  component:ProyectsComponent
},
{
  path:'skills',
  component:SkillsComponent
},
{
  path:'login',
  component:LoginComponent
},
{
  path:'register',
  component:RegisterComponent
},
{
  path:'**',
  component:PageNotFoundComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
