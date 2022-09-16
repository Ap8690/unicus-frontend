import { createContext, useState } from "react";
import { IStore } from "../models/Store";
export type StoreContextType = {
	store: IStore;
	setStore: (value: IStore) => void;
}
export const StoreContext = createContext<StoreContextType | null>(null)

export const StoreProvider = ({children}) => {
  const [store, setStore] = useState<IStore>()
  return(
      <StoreContext.Provider value={{ store, setStore }}>
          {children}
      </StoreContext.Provider>
  )
}