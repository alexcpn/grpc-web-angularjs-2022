import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  service;
  courses : string[];
  constructor(service:SearchService) { 
    this.service =service
    this.courses=[]
  }

  ngOnInit(): void {
  }
  async onClick(){
    this.courses =await this.service.getDatafromGRPCServer()

  }

}
