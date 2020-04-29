import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DbService } from '../services/db.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.scss']
})
export class TakeQuizComponent implements OnInit {

  userInput: FormGroup;
  public quizList$: Observable<any[]>;
  selected: any;
  submitClicked: boolean = false;
  totalWorth = 0;
  pointsScored = 0;
  totalScore = 0;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore) {
    this.quizList$ = this.afs.collection('/quiz').valueChanges({ idField: 'id' });
  }


  ngOnInit(): void {
  }

  // select(quiz) {
  //   this.selected = quiz;
  // }

  select(quiz) {
    let groupData = {}
    for (let i = 0; i < quiz.questions.length; i++) {
      // groupData[`${i}`] = ['', Validators.required];
      if (quiz.questions[i].type == 'Ranking') {
        let data = {};
        data[`${quiz.questions[i].optionOne}`] = '';
        data[`${quiz.questions[i].optionTwo}`] = '';
        data[`${quiz.questions[i].optionThree}`] = '';
        data[`${quiz.questions[i].optionFour}`] = '';
        console.log(data);
        groupData[`${i}`] = this.fb.group(data);
      }
      else if(quiz.questions[i].type == 'Matching'){
        console.log('hi');
        let data = {};
        data[`${quiz.questions[i].optionOne}`] = '';
        data[`${quiz.questions[i].optionTwo}`] = '';
        data[`${quiz.questions[i].optionThree}`] = '';
        data[`${quiz.questions[i].optionFour}`] = '';
        console.log(data);
        groupData[`${i}`] = this.fb.group(data);
      }
      else {
        groupData[`${i}`] = '';
      }

    }
    this.userInput = this.fb.group(groupData);
    this.userInput.valueChanges.subscribe(console.log);
    this.selected = quiz;
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
    this.submitClicked = !this.submitClicked;
    this.checkAnswers();
  }

  checkAnswers() {

    for (var i = 0; i < this.selected.questions.length; i++) {
      this.totalWorth += Number(this.selected.questions[i].value);
      console.log(this.selected.questions[i].answer);
      console.log(this.userInput.value[`${i}`]);
      if (this.selected.questions[i].type == 'Ranking') {
        if (this.userInput.value[i.toString()][this.selected.questions[i].optionOne] == this.selected.questions[i].rankOne
          && this.userInput.value[i.toString()][this.selected.questions[i].optionTwo] == this.selected.questions[i].rankTwo
          && this.userInput.value[i.toString()][this.selected.questions[i].optionThree] == this.selected.questions[i].rankThree
          && this.userInput.value[i.toString()][this.selected.questions[i].optionFour] == this.selected.questions[i].rankFour) {
          this.pointsScored += Number(this.selected.questions[i].value);
        }
      }
      //ASK
      if (this.selected.questions[i].type == 'Matching') {
        if (this.userInput.value[`${i}`][this.selected.questions[i].optionOne] == this.selected.questions[i].matchOne
          && this.userInput.value[`${i}`][this.selected.questions[i].optionTwo] == this.selected.questions[i].matchTwo
          && this.userInput.value[`${i}`][this.selected.questions[i].optionThree] == this.selected.questions[i].matchThree
          && this.userInput.value[`${i}`][this.selected.questions[i].optionFour] == this.selected.questions[i].matchFour){
            this.pointsScored += Number(this.selected.questions[i].value);
        }
      }
      if(this.selected.questions[i].type == 'True/False'){
        if(this.selected.questions[i].answer == String(this.userInput.value[`${i}`])){
          this.pointsScored += Number(this.selected.questions[i].value);
        }
      }
      if (this.selected.questions[i].answer == this.userInput.value[`${i}`]) {
        console.log(this.selected.questions[i].type);
        this.pointsScored += Number(this.selected.questions[i].value);
      }
    }
    this.totalScore = this.pointsScored / this.totalWorth;
  }

  refresh(): void {
    window.location.reload();
  }

}
