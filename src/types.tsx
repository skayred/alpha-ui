export interface Post {
    id: number;
    title: string;
    content: string;
    author: User;
    comments: Comment[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    posts: Post[];
}

export interface Comment {
    id: number;
    content: string;
    post: Post;
    author: User;
}
