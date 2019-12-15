import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { Observable } from "rxjs";
import { Card, Member } from "src/app/models/card";
import { InitializerService } from "src/app/services/initializer.service";
import { APIService } from "src/app/services/api.service";
import { BoardInfo } from "src/app/models/boardInfo";

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"]
})
export class AnalyticsComponent implements OnInit {
  index = 0;
  boardInfo: Observable<BoardInfo[]>;
  boardList: Observable<[Card[]]> = new Observable<[Card[]]>();
  board: Card[];
  membersArray: Array<Member> = new Array<Member>();
  dateArr = [
    [1, "Январь"],
    [2, "Февраль"],
    [3, "Март"],
    [4, "Апрель"],
    [5, "Май"],
    [6, "Июнь"],
    [7, "Июль"],
    [8, "Август"],
    [9, "Сентябрь"],
    [10, "Октябрь"],
    [11, "Ноябрь"],
    [12, "Декабрь"]
  ];
  yearArr = [2019, 2020];
  selectedMonth: number;
  selectedYear: number;
  myChart;
  selectedBoard: string;

  constructor(
    private apiService: APIService,
    private initializerService: InitializerService
  ) {}

  ngOnInit() {
    this.boardInfo = this.initializerService.boardInfo;
    this.boardList = this.initializerService.cardList;
    this.boardList.subscribe(data => {
      this.board = data[this.index];
      this.apiService.getBoardsMembers(data[this.index][0].idBoard).subscribe(data => {
        this.membersArray = data;
      });
    });
  }

  createChart() {
    let members = [];
    let countOfDone = [];
    let a = [];
    for (let i = 0; i < this.membersArray.length; i++) {
      let counter = 0;
      for (let j = 0; j < this.board.length; j++) {
        if (
          this.board[j].dueComplete === true &&
          this.membersArray[i].id === this.board[j].members[0].id
        ) {
          counter++;
        }
      }
      a.push([this.membersArray[i].fullName, counter]);
    }

    a.forEach(item => {
      members.push(item[0]);
      countOfDone.push(item[1]);
    });

    this.myChart = new Chart("canvas", {
      type: "doughnut",
      data: {
        labels: members,
        datasets: [
          {
            data: countOfDone,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Количество выполненых задач исполнителем"
        },
        legend: {
          position: "top"
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });
  }

  getDaysInMonth1(month: number, year: number): Array<number> {
    let numberOfDays = new Date(year, month, 0).getDate();
    let arrOfDates = new Array<number>();
    for (let i = 0; i < numberOfDays; i++) {
      arrOfDates.push(i + 1);
    }
    return arrOfDates;
  }
}
