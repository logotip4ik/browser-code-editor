<template>
	<div class="main">
		<Editor @update="updateEntry"></Editor>
		<iframe frameborder="0" ref="iframe"></iframe>
	</div>
</template>

<script>
import { onMounted, ref } from "vue";
import Editor from "./components/Editor.vue";

export default {
	setup() {
		const iframe = ref(null);
		let createdStyleTag = false;
		let createdAppTag = false;
		// let createdStyleTag = false;
		// let CSSBlobLink = null;

		function updateEntry({ type, value }) {
			const iframeDoc = iframe.value.contentDocument;
			switch (type) {
				case "htmlmixed":
					if (createdAppTag)
						return (iframeDoc.getElementById("app").innerHTML = value);

					const iframeApp = document.createElement("div");
					iframeApp.id = "app";
					iframeApp.style.width = "100%";
					iframeApp.style.minHeight = "100%";
					iframeApp.innerHTML = value;

					iframeDoc.body.appendChild(iframeApp);
					createdAppTag = true;
					break;
				case "css":
					if (createdStyleTag)
						return (iframeDoc.head.children[0].innerHTML = value);

					const styleTag = document.createElement("style");
					styleTag.innerHTML = value;
					iframeDoc.head.appendChild(styleTag);
					createdStyleTag = true;
					break;
				default:
					break;
			}
		}

		return { iframe, updateEntry };
	},
	components: {
		Editor,
	},
};
</script>

<style lang="scss">
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	scrollbar-width: none;
}

html,
body,
#app {
	height: 100vh;
	font-family: system-ui, sans-serif;
}

.main {
	max-height: 100vh;
	display: grid;
	grid-auto-flow: row;
	grid-template-columns: clamp(100px, 60%, 800px) auto;
}

iframe {
	width: 100%;
	height: 100vh;
	overflow: auto;
}
</style>
