import React, { useState, useEffect } from "react";


function App() {

  const [inputText, changeInputText] = useState("");
  const [listContent, setListContent] = useState([]);


  useEffect(() => {
    const savedContent = localStorage.getItem('savedContent');
    if (savedContent) {
      setListContent(JSON.parse(savedContent));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedContent', JSON.stringify(listContent));
  }, [listContent]);
  
  function handleChange(event){
    changeInputText(event.target.value)
    event.preventDefault();
  }
  function handleClick(event){
        event.preventDefault();
    if (inputText.trim() !== ""){
      setListContent(prevContent => [...prevContent, inputText])
    }
    
  }
  function deleteClick(index){
        setListContent(prevContent => {
                const updatedContent = [...prevContent];
                updatedContent.splice(index, 1);
                return updatedContent;
        })
        
  }
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List </h1>
        
      </div>
      <form  onSubmit={handleClick} className="form">
        <input 
        type="text" 
        value={inputText}
        onChange={handleChange}
        />
        <button type="submit">
          <span>Add</span>
        </button>
      </form>
      <div>
      <ul>
        {listContent.map((items, index) => 
        <div className="list">
                <li 
                style=
                {{textDecorationLine: 
                items.isDeleted ? "line-through": "none"}}>
                        {items} </li>
                <span className="del" 
                onClick={() => deleteClick(index)}>Del</span></div> )}
         
      </ul>
    </div>
    
    </div>
    
  );
}

export default App;
