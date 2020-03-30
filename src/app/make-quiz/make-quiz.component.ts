import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

interface Question {
  type: string;
}

@Component({
  selector: 'app-make-quiz',
  templateUrl: './make-quiz.component.html',
  styleUrls: ['./make-quiz.component.scss']
})
export class MakeQuizComponent implements OnInit {

  // questions: Question[] = [];
  quizForm: FormGroup;
  questionTypes: string[] = [];
  isPreviewing: boolean = false;
  data: any;


  constructor(private fb: FormBuilder) { 

  }

  ngOnInit(): void {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      description: '',
      //questions is a form array
      questions: this.fb.array([])
    })
    this.quizForm.valueChanges.subscribe(data => this.data = data)
  }

  get questionForms() {
    return this.quizForm.get('questions') as FormArray
  }

  addMultipleChoice() {
    // this.questions.push({ type: "Multiple Choice" });
    const multipleChoice = this.fb.group({
      question: ['', Validators.required],
      optionOne: ['', Validators.required],
      optionTwo: ['', Validators.required],
      optionThree: ['', Validators.required],
      optionFour: ['', Validators.required],
      answer: ['', Validators.required],
      value: [null, [
        Validators.required,
        Validators.min(0),
        Validators.pattern('[0-9]*')
      ]]
    })

    this.questionTypes.push('Multiple Choice')
    this.questionForms.push(multipleChoice)
  }

  addTrueFalse() {
    // this.questions.push({ type: "True/False" });
    const trueFalse = this.fb.group({
      question: ['', Validators.required],
      // may want to change to boolean, may affect form validation (all filled out)
      answer: ['', Validators.required],
      value: [null, [
        Validators.required,
        Validators.min(0),
        Validators.pattern('[0-9]*')
      ]]
    })
    this.questionTypes.push('True/False')
    this.questionForms.push(trueFalse)
  }

  
  addShortAnswer() {
    const shortAnswer = this.fb.group({
      question: ['', Validators.required],
      answer: ['', [
        Validators.required,
        //character count
        Validators.maxLength(100)
      ]],
      value: [null, [
        Validators.required,
        Validators.min(0),
        Validators.pattern('[0-9]*')
      ]]
    })
    this.questionTypes.push('Short Answer')
    this.questionForms.push(shortAnswer)
    // this.questions.push({ type: "Short Answer" });
  }

  addEssay() {
    const essay = this.fb.group({
      question: ['', Validators.required],
      answer: ['', [
        Validators.required,
        //character count
        Validators.maxLength(500)
      ]],
      value: [null, [
        Validators.required,
        Validators.min(0),
        Validators.pattern('[0-9]*')
      ]]
    })
    this.questionTypes.push('Essay')
    this.questionForms.push(essay)
    // this.questions.push({ type: "Short Answer" });
  }


  deleteQuestion(i){
    this.questionForms.removeAt(i)
    this.questionTypes.splice(i, 1)
  }

  submit() {
    // TODO
  }

  togglePreview() {
    this.isPreviewing = !this.isPreviewing;
  }

}
