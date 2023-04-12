import React from 'react'
import {nanoid} from "nanoid"
import Button from './button'

export default function Quiz(props){
   
    let renchoicearray = (props.buttonarray).map(item=>(
        <Button 
           choice ={item.choice}
           id = {item.id}
           isheld = {item.isheld}
           held = {item.held}
           quizid={props.id}
           checkcolor={item.checkcolor}
           answerchecked={item.answerchecked}
        /> 
        
    ))
    
    return(
        <div className='quiz-container'>
           <h4>{props.question}</h4>
           <div className='choice-button-container'>
           {renchoicearray}
           </div>           
        </div>
    )
}