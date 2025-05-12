export type Story = {
  id: string;
  user: string;
  avatar: string;
  isCurrentUser?: boolean;
};

export type Post = {
  id: string;
  user: string;
  avatar: string;
  content: string;
  time: string;
  image: string;
  likes: number;
  isLiked: boolean;
};
