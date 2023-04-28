import { Component, Fragment, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'pd-comment',
  styleUrl: 'pd-comment.css',
  shadow: true,
})
export class CommentComponent {
  @Prop({ attribute: 'comment-endpoint' }) commentEndpoint?: string;
  @State() formClasses?: string = undefined;

  @State() showCommentForm: boolean = false;

  toggleCommentFormVisibility = () => {
      this.showCommentForm = !this.showCommentForm;

      if (this.showCommentForm) {
          this.formClasses = undefined;
      } else {
          this.formClasses = 'hidden';
      }
  }

  render() {
    return [
      <button class="comment-button" type="button" onClick={this.toggleCommentFormVisibility}>
        comment
      </button>,
      (<Fragment>{
        this.showCommentForm &&
        <form method="POST" class={this.formClasses} action={this.commentEndpoint}>
          <textarea name="comment" rows={5} cols={50}></textarea>
          <div class="actions">
            <button type="submit">submit</button>
            <button type="button" onClick={this.toggleCommentFormVisibility}>
              close
            </button>
          </div>
        </form>
      }</Fragment>)
    ];
  }
}
