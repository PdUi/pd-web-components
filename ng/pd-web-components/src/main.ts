import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { PdCommentComponent } from './comment/comment.component';

/* https://www.angulararchitects.io/aktuelles/angular-elements-web-components-with-standalone-components/ */
(async () => {
  const app = await createApplication({
    providers: [
      /* your global providers here */
    ],
  });

  const pdCommentElement = createCustomElement(PdCommentComponent, {
    injector: app.injector,
  });

  customElements.define('pd-comment', pdCommentElement);
})();
