import React from 'react'



export default function Button(props){
    
    let styles ={
        backgroundColor : props.isheld ? '#D6DBF5' : 'white',
        border : props.isheld ?   '1px solid white' : '2px solid #D6DBF5',
        color: props.checkcolor ? '#D6DBF5' : '#293264'
    }
    
    if(props.answerchecked){
        styles ={
        backgroundColor : props.checkcolor ? '#94D7A2' : '#F8BCBC',
        border : 'none',
        color: props.checkcolor ?  '#293264' : '#D6DBF5'
        }

    }
    return(
        <button className='choice-button' style={styles} onClick={props.checkcolor ? null : 
        ()=>props.held(props.id,props.isheld,props.quizid,props.choice) }>{props.choice}</button>
    )
    
}