import { useState } from "react";
import "./SearchBox.css";

const SearchBox = () => {

    const [todos, setTodos] = useState([]);
    const [val,setVal] = useState("");

  const addTodos = () =>{
   
      if(val.trim() === ""){
        alert("add to dos please");
        return;
      }

      setTodos([...todos,val]);
      console.log(todos)
      setVal("");
  }


  const dltTodos = ({index}) =>{
     
     setTodos(todos.filter((_,i)=> i != index));
  }

    
  return (
    <div className="todo-app">

  <div className="todo-input">
    <input
      type="text"
      placeholder="Enter a todo"
      className="todo-field"
      value={val}
      onChange={(e)=>setVal(e.target.value)}
    />
    <button className="todo-btn" onClick={()=>addTodos()}>Add</button>
  </div>


  <ul className="todo-list">
    
   
      {todos.map((item,index) =>(
        <li className="todo-item" key={index}>

            <span className="todo-text">{item}</span>
            <button className="dlt-btn" onClick={()=>dltTodos({index})}>X</button>
        </li>
        
      ))
        
      }
  

   
  </ul>
</div>

  );
};

export default SearchBox;
