import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../repository/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  type: string;
  private sub: any;

  @Input() transactionDetails = { id: '', transactionType: '', amount: 0 }

  constructor(private route: ActivatedRoute,  public restApi: TransactionService, 
    public router: Router) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.type = params['type'];
      this.transactionDetails.transactionType = this.type;
   });
  }

  addTransaction() {
    this.transactionDetails.amount = +this.transactionDetails.amount;
    this.restApi.createTransaction(this.transactionDetails).subscribe((data: {}) => {
      this.router.navigate([''])
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
