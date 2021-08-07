<template>
	<div class="main">
		<Editor></Editor>
	</div>
</template>

<script>
import Editor from "./components/Editor.vue";

export default {
	setup() {
		return {};
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
	min-height: 100vh;
	font-family: system-ui, sans-serif;
}

.main {
	height: 100vh;
}
</style>
