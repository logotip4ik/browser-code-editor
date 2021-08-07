<template>
	<div class="tab">
		<h1>hi!</h1>
		<p>title: {{ title }}</p>
		<p>type: {{ type }}</p>
	</div>
</template>

<script>
export default {
	props: {
		title: { type: String, required: true, default: "" },
		type: { type: String, required: true, default: "" },
	},
};
</script>

<style></style>
