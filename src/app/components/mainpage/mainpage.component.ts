import { Component, OnInit } from "@angular/core";
import { APIService } from "../../services/api.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  cards;


  constructor(private apiService: APIService) {}

  ngOnInit() {
    this.apiService.getBatch().subscribe(data => {
      console.log(data);
      console.log(JSON.stringify(data));
      this.cards = data;
    });
  }

  findThis(obj: object) {
    return obj;
  }
}
