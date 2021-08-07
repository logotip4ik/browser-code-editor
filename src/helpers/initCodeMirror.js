import emmet from "@emmetio/codemirror-plugin";
import CodeMirror from "codemirror/lib/codemirror.js";
import "codemirror/keymap/sublime.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";
// ADDONS
import "codemirror/addon/dialog/dialog.js";

import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";

import "codemirror/addon/edit/closebrackets.js";
import "codemirror/addon/edit/closetag.js";
import "codemirror/addon/edit/continuelist.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/edit/matchtags.js";
import "codemirror/addon/edit/trailingspace.js";

import "codemirror/addon/comment/comment.js";

import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/html-hint.js";
import "codemirror/addon/hint/css-hint.js";
import "codemirror/addon/hint/javascript-hint.js";
import "codemirror/addon/hint/anyword-hint.js";

import "codemirror/addon/lint/lint.js";
import "codemirror/addon/lint/html-lint.js";
import "codemirror/addon/lint/javascript-lint.js";
import "codemirror/addon/lint/css-lint.js";

import "codemirror/addon/search/match-highlighter.js";
import "codemirror/addon/search/jump-to-line.js";
import "codemirror/addon/search/search.js";
import "codemirror/addon/search/searchcursor.js";

import "codemirror/addon/selection/active-line.js";
import "codemirror/addon/selection/mark-selection.js";
import "codemirror/addon/selection/selection-pointer.js";

// import "codemirror/addon/tern/worker.js";
// import "codemirror/addon/tern/tern.js";

import "codemirror/addon/scroll/simplescrollbars.js";
import "codemirror/addon/scroll/scrollpastend.js";
// CSS
import "codemirror/lib/codemirror.css";
// import "codemirror/theme/panda-syntax.css";
import "codemirror/theme/panda-syntax.css";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/lint/lint.css";
// import "codemirror/addon/tern/tern.css";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/scroll/simplescrollbars.css";

const DEFAULTS = {
	fontSize: 14,
	lineNumbers: true,
	theme: "panda-syntax",
	smartIndent: true,
	mode: "htmlmixed",
	keyMap: "sublime",
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
	scrollbarStyle: "overlay",
	scrollPastEnd: true,
};

export const initCodeMirror = ({ target, isHtml, opts }) => {
	if (isHtml) emmet(CodeMirror);
	return CodeMirror(target, {
		...DEFAULTS,
		...opts,
	});
};
