import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './comment.component.html',
  selector: 'pd-comment',
  standalone: true,
  styleUrls: ['./comment.component.css'],
  imports: [ CommonModule ]
})
export class PdCommentComponent {
  @Input('comment-endpoint') commentEndpoint?: string;
  formClasses?: string;

  _showCommentForm = false;

  _toggleCommentFormVisibility() {
      console.log('here');
      this._showCommentForm = !this._showCommentForm;

      if (this._showCommentForm) {
          this.formClasses = undefined;
      } else {
          this.formClasses = 'hidden';
      }
  }
}
