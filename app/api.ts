export const BASE_URL = "https://jsonplaceholder.typicode.com";

type Post = {
	id: number;
	userId: number;
	title: string;
	body: string;
};

export const getPosts = async (): Promise<Post[]> => {
	const res = await fetch(`${BASE_URL}/posts?_limit=10`);
	const data = await res.json();

	return data;
};

export const getPostById = async (id: string): Promise<Post> => {
	const res = await fetch(`${BASE_URL}/posts/${id}`);
	const data = await res.json();

	return data;
};

export const updatePost = async (post: Post, postId: string): Promise<Post> => {
	const res = await fetch(`${BASE_URL}/posts/${postId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(post),
	});

	const data = await res.json();

	return data;
};
