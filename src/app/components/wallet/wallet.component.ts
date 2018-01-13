import { Component, OnInit } from '@angular/core';
// import { setInterval, clearInterval } from 'timers';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  public balance: number = 429.29;
  public amount: number;

  constructor() { }

  ngOnInit() {
  }

  updateBalance(): Promise<any> {
    this.amount = +this.amount;
    return new Promise((resolve, reject) => {
      if (typeof(this.amount) != "number")
        return reject(null);

      let timer = setInterval(() => {
        let delta = this.amount - this.balance;
        this.balance = this.balance + delta / 20;

        if ( Math.abs(delta) < 0.1) {
          this.balance = this.amount;
          clearInterval(timer);
          resolve(this.balance);
        }
      }, 50)
    });
  }
}
