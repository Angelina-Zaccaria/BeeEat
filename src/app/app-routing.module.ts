import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TakeComponent } from './take/take.component';
import { MakeComponent } from './make/make.component';
import { QuestionsComponent } from './questions/questions.component';
import { PreviewComponent } from './preview/preview.component';
import { MakeQuizComponent } from './make-quiz/make-quiz.component';
import { MakeSurveyComponent } from './make-survey/make-survey.component';
import { SuccessComponent } from './success/success.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'take', component: TakeComponent },
  { path: 'make', component: MakeComponent },
  { path: 'preview', component: PreviewComponent,
    children:  [
      { path: '', component: MakeQuizComponent },
      { path: '', component: MakeSurveyComponent },
    ]
  }, 
  { path: 'success/:id', component: SuccessComponent},
  { path: 'edit', component: EditComponent}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
