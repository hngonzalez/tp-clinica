import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesorapidoComponent } from './accesorapido.component';

describe('AccesorapidoComponent', () => {
  let component: AccesorapidoComponent;
  let fixture: ComponentFixture<AccesorapidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccesorapidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesorapidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
