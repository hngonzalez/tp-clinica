import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMisTurnosComponent } from './tabla-mis-turnos.component';

describe('TablaMisTurnosComponent', () => {
  let component: TablaMisTurnosComponent;
  let fixture: ComponentFixture<TablaMisTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaMisTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaMisTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
