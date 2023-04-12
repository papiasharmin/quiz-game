import React from 'react'
import {nanoid} from "nanoid"
import Start from './start'
import Quiz from './quiz'
function App(){
    const [startpagedisplay, setpage] = React.useState(true) //change between start page and quiz page
    const [quiz, setquiz] = React.useState([]) // set the quiz
    const [answer, setanswer] = React.useState([]) // put user answer in an array 
    const[isheld,setisheld]= React.useState(false) // held the multiple choice button on click
    const[answercheck,setanswercheck]= React.useState(false) // set if asked for check answer
    const[checkcolor,setcheckcolor]= React.useState(false) // change button color base on 
    const [count, setcount] = React.useState(0)//cout for correct answers
    const[flipbutton,setflipbutton]= React.useState('Check Answer')   // flip the check answer to new quiz
    const[fromdata,setfromdata]= React.useState({
                                                 catagory:"",
                                                 level : ""
                                                })
    //response to user selection of quiz catagory and level
    function handlechange(event){
        
        const {name, value, type} = event.target
        setfromdata(prevdata=> {
            return {
                ...prevdata,
                [name]: value
            }
        })
    }
    
    // change startpagedisplay to render quiz page
    function startpage(display){
        setpage(prevvalue => !prevvalue)
      
    }
    
    //let url = `https://opentdb.com/api.php?amount=5&category=${fromdata.catagory}&difficulty=${fromdata.level}&type=multiple`
    // fetch quiz question from trivia API
    React.useEffect(()=>{
        if(!startpagedisplay){    // dont reload untill startpagedisplay change
        fetch(`https://opentdb.com/api.php?amount=5&category=${fromdata.catagory}&difficulty=${fromdata.level}&type=multiple`).then(
            res => res.json()
        ).then(
             data =>{                         //calling setquiz to render all quiz 
                     setquiz(prevquiz =>(
                                 (data.results).map(item=>(
                                      {
                                           question : item.question,
                                           correctans:item.correct_answer,
                                           answer:            //calling builtbuttonarray func to                        render all multiple choice button
                                           builtbuttonarray([item.correct_answer,  ...item.incorrect_answers]),
                                           id:nanoid(),
                                      }
                                  )
                               )
                            )
                         )      
                       }
                   )
                }
    },[startpagedisplay])
    
    // genarating multiple choices button 
    function builtbuttonarray(array){
        let newarray= suffel(array)
        return makebuttonobject(newarray)    
    }
    
    function suffel(item){            // suffel multiplechoic array
        for(let j=0; j < 4; j++){        
        let keep = item[j]
        let randomindex = Math.floor(Math.random()*4)
        item[j]=item[randomindex]
        item[randomindex]=keep
        }
        return item
    }

    function makebuttonobject(item){
        return (item.map(choice=>(
                 {
                   choice : choice ,
                   id : nanoid(),
                   isheld: isheld,
                   held: held,
                   checkcolor:checkcolor,
                   answerchecked:answercheck
                 }
            )))         
    }
    
    // handel click event on multiplechoice button
    
     function changeisheld(array,id){   // helper function for held
                
                function change(button){
                   return  button.isheld ? {...button,isheld : !button.isheld} : button      
                }
                
                let newarray = array.map(button => 
                           id === button.id ? {...button,isheld:!button.isheld} : change(button)    
                        )
                return newarray
     }
     
    function held(id,buttonisheld,quizid,choice){
        
        setquiz(prevquiz =>{

            let newarray = prevquiz.map(item =>( quizid === item.id ? 
               {
                   ...item,
                   answer : changeisheld(item.answer,id) 
               } : item
    
            ))
            return newarray
        })
        //set user choice in answer array
        setanswer(prevans=>{
               let newarray = prevans
               if(newarray.length > 0){
                   newarray = newarray.filter(item => !(quizid === item.quizid))
               }
                newarray.push({
                                    quizid: quizid,
                                    answer :choice
                                 })
               return newarray
           })

       }
    // check answer
    
    let countarray
    
    function colorbutton(array,correctans,choice){ //helper function for changing button color                                                      depending on user anser
              let newarray =array.map(item => {
                if(correctans === item.choice){
                   return ( {...item, checkcolor:!item.checkcolor,answerchecked:!item.answercheck})
                }else if(item.choice == choice && choice !== correctans){
                   return ( {...item, answerchecked:!item.answercheck })
                }else{
                   return {...item, checkcolor:!item.checkcolor}
                }
              }
                     
              )
              return newarray
    }
    function checkanswer(){
 
        if(answer.length === 5){
           for(let i=0; i < 5;i++){     
               setquiz(prevquiz =>{
                    return prevquiz.map(item => {
                       if(answer[i].quizid === item.id){
                           return (  
                               {
                                 ...item,
                                 answer:  colorbutton(item.answer,item.correctans,answer[i].answer,)
                               }
                           ) 
                       }else{
                         return item 
                       }
               
                    })   
                }) 
        
              // check how many user answer are correct
              countarray = answer.filter(item => item.answer === quiz[i].correctans)
              if(countarray.length){
                    setcount(prevcount => prevcount + 1)
               }
        }

        }else{
            alert('ATTEMPT ALL QUESTION')
        }

        setflipbutton(prevbutton => prevbutton = 'New Quiz')
        if(flipbutton== 'New Quiz'){
            setcount(prevcount=> prevcount = 0)
            setanswer([])
            setflipbutton(prevbutton => prevbutton = 'Check Answer')
            setpage(prevvalue => !prevvalue)
        

        }
        }
 
       // setting quiz component
       let renquestionarray = quiz.map(item =>(
        <Quiz
            key={item.id} 
            question = {item.question}
            buttonarray={item.answer}
            id={item.id}
            
        />
        
        ))

      return(
        <main>
            {startpagedisplay && <Start startpage={()=>startpage(startpagedisplay)} 
                                        handlechange={handlechange} 
                                        fromdata={fromdata}
                                        />} 
            
            {!startpagedisplay && <div className='quiz-page'>
                                      {renquestionarray}
                                      <div className='check-button-container'>
                                          {flipbutton === 'New Quiz' && 
                                          <span>{`You scored ${count}/5 Correct Answer`}</span>}
                                          <button className='check-button' onClick={checkanswer}>{flipbutton}</button>
                                      </div>
                                 </div>}
        </main>
       )
}

export default App;
