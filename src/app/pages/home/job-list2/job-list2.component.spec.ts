import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobList2Component } from './job-list2.component';

describe('JobList2Component', () => {
  let component: JobList2Component;
  let fixture: ComponentFixture<JobList2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobList2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
