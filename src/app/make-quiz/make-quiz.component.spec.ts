import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeQuizComponent } from './make-quiz.component';

describe('MakeQuizComponent', () => {
  let component: MakeQuizComponent;
  let fixture: ComponentFixture<MakeQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
