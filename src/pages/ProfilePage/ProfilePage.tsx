import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";

function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const token = Cookies.get("token");
    const getPosts = async() => {

    }
  }, [user]);
  return <div className="profile-page">Profile Page</div>;
}

export default ProfilePage;
