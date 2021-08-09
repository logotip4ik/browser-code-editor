import emmet from '@emmetio/codemirror-plugin';
import { CSSLint } from 'csslint';
// import "jshint";
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
// ADDONS
import 'codemirror/addon/dialog/dialog';

import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/markdown-fold';
import 'codemirror/addon/fold/xml-fold';

import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/continuelist';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/edit/trailingspace';

import 'codemirror/addon/comment/comment';

import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/anyword-hint';

import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/html-lint';
// import "codemirror/addon/lint/javascript-lint";
import 'codemirror/addon/lint/css-lint';

import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/search/jump-to-line';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/searchcursor';

import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/selection/mark-selection';
import 'codemirror/addon/selection/selection-pointer';

// import "codemirror/addon/tern/worker";
// import "codemirror/addon/tern/tern";

import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/scrollpastend';
// CSS
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/panda-syntax.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/lint/lint.css';
// import "codemirror/addon/tern/tern.css";
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/scroll/simplescrollbars.css';

const DEFAULTS = {
  fontSize: 15,
  autoRefresh: true,
  lineNumbers: true,
  theme: 'panda-syntax',
  smartIndent: true,
  mode: 'htmlmixed',
  keyMap: 'sublime',
  autoCloseTags: true,
  autoCloseBrackets: true,
  matchBrackets: true,
  showTrailingSpace: true,
  autoComplete: true,
  lint: true,
  search: { bottom: true },
  highlightSelectionMatches: true,
  styleSelectedText: true,
  selectionPointer: true,
  jumpToLine: true,
  matchTags: true,
  toMatchingTag: true,
  toggleComment: true,
  newlineAndIndentContinueMarkdownList: true,
  scrollbarStyle: 'overlay',
  scrollPastEnd: true,
};

// eslint-disable-next-line
export const initCodeMirror = ({ target, mode, isHtml, opts }) => {
  window.CSSLint = CSSLint;
  // window.JSHint = JSHINT;
  if (isHtml) emmet(CodeMirror);
  return new CodeMirror(target, {
    ...DEFAULTS,
    ...opts,
    mode,
  });
};
