import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: { msgLogin: '', isLog: false }, 
  handleLogin: () => set({ 
    user: { 
      msgLogin: 'Welcome you have Logged in Successfully Mostafa',
      isLog: true
    }
  }),
  handleLogout: () => set({ 
    user: {
      msgLogin: 'You have just disconnected',
      isLog: false
    }
  })
}));

/*
 In this case, you're directly replacing the user object with a new one. 
 You don't need the previous state to calculate the new state. Therefore, 
 the simpler form of set is sufficient.
*/

// Modifying Existing State (example below)

/*
handleIncrementCounter: () => set((state) => ({
    user: { ...state.user, counter: state.user.counter + 1 } 
}))
*/