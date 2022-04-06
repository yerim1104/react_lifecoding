import React from 'react';

function Create(props){
    return <article> <h2>Create</h2>
    <form onSubmit = {event=>{
        event.preventDefault();
        //얘의 역할 뭐라규??? 리로드 안된다구!! submit 버튼 눌러도 리로드 안된다.
        const title= event.target.title.value;
        const body = event.target.body.value;
        //submit 버튼을 눌렀을 때 발생하는 이벤트는 form 태그에서 발생한 것이기 때문에 
        //event 타겟은 결국 form태그이다. form 태그안의 title인 태그를 가지고 오고 싶으면 걍 title 써주면 된다.
        //근데, 가지고 오고 싶은건 타이틀 자체가 아니라 그 안의 값이니까 value 적어준다.
        //여기서! 어떻게 사용자의 정보를 공급 받냐!! 우리는 props가 이쨔나
        props.onCreate(title, body);
        //이것이 실행되면 app.js의 CREATE의 elseif에 있는 oncreate 함수가 실행될 것이고,
        //사용자가 입력한 title과 body값을 받아 create 컴포넌트 사용자에게 출력시켜줄 것이다.
    }}> 
        <p><input type="text" name="title" placeholder="title"/></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value ="Create"></input></p>
    </form>
    </article>
}

export default Create;