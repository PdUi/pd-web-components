/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface PdComment {
        "commentEndpoint"?: string;
    }
}
declare global {
    interface HTMLPdCommentElement extends Components.PdComment, HTMLStencilElement {
    }
    var HTMLPdCommentElement: {
        prototype: HTMLPdCommentElement;
        new (): HTMLPdCommentElement;
    };
    interface HTMLElementTagNameMap {
        "pd-comment": HTMLPdCommentElement;
    }
}
declare namespace LocalJSX {
    interface PdComment {
        "commentEndpoint"?: string;
    }
    interface IntrinsicElements {
        "pd-comment": PdComment;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "pd-comment": LocalJSX.PdComment & JSXBase.HTMLAttributes<HTMLPdCommentElement>;
        }
    }
}
