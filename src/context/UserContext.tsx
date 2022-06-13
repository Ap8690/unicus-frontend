import { createContext, useState } from "react";

export type UserContextType = {
	isLogin: boolean | null
	setIsLogin: (value: boolean) => void;
}
export const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({children}) => {
  const [isLogin, setIsLogin] = useState(false)
  
  return(
      <UserContext.Provider value={{ isLogin, setIsLogin }}>
          {children}
      </UserContext.Provider>
  )
}