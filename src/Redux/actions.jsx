const setJob = payload => {
  return {
    type: 'SET_JOB',
    payload
  }
}
const addJob = payload => {
  return {
    type: 'ADD_JOB',
    payload
  }
}
const delJob = index => {
  return {
    type: 'DEL_JOB',
    index
  }
}
const setEditInput = (payload, index) => {
    return {
        type: 'EDIT_INPUT',
        payload,
        index
    }
}

const editJob = (payload, index) => {
  return {
    type: 'EDIT_JOB',
    payload,
    index
  }
}
// const isEditJob = (target, index) => {
//   if(index === Number(target.parentNode.dataset.index) && state.jobs[index] !== '') {
//     state.isEdit = !state.isEdit
//     state.isIndex = index
//   }
//   if(state.jobs[index] === ''){
//     alert('Sửa lại công việc không được để trống')
//   }
//   return {
//     type: 'IS_EDIT',
//     index
//   }
// }
const isEditJob = index => {
    return {
        type: 'IS_EDIT',
        payload: index
    }
}

export {setJob, addJob, delJob, editJob, isEditJob, setEditInput}