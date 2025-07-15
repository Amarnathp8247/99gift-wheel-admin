import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeManagementComponent } from './prize-management.component';

describe('PrizeManagementComponent', () => {
  let component: PrizeManagementComponent;
  let fixture: ComponentFixture<PrizeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrizeManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrizeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
