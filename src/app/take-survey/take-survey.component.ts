import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DbService } from '../services/db.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.scss']
})
export class TakeSurveyComponent implements OnInit {

  userInput: FormGroup;
  public surveyList$: Observable<any[]>;
  selected: any;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore) {
    this.surveyList$ = this.afs.collection('/survey').valueChanges({ idField: 'id' });
  }

  ngOnInit(): void {
    // this.userInput = this.fb.group({})
    console.log()
  }

  select(survey) {
    this.selected = survey;
    let groupData = {}
    for (let i = 0; i < this.selected.questions.length; i++) {
      // groupData[`${i}`] = ['', Validators.required];
      groupData[`${i}`] = '';
    }
    this.userInput = this.fb.group(groupData);
    console.log(groupData);
  }

  clear() {
    this.selected = null;
  }

  submit() {
    const response = this.userInput.value;
    this.afs.doc(`quiz/${this.selected.id}`).collection('answers').add(response).then(() => {
      // TODO: navigate to new page
    })
  }

}


