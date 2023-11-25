import { Component, EventEmitter, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsService } from '../../services/results.service';
import { Results } from '../../interfaces/results';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent implements OnInit{
  @Output() toHome = new EventEmitter

  results: Results = {
    points: 0,
    timeToFinish: 0,
    timePerQuestion: 0
  }

  resultService = inject(ResultsService)

  ngOnInit(): void {
    this.resultService.data$.subscribe((data) => {
      this.results = data
    })
  }

  emitEvent(){
    this.toHome.emit(true)
  }
}
