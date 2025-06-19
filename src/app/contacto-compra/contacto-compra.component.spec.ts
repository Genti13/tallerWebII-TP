import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoCompraComponent } from './contacto-compra.component';

describe('ContactoCompraComponent', () => {
  let component: ContactoCompraComponent;
  let fixture: ComponentFixture<ContactoCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactoCompraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactoCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
