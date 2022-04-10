import {useEffect, useReducer, useRef} from 'react'
import './App.css'
import deleteIcon from './assets/delete.png'
import noteIcon from './assets/note.png'
import check from './assets/check.png'

//import reducer
// import reducer, {initState} from './Components/reducer'
// import {setJob, addJob, delJob, editJob, isEditJob} from './Components/actions'

function App() {
  const handleJSON = () => JSON.parse(localStorage.getItem('jobs'))
  const initState = {
    input: '',
    jobs: handleJSON() ?? [],
    isEdit: false,
    isIndex: ''
  }
  const SET_JOB = 'SET_JOB';
  const ADD_JOB = 'ADD_JOB';
  const DEL_JOB = 'DEL_JOB';
  const EDIT_JOB = 'EDIT_JOB';
  const IS_EDIT = 'IS_EDIT';

  const setJob = payload => {
    return {
      type: SET_JOB,
      payload
    }
  }
  const addJob = payload => {
    return {
      type: ADD_JOB,
      payload
    }
  }
  const delJob = index => {
    return {
      type: DEL_JOB,
      index
    }
  }
  const editJob = (payload, index) => {
    const newJobs = [...state.jobs]
    newJobs[index] = payload
    return {
      type: EDIT_JOB,
      newJobs
    }
  }
  const isEditJob = (target, index) => {
    if(index === Number(target.parentNode.dataset.index) && state.jobs[index] !== '') {
      state.isEdit = !state.isEdit
      state.isIndex = index
    }
    if(state.jobs[index] === ''){
      alert('Sửa lại công việc không được để trống')
    }
    return {
      type: IS_EDIT,
      index
    }
  }
  const reducer = (state, action) => {
    let newState;
    switch (action.type) {
      case SET_JOB:
        newState = {
          ...state,
          input: action.payload
        }
      break;
      case ADD_JOB:
        newState = {
          ...state,
          jobs: [...state.jobs, action.payload]
        }
      break;
      case DEL_JOB:
        const newJobs = [...state.jobs]
        newJobs.splice(action.index, 1)
        newState = {
          ...state,
          jobs: newJobs
        }
      break;
      case EDIT_JOB:
        newState = {
          ...state,
          jobs: action.newJobs
        }
      break;
      case IS_EDIT:
        newState = {
          ...state
        }
      break
      default:
        throw new Error('Invalid Action')
    }
    return newState
  }
  const [state, dispatch] = useReducer(reducer, initState)

  const {input, jobs, isIndex, isEdit} = state
  const inputRef = useRef()

  //Handle
  const handleSubmit = () => {
    if(input){
      dispatch(addJob(input))
      dispatch(setJob(''))
      inputRef.current.focus()
    }
  }
  const handleEditJob = (target, index) => {
    dispatch(isEditJob(target, index))
  }
  // Delay Handle
  useEffect(() => {
    isEdit && document.querySelector('.input-edit-title').focus()
  },[isEdit])
  useEffect(() => {
    const jobsJSON = JSON.stringify([...jobs])
    localStorage.setItem('jobs', jobsJSON)
  },[jobs])
  
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
                {isEdit && i === isIndex
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
                  src={isEdit && i === isIndex ? check  : noteIcon} 
                  className="icon-note" 
                  alt="note.png"
                  onClick={(e) => handleEditJob(e.target, i)}
                ></img>
            </li>
          })}
        </ul>
        </div>
    </div>
  );
}

export default App;
