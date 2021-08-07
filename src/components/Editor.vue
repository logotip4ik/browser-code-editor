<template>
	<div class="tabs cm-s-panda-syntax">
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
		<div class="editor" ref="editor">
			<Tab
				v-for="({ type }, idx) in TABS"
				:key="idx"
				:type="type"
				v-show="idx === currentTab"
			></Tab>
		</div>
	</div>
</template>

<script>
import { onMounted, ref } from "vue";
import { initCodeMirror } from "../helpers/initCodeMirror.js";

import Tab from "./Tab.vue";

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
		const currentTab = ref(2);

		return { htmlEdtior, TABS, currentTab };
	},
	components: { Tab },
};
</script>

<style lang="scss">
.tabs {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;

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
			border-left: 1px solid $border-color;
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
	height: 100%;
	width: 100%;
}
</style>
