import "./PostCard.scss";

interface PostCardProps {
  title: string;
  body: string;
}

function PostCard({ title, body }: PostCardProps) {
  return (
    <div className="post-card">
      <h4 className="post-card__title">{title}</h4>
      <p className="post-card__body">{body}</p>
    </div>
  );
}

export default PostCard;
