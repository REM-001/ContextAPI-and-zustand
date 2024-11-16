import React, { useContext} from 'react'
import { useUserStore } from '../contexts/zustand/useUserStore'
//import { UserContext } from '../contexts/context API/userContext'


const Content = () => {
  // context
  //const {user, handleLogin, handleLogout} = useContext(UserContext);
  
  //zustand
  const {user, handleLogin, handleLogout} = useUserStore();

  return (
    <div>
      {!user.isLog && ( 
        <button onClick={handleLogin}>Login</button>
      )}

      {user.isLog && ( 
        <div>
          <p>{user.msgLogin}</p>
          <button onClick={handleLogout}>Logout</button> 
        </div>
      )}
    </div>
  )
}

export default Content