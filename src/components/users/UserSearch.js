import { useContext, useState } from "react"
import AlertContext from "../../context/alert/AlertContext";
import GithubContext from "../../context/github/GithubContext";
import { fetchUsers } from "../../context/github/GithubActions";

function UserSearch() {
  const { users, dispatch } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);
  const [text, setText] = useState('');

  const handleOnChange = (event) => {
    setText(event.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(text === ''){ 
      setAlert('Please enter something', 'error') 
    } else {
      dispatch({type: 'SET_LOADING'})
      const usersRes = await fetchUsers(text);
      dispatch({
        type: 'GET_USERS',
        payload: usersRes
      });

      setText('');
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form className="form-control" onSubmit={handleSubmit}>
          <div className="relative">
            {text !== undefined && <input 
              type='text' 
              value={text}
              onChange={handleOnChange}
              className='w-full pr-40 bg-gray-200 input input-lg text-black' 
              placeholder="Search"/>}
            
            <button type='submit' className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">Go</button>
          </div>
        </form>
      </div>
      {
        users.length > 0 && 
        <div>
          <button onClick={() => dispatch({type: 'CLEAR_USERS'})} className="btn btn-ghost btn-lg">
            Clear
          </button>
        </div>
      }
    </div>
  )
}

export default UserSearch