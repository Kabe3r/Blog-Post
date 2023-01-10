import React, { useEffect, useReducer, useContext, useState } from "react";
import Reducer from "./Reducer";
import { SEARCH_OPEN, SEARCH_CLOSE } from "./Actions";

const INITIAL_STATE = {
      user: JSON.parse(localStorage.getItem("user")) || null,
      isFetching: false,
      error: false,
      isSearchOpen: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
      const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
      const [blog, setBlog] = useState([]);
      const [page, setPage] = useState(0);

      useEffect(() => {
            localStorage.setItem("user", JSON.stringify(state.user));
      }, [state.user]);

      const handlePage = (index) => {
            setPage(index);
      }

      const openSearch = () => {
            dispatch({ type: SEARCH_OPEN });
      }

      const closeSearch = () => {
            dispatch({ type: SEARCH_CLOSE });
      }         

      return (

            <AppContext.Provider
                  value={{
                        user: state.user,
                        isFetching: state.isFetching,
                        error: state.error,
                        search: state.search,
                        isSearchOpen: state.isSearchOpen,
                        openSearch,
                        closeSearch,
                        dispatch,
                        handlePage,
                        blog,
                        setPage,
                        setBlog,
                        page,
                  }}
            >
                  {children}
            </AppContext.Provider>
      )
} 

export const useGlobalContext = () => {
      return useContext(AppContext);
}

export { AppContext, AppProvider }