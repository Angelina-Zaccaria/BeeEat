import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DbService } from '../services/db.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.scss']
})
export class TakeSurveyComponent implements OnInit {


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
  
  select(survey) {
    let groupData = {}
    for (let i = 0; i < survey.questions.length; i++) {
      // groupData[`${i}`] = ['', Validators.required];
      groupData[`${i}`] = '';
    }
    this.userInput = this.fb.group(groupData);
    this.userInput.valueChanges.subscribe(console.log);
    this.selected = survey; 
    console.log(groupData);
  }

  // totalUsers() {
  //   const db = firebase.firestore();
  //   const increment = firebase.firestore.FieldValue.increment(1);

  //   const survey = db.collection('survey').doc(`${this.selected.id}`)
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
  }

}


