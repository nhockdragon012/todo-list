export const initState = {
    input: '',
    jobs: [],
    editInput: {
        edit: false,
        index: ''
    }
}

export default function reducer (state = initState, action) {
    let newState;
    switch (action.type) {
      case 'SET_JOB':
        newState = {
          ...state,
          input: action.payload
        }
      break;
      case 'ADD_JOB':
        newState = {
          ...state,
          jobs: [...state.jobs, action.payload]
        }
      break;
      case 'DEL_JOB':
        const newJobs = [...state.jobs]
        newJobs.splice(action.index, 1)
        newState = {
          ...state,
          jobs: newJobs
        }
      break;
      case 'EDIT_INPUT': 
        state.editInput.edit = action.payload
        state.editInput.index = action.index
        newState = {
            ...state
        }
      break;
      case 'EDIT_JOB':
        const newEditJobs = [...state.jobs]
        newEditJobs[action.index] = action.payload
        newState = {
          ...state,
          jobs: newEditJobs
        }
      break;
      default:
        return state
    }
    return newState
}