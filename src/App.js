import {useEffect, useRef, useState} from 'react'
import './App.css'
import deleteIcon from './assets/delete.png'
import noteIcon from './assets/note.png'
import check from './assets/check.png'
import {useSelector, useDispatch} from 'react-redux'
import {setJob, addJob, delJob, editJob, setEditInput} from './Redux/actions'

function App() {

  const {input, jobs, editInput} = useSelector(state => ({
    input: state.input,
    jobs: state.jobs,
    editInput: state.editInput
  }))
  const dispatch = useDispatch()
  const inputRef = useRef()
  
  //Handle
  const handleSubmit = () => {
    if(input){
      dispatch(addJob(input))
      dispatch(setJob(''))
      inputRef.current.focus()
    }
  }

  // Delay Handle
  useEffect(() => {
    editInput.edit && document.querySelector('.input-edit-title').focus()
  },[editInput.edit])

  return (
    <div id="App">
      <div className="todo-list">
        <input  
          ref={inputRef}
          className="input-job"
          placeholder='Nhập công việc tại đây...'
          value ={input}
          onChange={(e) => dispatch(setJob(e.target.value))}
        />
        <button className="submit" onClick={handleSubmit}>Thêm công việc</button>
        <div style={{clear:'both'}}></div>
        <ul className="list-job">
          {jobs && jobs.length > 0 && jobs.map((job, i) => {
            return <li className="job-item" key={i} data-index={i}>
                {editInput.edit && i === editInput.index
                  ? <input 
                      className="input-edit-title"
                      value={job}
                      onChange={e => dispatch(editJob(e.target.value, i))}
                    />
                  : <p className="title">{job}</p>
                }
                <img
                  src={deleteIcon} 
                  className="icon-delelte" 
                  alt="delete.png"
                  onClick={() => dispatch(delJob(i))}
                ></img>
                <img 
                  src={editInput.edit && i === editInput.index ? check  : noteIcon} 
                  className="icon-note" 
                  alt="note.png"
                  onClick={() => dispatch(setEditInput(!editInput.edit, i))}
                ></img>
            </li>
          })}
        </ul>
        </div>
    </div>
  );
}
export default App;
