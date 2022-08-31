import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  getCourseList(){
    return ["Course 1","Course 2","Course 3"]
  }
}
