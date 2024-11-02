import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaingTableComponent } from './campaing-table.component';

describe('CampaingTableComponent', () => {
  let component: CampaingTableComponent;
  let fixture: ComponentFixture<CampaingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaingTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
