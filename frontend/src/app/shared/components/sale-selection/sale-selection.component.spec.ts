import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleSelectionComponent } from './sale-selection.component';

describe('SaleSelectionComponent', () => {
  let component: SaleSelectionComponent;
  let fixture: ComponentFixture<SaleSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
