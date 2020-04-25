import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  @Input() data: any;
  @Input() id: string;
  editQuizForm: FormGroup;
  questionTypes: string[] = []
  title: string
  isPreviewing: boolean = false;

  constructor(private fb: FormBuilder, private db: DbService) { }

  ngOnInit(): void {
    this.editQuizForm = this.fb.group({
      title: [this.data.title, Validators.required],
      description: this.data.description,
      questions: this.fb.array([])
    })
    this.addQuestions()
    this.editQuizForm.valueChanges.subscribe(data => this.data = data)
  }

  get questionForms() {
    return this.editQuizForm.get('questions') as FormArray
  }

  addQuestions() {
    for(var i = 0; i < this.data.questions.length; i++){
      if(this.data.questions[i].type == 'Multiple Choice'){
        const multipleChoice = this.fb.group({
          question: [this.data.questions[i].question, Validators.required],
          optionOne: [this.data.questions[i].optionOne, Validators.required],
          optionTwo: [this.data.questions[i].optionTwo, Validators.required],
          optionThree: [this.data.questions[i].optionThree, Validators.required],
          optionFour: [this.data.questions[i].optionFour, Validators.required],
          answer: [this.data.questions[i].answer, Validators.required],
          value: [this.data.questions[i].value, [
            Validators.required,
            Validators.min(0),
            Validators.pattern('[0-9]*')
          ]]
        })
        this.questionTypes.push('Multiple Choice')
        this.questionForms.push(multipleChoice)
      }
      else if(this.data.questions[i].type == 'True/False'){
        const trueFalse = this.fb.group({
          question: [this.data.questions[i].question, Validators.required],
          answer: [this.data.questions[i].answer, Validators.required],
          value: [this.data.questions[i].value, [
            Validators.required,
            Validators.min(0),
            Validators.pattern('[0-9]*')
          ]]
        })
        this.questionTypes.push('True/False')
        this.questionForms.push(trueFalse)
      }
      else if(this.data.questions[i].type == 'Short Answer'){
        const shortAnswer = this.fb.group({
          question: [this.data.questions[i].question, Validators.required],
          answer: [this.data.questions[i].answer, [
            Validators.required,
            //character count
            Validators.maxLength(100)
          ]],
          value: [this.data.questions[i].value, [
            Validators.required,
            Validators.min(0),
            Validators.pattern('[0-9]*')
          ]]
        })
        this.questionTypes.push('Short Answer')
        this.questionForms.push(shortAnswer)
      }
      else if(this.data.questions[i].type == 'Essay'){
        const essay = this.fb.group({
          question: [this.data.questions[i].question, Validators.required],
          answer: [this.data.questions[i].answer, [
            Validators.required,
            //character count
            Validators.maxLength(100)
          ]],
          value: [this.data.questions[i].value, [
            Validators.required,
            Validators.min(0),
            Validators.pattern('[0-9]*')
          ]]
        })
        this.questionTypes.push('Essay')
        this.questionForms.push(essay)
      }
      else if(this.data.questions[i].type === 'Ranking'){
        const ranking = this.fb.group({
          question: [this.data.questions[i].question, Validators.required],
          optionOne: [this.data.questions[i].optionOne, Validators.required],
          rankOne: [this.data.questions[i].rankOne, Validators.required],
          optionTwo: [this.data.questions[i].optionTwo, Validators.required],
          rankTwo: [this.data.questions[i].rankTwo, Validators.required,],
          optionThree: [this.data.questions[i].optionThree, Validators.required],
          rankThree: [this.data.questions[i].rankThree, Validators.required],
          optionFour: [this.data.questions[i].optionFour, Validators.required],
          rankFour: [this.data.questions[i].rankFour, Validators.required],
          value: [this.data.questions[i].value, [
            Validators.required,
            Validators.min(0),
            Validators.pattern('[0-9]*')
          ]]
        })
    
        this.questionTypes.push('Ranking')
        this.questionForms.push(ranking)
      }
    }
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

  addRanking() {
    const ranking = this.fb.group({
      question: ['', Validators.required],
      optionOne: ['', Validators.required],
      rankOne: ['', Validators.required],
      optionTwo: ['', Validators.required],
      rankTwo: [null, Validators.required,],
      optionThree: ['', Validators.required],
      rankThree: [null, Validators.required],
      optionFour: ['', Validators.required],
      rankFour: [null, Validators.required],
      value: [null, [
        Validators.required,
        Validators.min(0),
        Validators.pattern('[0-9]*')
      ]]
    })

    this.questionTypes.push('Ranking')
    this.questionForms.push(ranking)
  }

  deleteQuestion(i){
    this.questionForms.removeAt(i)
    this.questionTypes.splice(i, 1)
  }

  submit() {
    const value = this.editQuizForm.value
    value.questions.map((val, index, array) => {
      val['type'] = this.questionTypes[index]
    })
    console.log(value)
    this.db.update('quiz', value, this.id)
  }

  togglePreview() {
    this.isPreviewing = !this.isPreviewing;
  }

}
