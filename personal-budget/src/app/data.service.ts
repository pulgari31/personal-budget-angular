import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public dataSource: any = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#b882fa',
          '#7ba699',
          '#e67d57'
        ],
      },
    ],
    labels: [],
};;

constructor(private http: HttpClient) {
    this.fetchData();
}

isEmpty(val:any){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  }

fetchData(){
    if (this.isEmpty(this.dataSource.datasets[0].data)|| this.isEmpty(this.dataSource.labels)){
        this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
            for (let i = 0; i < res.myBudget.length; i++) {
                this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
                this.dataSource.labels[i] = res.myBudget[i].title;
            }
      });
    }
}
}
