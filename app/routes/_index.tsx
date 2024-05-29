import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/api";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export const loader = async () => {
	return json({ data: await getPosts() });
};

export default function Index() {
	const { data } = useLoaderData<typeof loader>();

	return (
		<div className="p-4">
			<h1 className="text-3xl font-bold mb-4">Blog</h1>

			<ul className="grid grid-cols-4 gap-4">
				{data.map((post) => (
					<li key={post.id}>
						<Link
							to={`/posts/${post.id}`}
							className="p-3 block h-full shadow rounded hover:bg-black/5"
						>
							<div className="text-lg font-medium">{post.title}</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
