import { Component } from '@angular/core';

// Angular Material Modules
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // standalone: true,
  // imports: [MatButtonModule, MatMenuModule]
})
export class AppComponent {
  title = 'todo-client';
}
