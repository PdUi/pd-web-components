import { attr, css, customElement, html, observable, when } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';

const _commentForm = () => html`
<form method="POST" class="${x => x.formClasses}" action="${x => x.commentEndpoint}">
  <textarea name="comment" rows="5" cols="50"></textarea>
  <div class="actions">
    <button type="submit">submit</button>
    <button type="button" @click=${x => x._toggleCommentFormVisibility()}>
      close
    </button>
  </div>
</form>
`;

const template = html<CommentElement>`
<button
  class="comment-button"
  type="button"
  @click=${x => x._toggleCommentFormVisibility()}
>
  comment
</button>
${when(x => x._showCommentForm, _commentForm())}
`;

const styles = css`
:host(pd-comment) {
  align-items: flex-end;
  display: flex;
  inset-block-end: 1em;
  inset-inline-end: 1em;
}

button {
  background-color: transparent;
  border-radius: 5px;
  height: 36px;
  width: 36px;
}
button:hover {
  cursor: pointer;
}

.comment-button {
  border: 1px solid var(--color);
  border-radius: 50%;
  box-shadow: 3px 3px 7px 1px var(--color);
  padding: 0;
  transition: all 0.5s ease;
  position: relative;
}
.comment-button:hover {
  height: 48px;
  width: 48px;
}

form {
  display: flex;
}

.hidden {
  visibility: hidden;
  opacity: 0;
}

.visible {
  visibility: visible;
  opacity: 1;
}

textarea {
  resize: none;
}

.actions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-inline-start: 10px;
}

.hidden button,
button.hidden {
  height: 0;
  width: 0;
}

.comment {
  fill: var(--pd-comment-color, black);
}

button:hover .comment {
  fill: var(--pd-comment-hover-color, black);
}

.submit {
  fill: var(--pd-submit-color, black);
}

.close {
  fill: var(--pd-close-color, red);
}
`;

@customElement({
    name: 'pd-comment',
    template,
    styles
})
export class CommentElement extends FoundationElement {
    @attr({ attribute: 'comment-endpoint' }) commentEndpoint?: string;
    formClasses?: string;

    @observable _showCommentForm = false;

    _toggleCommentFormVisibility() {
        this._showCommentForm = !this._showCommentForm;
    
        if (this._showCommentForm) {
            this.formClasses = undefined;
        } else {
            this.formClasses = 'hidden';
        }
    }
}