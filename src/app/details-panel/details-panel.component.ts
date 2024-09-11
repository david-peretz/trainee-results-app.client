import { Component, Input } from '@angular/core';
import { Trainee } from '../models/trainee';

@Component({
  selector: 'app-details-panel',
  templateUrl: './details-panel.component.html',
  styleUrls: ['./details-panel.component.scss']
})
export class DetailsPanelComponent {
  @Input() selectedTrainee: Trainee | undefined;

  save() {
    console.log('Save Changes', this.selectedTrainee);
  }

  remove() {
    console.log('Remove Trainee', this.selectedTrainee);
  }
}
