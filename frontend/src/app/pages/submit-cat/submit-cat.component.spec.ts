import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCatComponent } from './submit-cat.component';

describe('SubmitCatComponent', () => {
  let component: SubmitCatComponent;
  let fixture: ComponentFixture<SubmitCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitCatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
