import {useEffect} from "react";
import {useState} from "react";
import {Link} from "react-router-dom";

export function View() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async function fetchData() {
      const req = await fetch("http://localhost:3000/blog/");
      const json = await req.json();
      setPosts(json);
    })();
  }, []);

  async function delPost(title) {
    const requestData = JSON.stringify({title});
    const headers = {"content-type": "application/json"};
    const req = await fetch('http://localhost:3000/blog/', {body:requestData, headers, method: "DELETE"});
    if (req.status === 204) {
      navigate("/view");
      
    }
    else {
      setError(true);
    } 

    // ??
    //When fetch executes successfully, when promise is resolved,
    //set Done variable to 2
    
    console.log(requestData);
  }

  return (
    <div>
      <Link to="/"> Home</Link>
      <div>
        {posts.map((post) => (
          <div
            style={{
              border: "2px solid",
              width: "50vw",
              margin: "auto",
              textAlign: "center",
            }} key = {post.title}
          >
            <h2 style={{margin: "0.2rem"}}>{post.title}</h2>
            <div>{post.content}</div>
            <div> <button onClick={() => delPost(post.title)}> Delete </button> </div>
          </div>
        ))}
      </div>
    </div>
  );
}