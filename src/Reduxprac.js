import React,{useState} from "react";
import {createStore} from "redux";
import {Provider, useSelector, useDispatch, connect} from 'react-redux';

// connect는 잘 쓰지 않을 뿐더러 재사용 시 사용한다. 이 강의에서는 잘 다루지 않는다.
// provider : state를 어떤 컴포넌트들에게 제공할 것인가에 대한 가장 바깥쪽 울타리를 정의하는 것
//꼭 store를 반드시 반드시 지정해줘야한다. 그 아래의 컴포넌트 들은 store를 사용할 수 있게 된 것이다.
// 이 주석 바로 아래 function reducer의 return의 number의 값을 left3에 넣어주고 싶다면??
// useSelector를 사용하라~ 리모콘같은 애다!


function reducer(currentState, action) {
    if(currentState === undefined){
        return{
            number:1,
        }
    }
    
    const newState = {...currentState};
   
    if( action.type === 'PLUS'){
        newState.number++;
    }
    return newState;
}

const store = createStore(reducer);
export default function Reduxprac(){
    return(
        <div id="container">
            <h1>Root</h1>
            <div id="grid">
            <Provider store={store}>
            <Left1 ></Left1>
            <Right1></Right1>
            </Provider>
            </div>
        </div>
    )
}

function Left1(){
    return(
        <div>
            <h1>Left1 : </h1>
            <Left2 ></Left2>
        </div>

    );
}
function Left2(){
    console.log('2');
    return(
        <div>
            <h1>Left2 : </h1>
            <Left3 ></Left3>
        </div>

    );
}
function Left3(){
    console.log('3');
    //플러스를 누를때마다 출력되는건 3이다! 이 말인 즉슨 다른 컴포넌트는 영향을 받지 않는다.
    const number = useSelector((state)=>state.number);
    return(
        <div>
            <h1>Left3 : {number}</h1>
        </div>

    );
}
function Right1(){
    return(
        <div>
            <h1>Right1</h1>
            <Right2></Right2>
        </div>
    )
}
function Right2(){
    return(
        <div>
            <h1>Right2</h1>
            <Right3 ></Right3>
        </div>
    )
}
function Right3(){
    const dispatch = useDispatch();
    return(
        <div>
            <h1>Right3</h1>
            <input type="button" value="+" onClick = {()=>{
                dispatch({type: 'PLUS'})
            }}></input>
        </div>
    )
}