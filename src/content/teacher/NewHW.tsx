import React from 'react';

const NewHW : React.FC<{  }> = () =>{
    let [message, setMessage] =  React.useState<String | null>(null);
   return(
          <div>
                 <h2>Create New Assignment</h2>
                <span className="red">{message}</span>
                {/* <form onSubmit={}>   */}
                    <form>
                    
                        <div>
                        <label>Classname:</label>
                          {/*Drop down to pick an existing class*/}
                        </div>
                      
                        <div>
                        <label>Students:</label>
                         {/* check box to select all students or few */}
                         </div>  

                        <div> 
                        <label>Date Assigned:</label>
                          {/* Assign todays date or later */}
                        </div>
                        
                        <div>
                        <label>Due Date:</label> 
                            {/* Assign todays date or later */} 
                        </div>
                         

                        <button type="submit">Add Assignment</button>
                    </form>
          </div>
        )
    }

export default NewHW 