import { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
	Form,
	Link,
	json,
	useLoaderData,
	useNavigation,
} from "@remix-run/react";
import { getPostById, updatePost } from "~/api";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	return json({ data: await getPostById(params.postId || "") });
};

export const action: ActionFunction = async ({ request, params }) => {
	const formData = await request.formData();
	const title = formData.get("title");

	if (typeof title !== "string" || params.postId === undefined) {
		return null;
	}

	const post = await getPostById(params.postId);
	const res = await updatePost({ ...post, title }, params.postId);

	return res;
};

function PostItem() {
	const { data } = useLoaderData<typeof loader>();
	const { state } = useNavigation();

	const isSubmitting = state !== "idle";

	return (
		<div className="p-4">
			<div className="max-w-sm">
				<Link to="/" className="text-blue-500 hover:underline">
					Back to posts
				</Link>
				<h1 className="text-3xl font-bold">{data.title}</h1>
				<p>{data.body}</p>
			</div>

			<div>
				<Form
					method="patch"
					className="flex flex-col max-w-sm p-3 my-5 border gap-y-3"
				>
					<input
						name="title"
						placeholder="Title"
						className="p-2 border shadow"
					/>
					<button
						type="submit"
						disabled={isSubmitting}
						className="px-2 py-1 border shadow"
					>
						{isSubmitting ? "Updating..." : "Submit"}
					</button>
				</Form>
			</div>
		</div>
	);
}

export default PostItem;
