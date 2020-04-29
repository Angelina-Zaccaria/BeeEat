import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DbService } from '../services/db.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

import { firestore } from 'firebase';
import { map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.scss']
})
export class TakeSurveyComponent implements OnInit {

  responseCounts = {};
  fillIn = []; // stores answers

  userInput: FormGroup;
  public surveyList$: Observable<any[]>;
  selected: any;
  submitClicked: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private router: Router) {
    this.surveyList$ = this.afs.collection('/survey').valueChanges({ idField: 'id' });
  }

  ngOnInit(): void {
    // this.userInput = this.fb.group({})
    console.log()
  }
  
  // select(survey) {
  //   let groupData = {}
  //   for (let i = 0; i < survey.questions.length; i++) {
  //     // groupData[`${i}`] = ['', Validators.required];
  //     groupData[`${i}`] = '';
  //   }
  //   this.userInput = this.fb.group(groupData);
  //   // this.userInput.valueChanges.subscribe(console.log);
  //   this.selected = survey; 
  //   // console.log(groupData);
  // }


  select(survey) {
    let groupData = {}
    for (let i = 0; i < survey.questions.length; i++) {
      // groupData[`${i}`] = ['', Validators.required];
      if (survey.questions[i].type == 'Ranking') {
        let data = {};
        data[`${survey.questions[i].optionOne}`] = '';
        data[`${survey.questions[i].optionTwo}`] = '';
        data[`${survey.questions[i].optionThree}`] = '';
        data[`${survey.questions[i].optionFour}`] = '';
        console.log(data);
        groupData[`${i}`] = this.fb.group(data);
      }
      else if(survey.questions[i].type == 'Matching'){
        console.log('hi');
        let data = {};
        data[`${survey.questions[i].optionOne}`] = '';
        data[`${survey.questions[i].optionTwo}`] = '';
        data[`${survey.questions[i].optionThree}`] = '';
        data[`${survey.questions[i].optionFour}`] = '';
        console.log(data);
        groupData[`${i}`] = this.fb.group(data);
      }
      else {
        groupData[`${i}`] = '';
      }

    }
    this.userInput = this.fb.group(groupData);
    this.userInput.valueChanges.subscribe(console.log);
    this.selected = survey;
    console.log(groupData);
  }

  incrementUsers() {
    const db = firestore();
    const increment = firestore.FieldValue.increment(1);

    const survey = db.collection('survey').doc(`${this.selected.id}`);

    survey.update({count: increment});
  }

  getTotalResponses() {
    this.responseCounts = {};
    for (let i = 0; i < Object.keys(this.userInput.value).length; i++) {
      this.totalResponse(this.selected.id, i.toString(), this.userInput.value[i.toString()]);
    }
  }

  private totalResponse(surveyID, questionNumber, answerValue) {
    this.afs.collection(`survey/${surveyID}/answers`, ref => ref.where(questionNumber, '==', answerValue)).get().subscribe(results => {
      this.responseCounts[questionNumber] = {
        count: results.size,
        answer: this.userInput.value[questionNumber]
      }
    })
  }

  totalUsers() {
    if (this.selected.count == null) {
      return "0";
    }
    else {
      return this.selected.count;
    }
  }

  private allAnswers(surveyID) {
    this.afs.collection(`survey/${surveyID}/answers`, ref => ref.limit(5)).get().subscribe(
      results => {
        results.docs.forEach(doc => {
         this.fillIn.push(doc.data());
        });
      })
  }

  // allResponses() {
  //   this.fillIn = {};
  //   for (let i = 0; i < Object.keys(this.userInput.value).length; i++) {
  //     this.allAnswers(this.selected.id, i.toString());    
  //   }
    // for(let i = 0; i < 2; i++) {
    //   this.allAnswers(this.selected.id, i.toString());    
    //   }
  // }


  clear() {
    this.selected = null;
  }

  submit() {
    const title = this.selected.title;
    const response = this.userInput.value;
    this.afs.doc(`survey/${this.selected.id}`).collection('answers').add(response).then(() => {
      // TODO: navigate to new page
      // this.router.navigate(['/results', title])
      // , {state: {userInput: this.userInput, data: this.selected}}
    })
    this.submitClicked = !this.submitClicked;
    this.getTotalResponses();
    this.allAnswers(this.selected.id);
  }

  refresh(): void {
    window.location.reload();
  }

  // allAnswers(surveyID, questionNumber) {
  //   this.afs.collection(`survey/${surveyID}/answers`).get().subscribe(results => {
  //     this.fillIn[questionNumber] = {
  //       count: results.size
  //       }
  //   });
  //   return this.selected.count;
  // }

  // allResponses() {
  //   this.fillIn = {};
  //   for(let i = 0; i < this.allAnswers(this.selected.id, this.selected.question).length; i++) {
  //     return this.selected.question[i].answers;    
  //   }
  // }


}
