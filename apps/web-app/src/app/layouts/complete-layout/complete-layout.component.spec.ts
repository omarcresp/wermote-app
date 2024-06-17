import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteLayoutComponent } from './complete-layout.component';

describe('CompleteLayoutComponent', () => {
  let component: CompleteLayoutComponent;
  let fixture: ComponentFixture<CompleteLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompleteLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
