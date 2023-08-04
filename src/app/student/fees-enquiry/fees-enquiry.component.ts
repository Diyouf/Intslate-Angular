import { Component, OnInit } from '@angular/core';
import { StudentServiceService } from '../service/student.service';
import Swal from 'sweetalert2';
import {
  FeeStructure,
  PaidFeesInterface,
  PaymentHandlerConfig,
  token,
  unpaidTermsData,
} from './fees-enquiry.interface';

@Component({
  selector: 'app-fees-enquiry',
  templateUrl: './fees-enquiry.component.html',
  styleUrls: ['./fees-enquiry.component.css'],
})
export class FeesEnquiryComponent implements OnInit {
  feeData: FeeStructure | undefined;
  paidFees!: PaidFeesInterface | undefined;
  id = localStorage.getItem('studentId');
  totalPaid!: number;
  totalAmount!: number;
  balanceAmount!: number;
  unpaidTerms!: unpaidTermsData;
  paymentHandler!: PaymentHandlerConfig;

  constructor(private service: StudentServiceService) {}

  async ngOnInit(): Promise<void> {
    await this.studentPaidFees();
    await this.loadFees();
    this.invokeStripe();
    this.findUpcomingUnpaidTerm(); // Call this function after fetching the data
  }

  async loadFees(): Promise<void> {
    this.feeData = await this.service.fetchfees().toPromise();
    this.totalAmount =
      (this.feeData?.term1?.amount ?? 0) +
      (this.feeData?.term2?.amount ?? 0) +
      (this.feeData?.term3?.amount ?? 0);

    this.calculateBalanceAmount();
  }

  async studentPaidFees(): Promise<void> {
    this.paidFees = await this.service.paidFees(this.id).toPromise();
    this.totalPaid =
      (this.paidFees?.term1?.amount ?? 0) +
      (this.paidFees?.term2?.amount ?? 0) +
      (this.paidFees?.term3?.amount ?? 0);
    this.calculateBalanceAmount();
  }

  calculateBalanceAmount() {
    this.balanceAmount = this.totalAmount - this.totalPaid;
  }

  findUpcomingUnpaidTerm(): void {
    if (!this.feeData) {
      return;
    }else if(!this.paidFees){
      return 
    }

    const terms: ('term1' | 'term2' | 'term3')[] = ['term1', 'term2', 'term3'];
    for (const term of terms) {
      if (this.paidFees[term]?.status === 'Unpaid') {
        this.unpaidTerms = {
          term: this.capitalizeFirstLetter(term),
          amount: this.feeData[term]?.amount ?? 0,
          id: this.paidFees[term]?._id ?? '',
        };
        break;
      }
    }
  }

  capitalizeFirstLetter(term: string): string {
    return term.charAt(0).toUpperCase() + term.slice(1);
  }

  payNow() {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51NUXPzSDeABFhKBXLo7ny9iBaxUCetBFRxUoHCCzg0NgEKrh5BJCh8UkZI2ysCEN8paCpIDDW3ehf27lCcheypKs00CpowOYEv',
      locale: 'auto',
      token: (stripeToken: token) => {
        this.service
          .hitPayment(stripeToken, this.unpaidTerms, this.id)
          .subscribe((res: { success: boolean }) => {
            if (res.success) {
              Swal.fire({
                title:
                  '<span style="font-size: 24px">Payment Successfull!</span>',
                html: '<span style="font-size: 18px; padding-top: -30px">The Payment invoice send through Mail</span>',
                icon: 'success',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.findUpcomingUnpaidTerm();
                  this.studentPaidFees();
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
          token: function () {},
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
