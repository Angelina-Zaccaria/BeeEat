import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TakeComponent } from './take/take.component';
import { MakeComponent } from './make/make.component';
import { QuestionsComponent } from './questions/questions.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'take', component: TakeComponent },
  { path: 'make', component: MakeComponent } 
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
