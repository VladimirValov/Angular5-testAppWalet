import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { WalletComponent } from './wallet.component';

describe('WalletComponent', () => {
  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ WalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render current balance in the div.balance element', async(() => {
    const fixture = TestBed.createComponent(WalletComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.balance').textContent).toContain('429.29 ₽');
  }));

  it('should render input element', async(() => {
    const fixture = TestBed.createComponent(WalletComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input')).toBeTruthy();
  }));

  it('should render new balance sync', async(() => {
    const fixture = TestBed.createComponent(WalletComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    
    const compiled = fixture.debugElement.nativeElement;
    const div = compiled.querySelector('div.balance');
    expect(div.textContent).toContain('429.29 ₽');
    
    component.balance = 1000;
    fixture.detectChanges();
    expect(div.textContent).toContain('1000.00 ₽');
  }));

  it('should render new balance async', async(() => {
    const fixture = TestBed.createComponent(WalletComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    
    const compiled = fixture.debugElement.nativeElement;
    const div = compiled.querySelector('div.balance');
    expect(div.textContent).toContain('429.29 ₽');
    
    component.amount = 1000;
    component.updateBalance().then(() => {
      fixture.detectChanges();
      expect(div.textContent).toContain('1000.00 ₽');
    })
    
  }));


});
