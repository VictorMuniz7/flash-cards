import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GameComponent } from './components/game/game.component';
import { HomeComponent } from './components/home/home.component';
import { ResultComponent } from './components/result/result.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, GameComponent, HomeComponent, ResultComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'flash-cards';

  showHome: boolean = true
  showResult: boolean = false
  showGame: boolean = false

  toGameFunction(){
    setTimeout(() => {
      this.showHome = false
      this.showGame = true
    }, 700)
  }

  toResultsFunction(){
    setTimeout(() => {
      this.showGame = false
      this.showResult = true
    }, 700)
  }

  toHomeFunction(){
    setTimeout(() => {
      this.showResult = false
      this.showHome = true
    }, 700)
  }
}
