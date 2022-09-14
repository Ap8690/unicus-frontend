import { createContext, useState } from "react";

export type UserContextType = {
	isLogin: boolean | null;
	setIsLogin: (value: boolean) => void;
  filter?: string | null;
  setFilter?: (value: string) => void;
}
export const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({children}) => {
  const [isLogin, setIsLogin] = useState(false)
  const [filter,setFilter] = useState('all')
  
  return(
      <UserContext.Provider value={{ isLogin, setIsLogin,filter,setFilter }}>
          {children}
      </UserContext.Provider>
  )
}