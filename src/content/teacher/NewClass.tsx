import React from 'react';

const NewClass : React.FC<{  }> = () =>{
    let [message, setMessage] =  React.useState<String | null>(null);

   return(
          <div>
               <h2>Create New Class</h2>
                <span className="red">{message}</span>
                {/* <form onSubmit={}>   */}
                   <form>
                        <div>
                        <label>Classname:</label>
                        <input name="classname" placeholder=""  />
                        {/* <input name="classname" placeholder="" onChange={} /> */}
                        </div>
                        <div>
                        <label>Subject:</label>
                        <input name="subject" placeholder=""  />
                        {/* <input name="subject" placeholder="" onChange={} /> */}
                        </div>  
                        <label>Students:</label>
                            <select id="students">
                                <option value="std">Student</option>
                            </select>
                        <button type="submit">Create Class</button>
                     </form>
          </div>
          )
    }

export default NewClass 