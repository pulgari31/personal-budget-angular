import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

  private dataSource: any = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
            ]
        }
    ],
    labels: []
};

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
      this.http.get("http://localhost:3000/budget")
      .subscribe((res: any) => {
        for (var i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
          var tempChart = Chart.getChart("myChart");
          if (tempChart != undefined)
            tempChart.destroy();
          this.createChart();
      }
      });
  }

  createChart() {
    var ctx: any = document.getElementById('myChart');
    var myPieChart = new Chart(ctx, {
        type: "pie",
        data: this.dataSource
    });
}

}
