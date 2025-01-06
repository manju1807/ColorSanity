import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: MainLayout,
			children: [
				{
					path: "",
					name: "home",
					// route level code-splitting
					// this generates a separate chunk (About.[hash].js) for this route
					// which is lazy-loaded when the route is visited.
					component: () => import("../pages/HomeView.vue"),
				},
				{
					path: "collections",
					name: "collections",
					component: () => import("../pages/CollectionsPage.vue"),
				},
				{
					path: "tints",
					name: "tints",
					component: () => import("../pages/TintsPage.vue"),
				},
				{
					path: "color-palettes",
					name: "color-palettes",
					component: () => import("../pages/ColorPalette.vue"),
				},
				{
					path: "/preview",
					name: "Preview",
					component: () => import("../pages/PreviewPage.vue"),
				},
			],
		},
	],
});

export default router;
