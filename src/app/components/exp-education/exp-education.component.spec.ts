import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpEducationComponent } from './exp-education.component';

describe('ExpEducationComponent', () => {
  let component: ExpEducationComponent;
  let fixture: ComponentFixture<ExpEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
