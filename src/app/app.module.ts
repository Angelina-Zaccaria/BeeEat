import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

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
import { PreviewComponent } from './preview/preview.component';
import { SuccessComponent } from './success/success.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { EditComponent } from './edit/edit.component';
import { TakeSurveyComponent } from './take-survey/take-survey.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { EditQuizComponent } from './edit-quiz/edit-quiz.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TakeComponent,
    MakeComponent,
    QuestionsComponent,
    MakeQuizComponent,
    MakeSurveyComponent,
    PreviewComponent,
    SuccessComponent,
    EditComponent,
    TakeSurveyComponent,
    TakeQuizComponent,
    EditSurveyComponent,
    EditQuizComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, 
    ClipboardModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
