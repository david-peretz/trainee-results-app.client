import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // This is the tag you'll use in your index.html
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Your Angular App'; // You can bind this property in your HTML to display the title
}
