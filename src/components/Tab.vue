<template>
	<div
		class="tab Codemirror cm-s-panda-syntax cm-trailingspace"
		ref="tab"
	></div>
</template>

<script>
import { initCodeMirror } from "../helpers/initCodeMirror";

export default {
	data: () => ({
		editor: null,
	}),
	mounted() {
		const opts = {
			extraKeys: {
				Tab: "emmetExpandAbbreviation",
				Esc: "emmetResetAbbreviation",
				Enter: "emmetInsertLineBreak",
			},
		};
		this.editor = initCodeMirror({
			mode: this.type,
			value: this.type.includes("html")
				? "<h1>Hello world!</h1>"
				: this.type === "css"
				? "body {\n  font-family: sans-serif;\n}"
				: 'console.log("Hello world")',
			target: this.$refs.tab,
			isHtml: this.type.includes("html"),
			opts: {
				...(this.type.includes("html") ? opts : {}),
			},
		});
	},
	props: {
		type: { type: String, required: true, default: "" },
	},
};
</script>

<style>
.tab {
	width: 100%;
	height: 100%;
}
.CodeMirror {
	height: 100%;
}
</style>
