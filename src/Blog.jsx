import React, { useState, useEffect, useRef, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./App.css";

const CustomQuill = forwardRef((props, ref) => (
  <ReactQuill ref={ref} {...props} />
));

function Blog() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", contentBlocks: [] });
  const [editPost, setEditPost] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") !== null
  );
  const navigate = useNavigate();
  const quillRef = useRef(null);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem("token") !== null);
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  useEffect(() => {
    fetch("http://localhost:5001/posts")
      .then((response) => response.json())
      .then((data) =>
        setPosts(
          data.map((post) => ({
            ...post,
            contentBlocks: Array.isArray(post.contentBlocks)
              ? post.contentBlocks
              : JSON.parse(post.contentBlocks || "[]"),
          }))
        )
      )
      .catch((error) =>
        console.error("❌ Feil ved henting av innlegg:", error)
      );
  }, []);

  const handleFileUpload = async (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:5001/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      setNewPost((prev) => {
        const updatedBlocks = [...prev.contentBlocks];
        updatedBlocks[index].content = data.filePath;
        return { ...prev, contentBlocks: updatedBlocks };
      });
    };
    input.click();
  };

  const handleImageSizeChange = (index, size) => {
    setNewPost((prev) => {
      const updatedBlocks = [...prev.contentBlocks];
      updatedBlocks[index].imageSize = size;
      return { ...prev, contentBlocks: updatedBlocks };
    });
  };

  const addPost = () => {
    if (newPost.title && newPost.contentBlocks.length > 0) {
      fetch("http://localhost:5001/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...newPost,
          contentBlocks: JSON.stringify(newPost.contentBlocks),
        }),
      })
        .then((response) => response.json())
        .then(() => window.location.reload())
        .catch((error) =>
          console.error("❌ Feil ved lagring av innlegg:", error)
        );
    }
  };

  const deletePost = (id) => {
    fetch(`http://localhost:5001/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then(() => setPosts(posts.filter((post) => post.id !== id)))
      .catch((error) =>
        console.error("❌ Feil ved sletting av innlegg:", error)
      );
  };

  const moveBlock = (index, direction) => {
    setNewPost((prev) => {
      const updatedBlocks = [...prev.contentBlocks];
      const temp = updatedBlocks[index];
      updatedBlocks[index] = updatedBlocks[index + direction];
      updatedBlocks[index + direction] = temp;
      return { ...prev, contentBlocks: updatedBlocks };
    });
  };

  return (
    <section id="blog">

<div className="rain-container">
  <div className="blog-rain blog-rain1"></div>
  <div className="blog-rain blog-rain2"></div>
  <div className="blog-rain blog-rain3"></div>
  <div className="blog-rain blog-rain4"></div>
  <div className="blog-rain blog-rain5"></div>
  <div className="blog-rain blog-rain6"></div>
  <div className="blog-rain blog-rain7"></div>
  <div className="blog-rain blog-rain8"></div>
  <div className="blog-rain blog-rain9"></div>
</div>
      <div className="blog-header">
        <h2 className="blog-title">Blogg</h2>
      </div>
      {isAuthenticated && (
        <div className="blog-form">
          <h3 className="form-title">
            {editPost ? "Rediger innlegg" : "Legg til nytt innlegg"}
          </h3>
          <input
            type="text"
            placeholder="Tittel"
            className="input-field"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />

          {newPost.contentBlocks.map((block, index) => (
            <div key={index} className="content-block">
              {block.type === "text" ? (
                <CustomQuill
                  theme="snow"
                  value={block.content}
                  onChange={(value) => {
                    const updatedBlocks = [...newPost.contentBlocks];
                    updatedBlocks[index].content = value;
                    setNewPost({ ...newPost, contentBlocks: updatedBlocks });
                  }}
                />
              ) : (
                <>
                  {block.content && (
                    <div>
                      <img
                        src={`http://localhost:5001${block.content}`}
                        alt="Opplastet bilde"
                        style={{ width: `${block.imageSize || 50}%` }}
                      />

                      {/* 🔥 Skyveknapp for **individuell** bildestørrelse */}
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={block.imageSize || 50}
                        onChange={(e) =>
                          handleImageSizeChange(index, e.target.value)
                        }
                      />
                    </div>
                  )}
                  <button
                    className="cta-btn"
                    onClick={() => handleFileUpload(index)}
                  >
                    Last opp bilde
                  </button>
                </>
              )}
              <button
                className="cta-btn"
                onClick={() => moveBlock(index, -1)}
                disabled={index === 0}
              >
                ⬆ Flytt opp
              </button>
              <button
                className="cta-btn"
                onClick={() => moveBlock(index, 1)}
                disabled={index === newPost.contentBlocks.length - 1}
              >
                ⬇ Flytt ned
              </button>
            </div>
          ))}

          <button
            className="cta-btn"
            onClick={() =>
              setNewPost((prev) => ({
                ...prev,
                contentBlocks: [
                  ...prev.contentBlocks,
                  { type: "text", content: "" },
                ],
              }))
            }
          >
            ➕ Legg til tekst
          </button>
          <button
            className="cta-btn"
            onClick={() =>
              setNewPost((prev) => ({
                ...prev,
                contentBlocks: [
                  ...prev.contentBlocks,
                  { type: "image", content: "", imageSize: 50 },
                ],
              }))
            }
          >
            🖼️ Legg til bilde
          </button>

          <button className="cta-btn" onClick={addPost}>
            Publiser
          </button>
        </div>
      )}
      <div className="blog-posts">
        {posts.map((post) => (
          <div key={post.id} className="blog-post">
            <h3>{post.title}</h3>
            <p className="post-timestamp">
              Publisert: {new Date(post.created_at).toLocaleString()}
            </p>
            {Array.isArray(post.contentBlocks) &&
              post.contentBlocks.length > 0 &&
              post.contentBlocks.map((block, index) => (
                <div key={index}>
                  {block.type === "text" ? (
                    <p dangerouslySetInnerHTML={{ __html: block.content }}></p>
                  ) : (
                    <div>
                      <img
                        src={`http://localhost:5001${block.content}`}
                        alt="Blogg bilde"
                        style={{ width: `${block.imageSize || 50}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            {isAuthenticated && (
              <div className="post-actions">
                <button className="cta-btn" onClick={() => deletePost(post.id)}>
                  Slett
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Blog;
