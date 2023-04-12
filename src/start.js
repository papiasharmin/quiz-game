import React from 'react'

function Start(props){
    
    return(
        <div className='start-container'>
        
            <h1>Quizzical</h1>
            <p>Answer the trivia questions and test your GK</p>
            <div className='input'>
            <label htmlFor="catagory">Select Catagory</label>
            <br />
            <select 
                id="catagory"
                value={props.fromdata.catagory}
                name="catagory"
                onChange={props.handlechange}
            >
                <option value="" disabled>Select</option>
                <option value="9">General Knowledge</option>
                <option value="17">Science & Nature</option>
                <option value="19">Science: Mathematics</option>
                <option value="21">Sports</option>
                <option value="23">History</option>
                <option value="27">Animals</option>
            </select>
            <fieldset>
                <legend>Select Level</legend>
                
                <input 
                    type="radio"
                    id="easy"
                    name="level"
                    value="easy"
                    onChange={props.handlechange}
                />
                <label htmlFor="easy">Easy</label>
                <br />
                
                <input 
                    type="radio"
                    id="medium"
                    name="level"
                    value="medium"
                    onChange={props.handlechange}
                    
                />
                <label htmlFor="medium">Medium</label>
                <br />
                
                <input 
                    type="radio"
                    id="hard"
                    name="level"
                    value="hard"
                    onChange={props.handlechange}
                    
                />
                <label htmlFor="hard">Hard</label>
                <br />
                
            </fieldset>
            </div>
            <button onClick={props.startpage}>Start Quiz</button>
        
         </div>
    )
}
export default Start;