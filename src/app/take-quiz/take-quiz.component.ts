import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DbService } from '../services/db.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, } from 'rxjs/internal/Observable';
// class Quiz {
//   constructor(public title) { }
// }

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.scss']
})
export class TakeQuizComponent implements OnInit {

  public quizList$: Observable<any[]>;
  selected: any;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore) {
    this.quizList$ = this.afs.collection('/quiz').valueChanges({ idField: 'id' });
  }


  ngOnInit(): void {
  }

  select(quiz) {
    this.selected = quiz;
  }

  clear() {
    this.selected = null;
  }


}
