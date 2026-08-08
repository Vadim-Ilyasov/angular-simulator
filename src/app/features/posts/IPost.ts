export interface IPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: string;
    dislikes: string;
  };
  views: number;
  userId: number;
}
