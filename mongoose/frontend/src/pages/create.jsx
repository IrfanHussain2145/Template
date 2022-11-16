import {useState} from "react";
import {Link} from "react-router-dom";

export function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [done, setDone] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const requestData = JSON.stringify({title, content, password});
    const headers = {"content-type": "application/json"};
    const req = await fetch('https://localhost:3000/blog/create-post/', {body:requestData, headers, method: "POST"});
    if (req.status === 500) {
      setError(true);
    }
    else {
      navigate("/view");
    }

    // ??
    //When fetch executes successfully, when promise is resolved,
    //set Done variable to 2
    
    console.log(requestData);
  }
  if (error) {
    return <div> Incorrect Password 
      <button onClick={() => setError(false)}> Back </button>
    </div>
  }

  // if (done) {
  //   return (
  //     <div>
  //       <Link to="/view">Check out your blog post</Link>
  //     </div>
  //   );
  // }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        ></textarea>
      </div>
      <div>
        <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <button>Post</button>
    </form>
  );
}