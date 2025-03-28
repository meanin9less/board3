import { Route, Routes, Link, useParams, Outlet, useNavigate } from 'react-router-dom';
import './App.css';

const postList = [
  {id:1, title:"첫번째 게시글입니다.", body:"첫번째 게시글 내용입니다."},
  {id:2, title:"두번째 게시글입니다.", body:"두번째 게시글 내용입니다."},
  {id:3, title:"세번째 게시글입니다.", body:"세번째 게시글 내용입니다."},
]

function Header(){
  return(
    <>
      <h1>게시판 앱</h1>
      <Link to="/">목록</Link>
      <hr></hr>
      <Outlet></Outlet>
    </>
  )
}

function Board(){
  const posts = [];
  for(let post of postList){
    posts.push(<li><Link to={"/"+post.id}>{post.title}</Link></li>);
  }
  return(
    <>
      <h2>게시글 목록</h2>
      <ul>
        {posts}
      </ul>
    </>
  )
}

function Post(){
let {postid} = useParams();
const navigate = useNavigate();
const currentPost = postList.find((post)=>post.id===Number(postid));
  return(
    <>
      <h3>게시글 상세</h3>
      <p style={{fontWeight: "bolder"}}>글 ID : {postid}</p>
      <p>{currentPost.body}</p>
      <button onClick={()=>{
        postid = Number(postid)+1;
        if(postid>postList.length){
          alert("마지막 페이지입니다.")
        }else{
          navigate("/"+postid);
        }
      }}>다음 게시글 ▶︎</button>
    </>
  )
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header></Header>}>
          <Route index element={<Board></Board>}></Route>
          <Route path='/:postid' element={<Post></Post>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
