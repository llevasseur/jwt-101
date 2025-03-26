import { FormEvent, useState, ChangeEvent } from "react";
import errorIcon from "../../assets/icons/error-24px.svg";
import "./PostForm.scss";
import axios, { isAxiosError } from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

interface PostFormInputsType {
  title: string;
  body: string;
}

interface PostFormErrorsType {
  title?: string;
  body?: string;
  server?: string;
}

function PostForm() {
  const [inputs, setInputs] = useState<PostFormInputsType>({
    title: "",
    body: "",
  });
  const [errors, setErrors] = useState<PostFormErrorsType>({
    title: "",
    body: "",
    server: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInputs((prev: PostFormInputsType) => ({ ...prev, [name]: value }));
    setErrors((prev: PostFormErrorsType) => ({ ...prev, [name]: "" }));
  };

  const isFormValid = () => {
    const newErrors: PostFormErrorsType = {};
    if (!inputs.body.trim()) {
      newErrors.body = "Content is required";
    }
    if (!inputs.title.trim()) {
      newErrors.title = "Title is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addPost = async (token: string) => {
    try {
      const response = await axios.post(
        `${API_URL}user/posts`,
        { title: inputs.title, body: inputs.body },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      navigate("/profile");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        switch (err.status) {
          case 400:
          default:
            setErrors((prev: PostFormErrorsType) => ({
              ...prev,
              server: "Server Error",
            }));
        }
      } else {
        setErrors((prev: PostFormErrorsType) => ({
          ...prev,
          server: "Unknown Error",
        }));
      }
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!isFormValid()) {
      return;
    }
    const token = Cookies.get("token");
    if (token) {
      addPost(token);
    }
  };
  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="error-block">
        {errors.title && (
          <>
            <img
              alt="error icon"
              src={errorIcon}
              className="error-block__icon"
            />
            <p className="error-block__text">{errors.title}</p>
          </>
        )}
      </div>
      <input
        type="text"
        name="title"
        placeholder="Add a Title"
        onChange={handleInputChange}
        value={inputs.title}
        className="post-form__input"
      />

      <div className="error-block">
        {errors.body && (
          <>
            <img
              alt="error icon"
              src={errorIcon}
              className="error-block__icon"
            />
            <p className="error-block__text">{errors.body}</p>
          </>
        )}
      </div>
      <textarea
        name="body"
        placeholder="Add post content"
        onChange={handleInputChange}
        value={inputs.body}
        className="post-form__input post-form__input--textarea"
      />

      <div className="error-block">
        {errors.server && (
          <>
            <img
              alt="error icon"
              src={errorIcon}
              className="error-block__icon"
            />
            <p className="error-block__text">{errors.server}</p>
          </>
        )}
      </div>
      <div className="post-form-cta">
        <button type="submit" className="post-form-cta__button">
          Submit
        </button>
      </div>
    </form>
  );
}

export default PostForm;
