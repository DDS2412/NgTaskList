import { Component } from '@angular/core';
import { InitializerService } from "src/app/services/initializer.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private initializerService: InitializerService,
  ) {}

  ngOnInit() {}
}
