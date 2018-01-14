import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  public balance: number;
  public timer: any;
  public minBalance = 0;
  public maxBalance = 1000000000;
  
  public balanceForm: FormGroup;

  ngOnInit() {
    this.balance = 429.29;

    this.balanceForm = new FormGroup({
      "newBalance": new FormControl("", [
        Validators.required,
        Validators.min(this.minBalance),
        Validators.max(this.maxBalance)
      ])
    }) 
  }

  get newBalance() { return this.balanceForm.get('newBalance'); }

  updateBalance(form): Promise<any> {
    const newBalance = +form.value.newBalance;
    form.resetForm({});
    
    return new Promise((resolve, reject) => {
      if (typeof(newBalance) != "number")
        return reject();

      this.timer = setInterval(() => {
        let delta = newBalance - this.balance;
        this.balance = this.balance + delta / 4;

        if ( Math.abs(delta) < 0.5) {
          this.balance = newBalance;
          clearInterval(this.timer);
          this.timer = null;
          resolve(this.balance);
        }
      }, 20)
    });
  }
}
