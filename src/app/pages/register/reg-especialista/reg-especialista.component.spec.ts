import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegEspecialistaComponent } from './reg-especialista.component';

describe('RegEspecialistaComponent', () => {
  let component: RegEspecialistaComponent;
  let fixture: ComponentFixture<RegEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegEspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
