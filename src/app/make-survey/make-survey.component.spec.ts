import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeSurveyComponent } from './make-survey.component';

describe('MakeSurveyComponent', () => {
  let component: MakeSurveyComponent;
  let fixture: ComponentFixture<MakeSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
