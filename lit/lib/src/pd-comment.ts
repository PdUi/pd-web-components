import {LitElement, html, css, nothing} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

@customElement('pd-comment')
export class CommentElement extends LitElement {
  static override styles = css`
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

  @property({
    attribute: 'comment-endpoint',
    type: String,
  })
  commentEndpoint?: string;

  @property()
  formClasses = { hidden: true };

  @state()
  private _showCommentForm = false;

  override render() {
    console.log(this.commentEndpoint);
    return html`
      <button
        class="comment-button"
        type="button"
        @click=${this._toggleCommentFormVisibility}
      >
        comment
      </button>
      ${this._showCommentForm ? this._commentForm() : nothing}
    `;
  }

  private _commentForm = () => html`
    <form method="POST" class=${classMap(this.formClasses)} action="${this.commentEndpoint}">
      <textarea name="comment" rows="5" cols="50"></textarea>
      <div class="actions">
        <button type="submit">submit</button>
        <button type="button" @click=${this._toggleCommentFormVisibility}>
          close
        </button>
      </div>
    </form>
  `;

  private _toggleCommentFormVisibility() {
    this._showCommentForm = !this._showCommentForm;

    if (this._showCommentForm) {
        this.formClasses.hidden = false
    } else {
        this.formClasses.hidden = true;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pd-comment': CommentElement;
  }
}
