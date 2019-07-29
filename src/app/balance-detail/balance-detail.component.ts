import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../repository/transaction.service';

@Component({
  selector: 'app-balance-detail',
  templateUrl: './balance-detail.component.html',
  styleUrls: ['./balance-detail.component.css']
})
export class BalanceDetailComponent implements OnInit {

  Transaction: any = [];

  constructor( public restApi: TransactionService) { }

  ngOnInit() {
    this.loadTransaction();
  }

  loadTransaction(){
    return this.restApi.getTransactions().subscribe((data: {}) => {
      this.Transaction = data;
    })
  }

}
