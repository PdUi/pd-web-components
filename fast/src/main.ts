import {
    provideFASTDesignSystem,
} from '@microsoft/fast-components';
import { CommentElement } from './pd-comment';

provideFASTDesignSystem()
    .register(
        CommentElement
    );