import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsService } from '../../services/results.service';
import { Results } from '../../interfaces/results';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit{
  @Output() toResults = new EventEmitter()

  questionNumber: number = 1
  firstValue: number = 5
  secondValue: number = 11
  operator: string = '/'
  correctAnswer: number = 0
  points: number = 0

  answersArray: number[] = []
  operatorsArray: string[] = ['+', '-', '*', '/']
  equationString: string = ''

  timeToFinish: number = 0
  timePerQuestion: number = 0
  gameInterval: any

  resultService = inject(ResultsService)

  ngOnInit(): void {
    this.generateEquation()
  }

  formatValue(){
    if(this.correctAnswer % 1 != 0){
      this.correctAnswer = parseFloat(this.correctAnswer.toFixed(2))
    }
    return this.correctAnswer
  }

  generateEquation(){
    this.gameInterval = setInterval(() => {
      this.timeToFinish += 0.1
    }, 100)
    this.reset()
    this.firstValue = Math.floor(Math.random() * 15) + 1;
    this.secondValue = Math.floor(Math.random() * 15) + 1;
    this.operator = this.operatorsArray[Math.floor(Math.random() * this.operatorsArray.length)]
    this.equationString = `${this.firstValue}${this.operator}${this.secondValue}`
    this.correctAnswer = (0,eval)(this.equationString)
    this.formatValue()
    this.generateAnswers(this.correctAnswer)
  }

  reset(){
    this.firstValue = 0
    this.secondValue = 0
    this.operator = ''
    this.equationString = ''
    this.correctAnswer = 0
    this.answersArray = []
    this.timeToFinish = 0
    this.timePerQuestion = 0
  }

  generateAnswers(value: number){
    this.answersArray.push(value)
    for(let i = 0; i < 3; i++){
      let answerToAdd
      if(this.correctAnswer % 1 != 0){
        answerToAdd = parseFloat(((Math.random() * 31) + (this.correctAnswer - 15)).toFixed(2))
      } else {
        answerToAdd = Math.floor(Math.random() * 21) + (this.correctAnswer - 10);
      }
      if(this.answersArray.includes(answerToAdd)){
        i--;
        continue;
      }
      this.answersArray.push(answerToAdd)
    }
    this.shuffleArray(this.answersArray)
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  onPick(value: any){
    if(value == this.correctAnswer){
      this.points++
    }
    if(this.questionNumber !== 10){
      this.questionNumber++
      this.generateEquation()
    } else {
      clearInterval(this.gameInterval)
      this.timePerQuestion = this.timeToFinish / 10
      this.emitEvent()
    }

  }

  emitEvent(){
    let values: Results = {
      points: this.points,
      timeToFinish: Number(this.timeToFinish.toFixed(2)),
      timePerQuestion: Number(this.timePerQuestion.toFixed(2))
    }

    this.toResults.emit(true)
    this.resultService.setResults(values)
  }
}
