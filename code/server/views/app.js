"use strict";

Vue.component('static-posts', {

	template: '#static-posts-template', 

	data: () => ({
		posts: []
	}),

	mounted() {
		this.getPosts();
	}, 

	methods: {
		getPosts() {
			this.posts = [
				{
					"title": "the first post title"
				}, 
				{
					"title": "the second post title"
				}, 
				{
					"title": "the third post title"
				}
			];
		}
	}
});

new Vue({
	el: "#app"
});