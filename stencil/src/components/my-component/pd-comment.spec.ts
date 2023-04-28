import { newSpecPage } from '@stencil/core/testing';
import { CommentComponent } from './pd-comment';

describe('pd-comment', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [CommentComponent],
      html: '<pd-comment></pd-comment>',
    });
    expect(root).toEqualHtml(`
      <pd-comment>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </pd-comment>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [CommentComponent],
      html: `<pd-comment first="Stencil" last="'Don't call me a framework' JS"></pd-comment>`,
    });
    expect(root).toEqualHtml(`
      <pd-comment first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </pd-comment>
    `);
  });
});
