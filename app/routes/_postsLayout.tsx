import { Outlet } from "@remix-run/react";

function PostsLayout() {
	return (
		<div>
			<header>Posts header</header>
			<Outlet />
		</div>
	);
}

export default PostsLayout;
