import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";
import axios, { isAxiosError } from "axios";
import { Link } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import "./ProfilePage.scss";

const API_URL = import.meta.env.VITE_API_URL;

interface PostType {
  id: string;
  title: string;
  body: string;
}

function ProfilePage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [errors, setErrors] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const token = Cookies.get("token");
    const getPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}user/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPosts(response.data);
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          switch (err.status) {
            case 401:
            case 404:
            default:
              setErrors("error");
          }
        } else {
          setErrors("unknown error");
        }
        console.log(err);
      }
    };
    if (token) {
      getPosts();
    }
  }, [user]);
  return (
    <div className="profile-page">
      {errors || !user ? (
        <div>
          <p>Error loading profile posts</p>
        </div>
      ) : (
        <>
          <div>
            <h2 className="profile-page__title">Profile Page</h2>
            <h3>Welcome {user.username}</h3>
          </div>
          <div className="posts">
            <h4>{user.username}'s Posts</h4>

            {posts.length > 0 ? (
              <>
                <ul className="post-list">
                  {posts.map((post: PostType) => (
                    <li key={post.id}>
                      <PostCard title={post.title} body={post.body} />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <ul className="post-list post-list--no-posts">
                <li>No Posts to show</li>
              </ul>
            )}

            <Link to="/profile/add-post" className="posts__add-btn">
              Add Post
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
