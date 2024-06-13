import '../output.css'
import { useEffect, useState } from 'react';
function Todo() {

  const [info, setInfo] = useState({
    name: 'daniel',
    email: 'ccc',
    pictureURL: ""
  });
  // change back to false
  const [formDone, setFormDone] = useState(false);
  const [showForm,setShowForm] = useState(false);
  const [showdoneTodo,setShowTodo] = useState(false)
  const [error, showError] = useState(false);
  const [showId,setShowid] = useState(false)
  const [todo, setTodo] = useState({
    done: false,
    name: "",
    description: "",
    date: ""
  });
  const [done,AddDone] = useState([]);
  function handleDone (idSent){
     todos.map((data)=>{
      data.id === idSent ? AddDone([...done,data]):''
     });
  }
  console.log('done',done)
  const shortenDesc = (description) => {
    if (description.length >= 20) {
      return description.slice(0, 25) + '....'
    } else {
      return description;
    }
  }
  const [editId, setEditid] = useState(false);
  const[show,setShow] = useState(false)
  const [todos, setTodos] = useState([]);
  const handleTodo = (e) => {
    setTodo({
      ...todo, [e.target.name]: e.target.value, id: Date.now(),
    })
  }
  console.log(todo.description.length)
  console.log(todos)
  function handleDelete(idSent) {
    const newVal = todos.filter((data) => {
      return data.id !== idSent
    });
    setTodos([...newVal]);
  }
  console.log(todos);
  useEffect(() => {
    if (!editId) return;
    let selectedElement = document.querySelectorAll(`[id='${editId}']`)
     selectedElement[0].focus();
  }, [editId]);
  function handleEdit (id,updated){
  const newVal = todos.map((data)=>{
    if(data.id === id){
       return {...data,...updated}
    }else{
      return data
    }
  });
  setTodos([...newVal])
  }
const View = ()=>{
   return todos.map((data)=>{
      return data.id === showId ? <div className='absolute w-[100%] text-center px-4 py-5 bg-slate-200 h-[20em] rounded'>
        <h1 className='font-bold text-slate-500'>Title:</h1>
      <p className='text-xl  border-b-2 border-b-white mb-5'>{data.name}</p>
      <h1 className='font-bold text-slate-500'>fulfill date:</h1>
      <p className='text-xl mt-2 pb-3  border-b-2 border-b-white mb-5'>{data.date}</p>
      <h1 className='font-bold text-slate-500'>Description</h1>
      <p className='text-xl mt-2 pb-3  border-b-2 border-b-white mb-5'>{data.description}</p>
       <button onClick={()=>{setShow(false)}} className='bg-blue-500 px-3 h-[2em] rounded '>Back</button>
      </div> :''
    });
}
  return (
    <>
      {!formDone && <form className=" flex flex-col items-center w-[80%] rounded-[.2em] py-4 shadow-xl shadow-blue-200 h-[30em] bg-blue-500 mx-auto mt-4">

        <h1 className="text-white  font-semibold border-b-2 mx-auto w-[max-content] text-3xl pb-2 text-center">sign up</h1>
        <div className="w-[80%] mt-5">
          <label className="block text-md font-semibold text-white" htmlFor="name">Name</label>
          <input required className="focus:outline-1 pl-2 text-black focus:outline-blue-300 bg-blue-200 mt-1 mb-3 w-full rounded  h-[3em]" id="name" name="name" onChange={(e) => { setInfo({ ...info, name: e.target.value }) }} type="text" />
          <label className="block text-md font-semibold text-white" htmlFor="email">Email</label>
          <input required className="focus:outline-1 pl-2 text-black focus:outline-blue-300 bg-blue-200 mt-1 mb-3 w-full rounded  h-[3em]" id="name" name="name" onChange={(e) => { setInfo({ ...info, email: e.target.value }) }} type="text" />


          <label className=" block mb-2 text-md font-semibold text-white" htmlFor="pic">Picture <span className="text-gray-200">optional*</span></label>
          <input className="w-[8em] text-white" id="pic" onChange={(e) => {
            const imgUrl = URL.createObjectURL(e.target.files[0])
            setInfo({ ...info, pictureURL: imgUrl });
          }} name="picture" type="file" />
        </div>
        <button onClick={() => {
          if (info.name && info.email) {
            setFormDone(true)
          } else {
            showError(true);
            setTimeout(() => {
              showError(false)
            }, 3000);
          }
        }} className="bg-blue-600 py-2 mt-10 rounded px-4 text-white font-semibold">submit</button>
        {error && <div className="z-50 absolute border border-red-400 top-[14em] bg-white px-3 py-4 rounded text-red-600">
          <p>please fill out all the required stuff !</p>
        </div>}
      </form>}

      {formDone && <div className="bg-slate-50 h-full pb-3">
        <div className="bg-blue-500 flex justify-center items-center w-full h-[3.5em]">
          <p className="text-white font-semibold text-3xl">Todo App</p>
        </div>
        <img className="w-[9em] mt-3 mx-auto object-cover bg-gray-200 rounded" src={info.pictureURL} alt="" />
        <p className="text-center mt-2 font-semibold">Welcome, {info.name}</p>
         <div className='w-full items-center justify-center mt-3 flex flex-wrap gap-3 px-2'>
         <div className='w-[8em] px-5 pt-4 h-[8em] bg-slate-300 rounded'>
          <p className='font-bold text-slate-100'>your Todos:</p>
          <p className='text-7xl text-slate-100'>{todos.length}</p>
         </div>
         <div className='w-[8em] px-5 pt-4 h-[8em] bg-slate-300 rounded'>
          <p className='font-bold text-slate-100'>start a todo</p>
          <p onClick={()=>setShowForm(!showForm)} className='text-xl bg-blue-600 px-2 py-1 rounded mt-2 text-slate-100'>{!showForm?'open':'close'} todo</p>
         </div>
         <div className='w-[8em] px-5 pt-4 h-[8em] bg-slate-300 rounded'>
          <p className='font-bold text-slate-100'>Done Todos:</p>
          <p className='text-5xl text-slate-100'>{done.length}</p>
         </div>
         <div className='w-[10em] grid place-content-center px-5 gap-2 h-[10em] bg-slate-300 rounded'>
          <button className='bg-blue-500 px-2 rounded py-3 text-sm text-white font-semibold'>my todos</button>
          <button className='bg-blue-500 px-2 rounded py-3 text-sm text-white font-semibold' onClick={()=>{setShowTodo(!showdoneTodo)}}>done todos</button>
          <button className='bg-blue-500 px-2 rounded py-3 text-sm text-white font-semibold'>download todos</button>

         </div>
         </div>
         {showdoneTodo && <div className='mx-auto w-[70%] mt-4 ppx-4 bg-slate-400'>
        <p className='font-bold text-xl text-center'>Done todos</p>
         {done.map((data)=>{
          return <p className='text-center text-white mt-2 rounded' key={data.id}>{data.name}</p>
         })}
         {done.length === 0 ? <p className='text-white text-center'>no done todos!</p>:''}
        </div>}

        {showForm &&
          <div><p className="text-center mt-2 font-semibold">start a todo.</p>
        <div className="flex  rounded mt-3 py-4  flex-col bg-slate-200 w-[80%] mx-auto items-center">
          <label className="labels" htmlFor="name">Name</label>
          <input placeholder='your todo title' value={todo.name} className="inp" onChange={handleTodo} name="name" id="name" type="text" />
          <label className="labels" htmlFor="Date">Date</label>
          <input value={todo.date} className="inp" onChange={handleTodo} name="date" id="Date" type="date" />
          <label className="labels" htmlFor="description">description</label>
          <input placeholder='your todo description' value={todo?.description} className="inp" onChange={handleTodo} name="description" id="description" type="text" />
          <button className="bg-blue-600 text-white font-semibold px-3 py-3 rounded mt-4" onClick={() => {
            if (todo.name && todo.date && todo.description) {
              setTodos([...todos, todo])
            } else {
              alert('pls complete the info')
            }
            setTodo({
              name: "",
              date: "",
              description: ''
            })
          }}>Add</button>

        </div></div>}

        <p className="text-center mt-6 font-bold mb-2 text-2xl">Todos</p>
        <div className='flex  flex-row flex-wrap gap-3'>
          {todos.map((todo) => {
            return <div className="relative px-6 py-3 w-[19em] h-[19em] bg-white rounded shadow" key={todo.id}>
              <h1 className="text-slate-300 font-bold text-sm">Title:</h1>
              <span onBlur={(e)=>handleEdit(todo.id,{name:e.target.innerText})} className='text-xl ' contentEditable={editId === todo.id} id={todo.id}>{todo.name}</span>
              <h1 className="mt-4 text-slate-300 font-bold text-sm">Date to fulfil:</h1>
              <p onBlur={(e)=>handleEdit(todo.id,{date:e.target.innerText})} className='text-xl' contentEditable={editId === todo.id} id={todo.id}>{todo.date}</p>
              <h1 className="text-slate-300 mt-5 font-bold text-sm">Description:</h1>
              <p onBlur={(e)=>handleEdit(todo.id,{description:e.target.innerText})} contentEditable={editId === todo.id} id={todo.id} className='mb-8 border border-blue-200 px-2 mt-2'>{shortenDesc(todo.description)}</p>
              <div className='div'>
                <button className="prop bg-red-600" onClick={() => handleDelete(todo.id)}>delete</button>
                <button className="prop bg-slate-500" onClick={() => setEditid(todo.id)}>edit</button>
                <button className="prop bg-green-300" onClick={()=>{setShow(!show);setShowid(todo.id)}}>View</button>
                <button className="prop bg-pink-500" onClick={()=>handleDone(todo.id)}>Done?</button>
              </div>
              <div>
              </div>
            </div>
          })}
              {show&&<View />}


        </div>


      </div>}
    </>
  )
}

export default Todo;
