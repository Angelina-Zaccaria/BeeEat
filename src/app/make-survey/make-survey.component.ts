import { Component, OnInit } from '@angular/core';

interface Question {
  type: string;
}

@Component({
  selector: 'app-make-survey',
  templateUrl: './make-survey.component.html',
  styleUrls: ['./make-survey.component.scss']
})
export class MakeSurveyComponent implements OnInit {

  questions: Question[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addMultipleChoice() {
    // TODO: create multiple choice form group
    // TODO: push form group to main quiz group field
    this.questions.push({ type: "Multiple Choice" });
  }

  addTrueFalse() {
    // TODO: create true/false form group 
    // TODO: push form group to main quiz group field
    this.questions.push({ type: "True/False" });
  }

  addShortAnswer() {
    // TODO: create short answer form group 
    // TODO: push form group to main quiz group field
    this.questions.push({ type: "Short Answer" });
  }

  submit() {
    // TODO
  }


}
