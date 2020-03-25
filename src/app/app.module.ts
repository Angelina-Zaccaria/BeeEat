import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { TakeComponent } from './take/take.component';
import { MakeComponent } from './make/make.component';
import { QuestionsComponent } from './questions/questions.component';
import { MaterialModule } from './material/material.module';
import { MakeQuizComponent } from './make-quiz/make-quiz.component';
import { MakeSurveyComponent } from './make-survey/make-survey.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TakeComponent,
    MakeComponent,
    QuestionsComponent,
    MakeQuizComponent,
    MakeSurveyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
