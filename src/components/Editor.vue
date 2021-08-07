<template>
	<div class="tabs cm-s-panda-syntax cm-trailingspace">
		<header class="tabs__header">
			<div
				v-for="({ title }, idx) in TABS"
				:key="idx"
				:class="{
					tabs__header__item: true,
					'tabs__header__item--selected': idx === currentTab,
				}"
				@click="currentTab = idx"
			>
				{{ title }}
			</div>
		</header>
		<!-- <div
			class="editor Codemirror cm-s-panda-syntax cm-trailingspace"
			ref="htmlEdtior"
		/> -->
	</div>
</template>

<script>
import { onMounted, ref } from "vue";
import { initCodeMirror } from "../helpers/initCodeMirror.js";

export default {
	setup() {
		const htmlEdtior = ref(null);

		const TABS = [
			{
				title: "HTML",
				type: "htmlmixed",
			},
			{
				title: "CSS",
				type: "css",
			},
			{
				title: "JS",
				type: "javascript",
			},
		];
		const currentTab = ref(0);

		// const htmlCodeMirror = ref(null);

		// onMounted(() => {
		// 	htmlCodeMirror.value = initCodeMirror({
		// 		target: htmlEdtior.value,
		// 		isHtml: true,
		// 		opts: {
		// 			extraKeys: {
		// 				Tab: "emmetExpandAbbreviation",
		// 				Esc: "emmetResetAbbreviation",
		// 				Enter: "emmetInsertLineBreak",
		// 			},
		// 		},
		// 	});
		// });

		return { htmlEdtior, TABS, currentTab };
	},
};
</script>

<style lang="scss">
.tabs {
	width: 100%;
	height: 100%;

	&__header {
		$border-color: darken(
			$color: #ccc,
			$amount: 20,
		);
		width: 100%;
		display: grid;
		grid-auto-flow: row;
		grid-template-columns: repeat(3, 1fr);
		align-items: center;
		font-family: system-ui, sans-serif;

		&__item {
			width: 100%;
			padding: 0.25rem 0;
			border-right: 1px solid $border-color;
			border-bottom: 1px solid $border-color;
			text-align: center;
			font-weight: 400;
			transition: background-color 0.3s ease, color 0.3s ease,
				border-color 0.3s ease;

			&:hover {
				transition: none;
				color: #ff75b5;
				background-color: transparentize($color: #fff, $amount: 0.99);
				cursor: pointer;
				// border-color: #ff75b5;
			}

			&--selected {
				color: #ff75b5;
				// font-weight: bold;
				border-color: #ff75b5;
				background-color: transparentize($color: #fff, $amount: 0.95);
			}
		}
	}
}

.editor {
	width: 100%;
	height: 100%;
	resize: none;
	display: block;
}
.CodeMirror {
	height: 100%;
}
</style>
