import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts";
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart } from "ng-apexcharts";
import { admissionData } from "../admission/admission-enquiry/state/admission.interface";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { loadAllAdmission } from "../admission/admission-enquiry/state/admission.action";
import { selectAlladmissionData } from "../admission/admission-enquiry/state/admission.selector";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: string[];
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartDashboardComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  
  fetchData$!: Observable<admissionData[]>;
  pendingCount: number = 0;
  approvedCount: number = 0;
  rejectedCount: number = 0;
  totalCount: number = 0;
  pendingPercentage: number = 0;
  approvedPercentage: number = 0;
  rejectedPercentage: number = 0;

  constructor(private store: Store<admissionData[]>) { }

  ngOnInit(): void {
    this.loadAdmissionData();
  }

  loadAdmissionData() {
    this.store.dispatch(loadAllAdmission());
    this.fetchData$ = this.store.pipe(select(selectAlladmissionData));

    this.fetchData$.subscribe(admissionData => {
      this.totalCount = admissionData.length;
      this.pendingCount = admissionData.filter(entry => entry.is_approved === 'pending').length;
      this.approvedCount = admissionData.filter(entry => entry.is_approved === 'Approved').length;
      this.rejectedCount = admissionData.filter(entry => entry.is_approved === 'Rejected').length;
    
      if (this.totalCount > 0) {
        this.pendingPercentage = Number(((this.pendingCount / this.totalCount) * 100).toFixed(2));
        this.approvedPercentage = Number(((this.approvedCount / this.totalCount) * 100).toFixed(2));
        this.rejectedPercentage = Number(((this.rejectedCount / this.totalCount) * 100).toFixed(2));
        
      } else {
        this.pendingPercentage = 0;
        this.approvedPercentage = 0;
        this.rejectedPercentage = 0;
      }
    
      this.chartOptions = {
        series: [this.pendingPercentage, this.approvedPercentage, this.rejectedPercentage],
        chart: {
          type: "donut",
          
        },
        labels: ["Pending", "Approved", "Rejected"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    });
    
  }
}
