import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tabv2Component } from './tabv2.component';

describe('Tabv2Component', () => {
  let component: Tabv2Component;
  let fixture: ComponentFixture<Tabv2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tabv2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tabv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
