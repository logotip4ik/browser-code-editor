import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import { VitePWA } from "vite-plugin-pwa";

// VitePWA({
// 	registerType: "autoUpdate",
// 	manifest: {
// 		name: "Browser Code Editor",
// 		short_name: "BCE",
// 		start_url: ".",
// 		display: "fullscreen",
// 		background_color: "#292A2B",
// 		description: "Simple Browser code editor + PWA for working offline!",
// 	},
// });

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		// VitePWA()
	],
});
