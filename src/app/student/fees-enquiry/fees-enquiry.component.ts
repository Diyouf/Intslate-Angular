import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from '../service/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fees-enquiry',
  templateUrl: './fees-enquiry.component.html',
  styleUrls: ['./fees-enquiry.component.css']
})
export class FeesEnquiryComponent implements OnInit {
  feeData: any;
  paidFees: any;
  id = localStorage.getItem('studentId');
  totalPaid!: number;
  totalAmount!: number;
  balanceAmount!: number;
  unpaidTerms: any
  paymentHandler!: any

  constructor(private service: StudentServiceService) {

  }

  ngOnInit(): void {
    this.studentPaidFees();
    this.loadFees();
    this.invokeStripe()
  }

  loadFees() {
    this.service.fetchfees().subscribe((res) => {
      this.feeData = res;
      this.totalAmount = this.feeData.term1.amount + this.feeData.term2.amount + this.feeData.term3.amount;
      this.calculateBalanceAmount();
    });
  }

  studentPaidFees() {
    this.service.paidFees(this.id).subscribe((res) => {
      this.paidFees = res;
      this.totalPaid = this.paidFees.term1.amount + this.paidFees.term2.amount + this.paidFees.term3.amount;
      this.calculateBalanceAmount();
    });
  }

  calculateBalanceAmount() {
    this.balanceAmount = this.totalAmount - this.totalPaid;
  }



  payNow() {
    if (this.paidFees.term1.status === 'Unpaid') {
      this.unpaidTerms = {
        term: 'Term 1',
        amount: this.feeData.term1.amount,
        id: this.paidFees.term1._id,
      };
    } else if (this.paidFees.term2.status === 'Unpaid') {
      this.unpaidTerms = {
        term: 'Term 2',
        amount: this.feeData.term2.amount,
        id: this.paidFees.term2._id,
      };
    } else if (this.paidFees.term3.status === 'Unpaid') {
      this.unpaidTerms = {
        term: 'Term 3',
        amount: this.feeData.term3.amount,
        id: this.paidFees.term3._id,
      };
    }

    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51NUXPzSDeABFhKBXLo7ny9iBaxUCetBFRxUoHCCzg0NgEKrh5BJCh8UkZI2ysCEN8paCpIDDW3ehf27lCcheypKs00CpowOYEv',
      locale: 'auto',
      token: (stripeToken: any) => {
        this.service.hitPayment(stripeToken, this.unpaidTerms, this.id).subscribe((res: any) => {
          if(res.success){
            Swal.fire({
              title: '<span style="font-size: 24px">Payment Successfull!</span>',
              html: '<span style="font-size: 18px; padding-top: -30px">The Payment invoice send through Mail</span>',
              icon: 'success'
            }).then((result)=>{
              if(result.isConfirmed){
                this.studentPaidFees()
              }
            });
           
          }
        });
      },
    });

    paymentHandler.open({
      name: 'IntSlate',
      description: this.unpaidTerms.term + ' Fee for your student',
      amount: this.unpaidTerms.amount * 100,
      currency: 'INR',
    });
  }


  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51NUXPzSDeABFhKBXLo7ny9iBaxUCetBFRxUoHCCzg0NgEKrh5BJCh8UkZI2ysCEN8paCpIDDW3ehf27lCcheypKs00CpowOYEv',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }



}



