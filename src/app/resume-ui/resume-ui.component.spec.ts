import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeUIComponent } from './resume-ui.component';

describe('ResumeUIComponent', () => {
  let component: ResumeUIComponent;
  let fixture: ComponentFixture<ResumeUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeUIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
