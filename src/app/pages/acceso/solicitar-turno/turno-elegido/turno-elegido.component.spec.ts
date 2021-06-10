import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoElegidoComponent } from './turno-elegido.component';

describe('TurnoElegidoComponent', () => {
  let component: TurnoElegidoComponent;
  let fixture: ComponentFixture<TurnoElegidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnoElegidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoElegidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
