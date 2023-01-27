import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfMakeComponent } from './pdf-make.component';

describe('PdfMakeComponent', () => {
  let component: PdfMakeComponent;
  let fixture: ComponentFixture<PdfMakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfMakeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PdfMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
