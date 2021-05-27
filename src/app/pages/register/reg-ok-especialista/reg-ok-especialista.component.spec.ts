import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegOkEspecialistaComponent } from './reg-ok-especialista.component';

describe('RegOkEspecialistaComponent', () => {
  let component: RegOkEspecialistaComponent;
  let fixture: ComponentFixture<RegOkEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegOkEspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegOkEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
