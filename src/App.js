import { Route, Routes, Link, useParams, Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import './App.css';

//context로 Outlet에 있는 자식들에게 데이터 넘겨주기 가능
//받을때는 useOutletContext() 써서 객체분해구조로 받기

function Header(){
  const postList = [
    {id:1, title:"첫번째 게시글입니다.", body:"첫번째 게시글 내용입니다."},
    {id:2, title:"두번째 게시글입니다.", body:"두번째 게시글 내용입니다."},
    {id:3, title:"세번째 게시글입니다.", body:"세번째 게시글 내용입니다."},
  ];
  
  return(
    <>
      <h1>게시판 앱</h1>
      <Link to="/">목록</Link>
      <hr></hr>
      <Outlet context={{postList}}></Outlet>
    </>
  )
};

function Board(){
  const {postList} = useOutletContext();
  const posts = postList.map((post)=> <li><Link to={"/"+post.id}>{post.title}</Link></li>)
  // const posts = [];
  // for(let post of postList){
  //   posts.push(<li><Link to={"/"+post.id}>{post.title}</Link></li>);
  // }
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
const {postList} = useOutletContext();
const {postId} = useParams();
const navigate = useNavigate();
const post = postList.find((post)=>post.id===Number(postId))
  return(
    <>
      <h3>게시글 상세</h3>
      <p style={{fontWeight: "bolder"}}>글 ID : {postId}</p>
      <p>{post.body}</p>
      <button onClick={()=>{
        const nextId = Number(postId)+1;
        if(nextId>postList.length){
          alert("마지막 페이지입니다.");
        }else{
          navigate("/"+nextId);
        };
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
          <Route path='/:postId' element={<Post></Post>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
