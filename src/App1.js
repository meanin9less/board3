import { Route, Routes, Outlet, useOutletContext } from 'react-router-dom';

function Parent (){
  const data = <p>name: "김준홍", age:4, tall: 213cm</p>
  return(
    <>
      <h1>부모</h1>
      {data}
      <Outlet context={{data}}></Outlet>
    </>
  )
};

function Child (){
  const {data} = useOutletContext();
  return(
    <>
      <h1>자식</h1>
      {data}
      <Outlet context={{data}}></Outlet>
    </>
  )
}
function GrandChild (){
  const {data} = useOutletContext();
  return(
    <>
      <h1>손자</h1>
      {data}
    </>
  )
}

function App1() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Parent></Parent>}>
          <Route path="/child" element={<Child></Child>}>
            <Route path="grandchild" element={<GrandChild></GrandChild>}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App1;
