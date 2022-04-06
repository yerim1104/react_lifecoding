import React from 'react';
import {useState} from 'react';
import Create from './Create';
import Update from './Update';
import { Link } from 'react-router-dom';

function Header(props){
  return<header>
    {/* href는 순수html이 아니라, 유사 html 이다. */}
    {/* preventDefault 는 A태그가 동작하는 기본 동작을 방지하는 것, 클릭해도 리로드가 되지 않는다 */}
  <h1> <a href="/" onClick = {(event)=>{
    event.preventDefault();
    props.onChangeMode();
  }}>{props.title}</a></h1>
</header>
}

function Nav(내려받음) {
  const list = []

  for (let i=0; i<내려받음.topics.length; i++){
      let t= 내려받음.topics[i];
      list.push(<li key={t.id}>
        <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
        event.preventDefault();
        내려받음.onChangeMode(Number(event.target.id));
            // evnt객체가 가지고 있는 타겟, 타겟이라 함은 누굴 가리키냐!
            // 그 이벤트를 유발 시킨 태그를 가리킨다. 여기서는 a태그!
      }}>{t.title}</a></li>)
      
  }

  return <nav>
  <ol>
    {list}
  </ol>
</nav>
}

function Article(프롭스) {
  return <article>
  <h2>{프롭스.title}</h2>
  {프롭스.body}
</article>

}


function Reactbasic(props) {
  
  // const _mode = useState("WELCOME");
  // //usestate의 인자는 그 스테이트의 초기값이다.
  // console.log('mode', _mode);
  // //콘솔을 찍어보면 0번째는 괄호안의 인자인 "WELCOME"이 나온다. 즉 STATE의 초기값이 출력된다.
  // //1번째는 함수가 나오는데 함수는 무언가 동작을 시키는 것이다! 고로 아래와 같이 해석할 수 있다.
  
  // //state의 값은 0번째 인덱스의 값으로 읽는다.
  // const mode = _mode[0];
  // //state의 값은 1번째 인덱스의 값으로 바꾼다.
  // const setMode = _mode[1];
  // 위의것들을 정리하면 아래와 같다.

  const [mode,setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  //const topics =[ 얘를 USESTATE를 사용해 상태를 승격시켜준다.
  //승격시켜준 이유? 사용자가 CREATE 창에서 INPUT을 SUBMIT했을 때
  //리스트가 업데이트 돼야하니까 변동이 생기고, SETTOPICS를 활용해
  //사용자가 입력한 값을 배열에 추가해 출력시켜줘야하니까!
  const [topics,setTopics] = useState([
  {id:1, title:'html', body:'html is ...'},
  {id:2, title:'css', body:'css is ...'},
  {id:3, title:'javascript', body:'javascript is ...'},
  ]);

  let content = null;
  let contextControl = null;


  if(mode === "WELCOME"){
      content= <Article title="Welcome" body="Hello, WEB"></Article>
  }else if(mode === "READ"){
    let title, body = null;
    for (let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    
    content = <Article title={title} body={body}></Article>
    contextControl = <>
    <li><a href={'/update/'+id} onClick={event=>{
      event.preventDefault();
      setMode('UPDATE');
    }}>Update</a></li>
    <li><input type="button" value="Delete" onClick={()=>{
      const newTopics = []
      for(let i=0; i<topics.length; i++){
        if(topics[i].id !== id){
          newTopics.push(topics[i]);
        }
      }
      setTopics(newTopics);
      setMode('WELCOME');
    }} /></li>
  </>
  }else if(mode === "CREATE"){
    content = <Create onCreate = {(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body: _body}
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);

    }}></Create>
  }else if(mode=== 'UPDATE'){
    let title, body = null;
    for (let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content=<Update title={title} body={body} onUpdate={(title,body)=>{
      const newTopics = [...topics]
      const updatedTopic = {id:id, title:title, body:body}
      for(let i=0; i<newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ')
    }}></Update>
  }
  //update의 기능 상 원래 값을 받아와야지! 무언가를 생성하는 것이 아니니까~
return(
<div className="App">
        <Header title="React" onChangeMode={()=>{
        setMode("WELCOME");
        //MODE의 값이 SETMODE에 의해 WELCOME으로 바뀌고, IF줄로 넘어가 MODE의 값이 WELCOME이기 때문에 TITLE이 WELCOME으로 지속된다.
      }}></Header>
      <Nav topics={topics} onChangeMode={(아이디)=>{
        setMode("READ");
        //MODE의 값이 SET MODE에 의해 READ로 바뀌고, ELSE IF 줄로 넘어가 MODE의 값이 READ 이기 때문에 TITLE이 READ로 바뀐다.
        setId(아이디);
      }}></Nav>
      {content}
      <ul>
      <li><a href="/create" onClick = {event=>{
        event.preventDefault();
        setMode('CREATE');
        //CREATE를 SETMODE를 활용해서 WELCOME값을 바꾸고, APP함수가 다시 실행되면서 IF문에서 CREATE가 없으므로 아무것도 걸리지 않는다.
        //SO, ELSEIF를 활용해 원하는 행동을 하나 더추가해줘야한다.

      }}>Create</a></li>
      {contextControl}
      </ul>

      <Link to ="./reduxprac"><button>redux practice</button></Link>
      </div>
)};

export default Reactbasic;