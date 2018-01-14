import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WalletComponent } from './wallet.component';

describe('WalletComponent', () => {
  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;
  let compiled

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ WalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render current balance in the div.balance element', async(() => {
    const div = compiled.querySelector('div.balance')
    expect(div).toBeTruthy();
    expect(div.textContent).toContain('429.29 ₽');
  }));

  it('should render input element', async(() => {
    expect(compiled.querySelector('input')).toBeTruthy();
  }));

  it('should render new balance sync', async(() => {
    const div = compiled.querySelector('div.balance');
    expect(div.textContent).toContain('429.29 ₽');
    
    component.balance = 1000;
    fixture.detectChanges();
    expect(div.textContent).toContain('1000.00 ₽');
  }));

  it('should render new balance async', async(() => {
    const div = compiled.querySelector('div.balance');
    expect(div.textContent).toContain('429.29 ₽');

    const form = { 
      "value": {"newBalance": 1000},
      resetForm: () => {}
    }

    component.updateBalance(form).then(() => {
      fixture.detectChanges();
      expect(div.textContent).toContain('1000.00 ₽');
    })
  }));

});
