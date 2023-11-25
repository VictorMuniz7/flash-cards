import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Results } from '../interfaces/results';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private resultsSubject = new BehaviorSubject<any>('');
  data$ = this.resultsSubject.asObservable();

  setResults(result: Results){
    this.resultsSubject.next(result)
  }
}
