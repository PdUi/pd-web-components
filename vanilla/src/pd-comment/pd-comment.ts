class CommentElement extends HTMLElement {
  private _commentButtonElement?: HTMLButtonElement;
  private _styleElement?: HTMLStyleElement;
  private _commentIconElement?: SVGElement;
  private _formElement?: HTMLFormElement;

  get commentButtonElement(): HTMLButtonElement {
    if (!this._commentButtonElement) {
      const commentButton = document.createElement('button');
      commentButton.setAttribute('class', 'comment-button');
      commentButton.onclick = () => this.onCommentButtonClick();

      commentButton.appendChild(this.commentIconElement);

      this._commentButtonElement = commentButton;
    }

    return this._commentButtonElement;
  }

  get commentIconElement(): SVGElement {
    if (!this._commentIconElement) {
      this._commentIconElement = this.generateIconElement('M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z', 'comment');
    }

    return this._commentIconElement;
  }

  get styleElement(): HTMLStyleElement {
    if (!this._styleElement) {
      const style = document.createElement('style');

      style.textContent =
      `
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
          transition: all .5s ease;
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

      this._styleElement = style;
    }

    return this._styleElement;
  }

  get formElement(): HTMLFormElement {
    if (!this._formElement) {
      const textarea = document.createElement('textarea');
      textarea.setAttribute('name', 'comment');
      textarea.setAttribute('rows', '5');
      textarea.setAttribute('cols', '50');

      const sendIconElement = this.generateIconElement('M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z', 'submit');
      const sendButton = document.createElement('button');
      sendButton.appendChild(sendIconElement);
      sendButton.setAttribute('type', 'submit');

      const closeIconElement = this.generateIconElement('M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z', 'close');
      closeIconElement.setAttribute('transform', 'translate(4, 1)');
      const closeButton = document.createElement('button');
      closeButton.onclick = () => this.onCloseButtonClick();
      closeButton.setAttribute('type', 'button');
      closeButton.appendChild(closeIconElement);

      const actionsDiv = document.createElement('div');
      actionsDiv.setAttribute('class', 'actions');
      actionsDiv.appendChild(sendButton);
      actionsDiv.appendChild(closeButton);

      const form = document.createElement('form');
      form.setAttribute('method', 'POST');
      form.setAttribute('class', 'hidden');
      form.appendChild(textarea);
      form.appendChild(actionsDiv);

      this._formElement = form;
    }

    return this._formElement;
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot?.appendChild(this.styleElement);
    this.shadowRoot?.appendChild(this.commentButtonElement);
  }

  connectedCallback() {
    if (!this.dataset.commentEndpoint) {
      throw new Error('In order to use the comment component, it must be given the endpoint to invoke for POSTing the comment to. This should be added via the "data-comment-endpoint" attribute.');
    }

    this.formElement.setAttribute('action', this.dataset.commentEndpoint);
  }

  onCommentButtonClick(): void {
    this.shadowRoot?.appendChild(this.formElement);
    this.formElement.classList.remove('hidden');
    this.formElement.classList.add('visible');

    this.commentButtonElement.classList.remove('visible');
    this.commentButtonElement.classList.add('hidden');
  }

  onCloseButtonClick(): void {
    this.formElement.classList.remove('visible');
    this.formElement.classList.add('hidden');
    this.shadowRoot?.removeChild(this.formElement);

    this.commentButtonElement.classList.remove('hidden');
    this.commentButtonElement.classList.add('visible');
  }

  private generateIconElement(pathD: string, className: string): SVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 512 512');
    svg.setAttribute('class', className);

    const attributionComment = document.createComment('! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc.');
    svg.appendChild(attributionComment);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathD);
    svg.appendChild(path);

    return svg;
  }
}

// Define the new element
customElements.define('pd-comment', CommentElement);
