

import { createContext, useState, useRef, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import Snackbar from "../components/Snackbar";

const iniitialCtxValue = {
    snackbar: {
        open: false,
        message: '',
        type: 'info',
    },
    showSnackbar: ({message, type = 'info', timeOut = 5000}) => {},
    hideSnackbar: () => {},
};

export const SnackbarContext = createContext(iniitialCtxValue);

const SnackbarProvider = ({children}) => {

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        type: 'info'
    });

    const timeoutRef = useRef();

    //? show snackbar
    const showSnackbar = useCallback(
        ({message, type = 'info', timeOut = 5000}) => {
            // clear any existing timeout to prevent overlap
            if(timeoutRef.current) clearTimeout(timeoutRef.current);

            // Set the new snackbar message and type 
            setSnackbar({ open: true, message, type });

            // Auto-hide the snackbar after timeout
            timeoutRef.current = setTimeout(() => {
                setSnackbar((prev) => { 
                    return { ...prev, open: false }
                 });
            }, timeOut);
        },[]
    );

    //! hide snackbar manually if needed
    const hideSnackbar = useCallback(() => {
        // clear any existing timeout to prevent overlap 
        if(timeoutRef.current) clearTimeout(timeoutRef.current);

        setSnackbar({ open: false, message: '', type: 'info' });
        
    }, []);

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(() =>{
        return {showSnackbar, hideSnackbar }
    }, [showSnackbar, hideSnackbar]);

    return (
        <SnackbarContext.Provider value={contextValue}>
            {children}

            <Snackbar snackbar={snackbar}/>
        </SnackbarContext.Provider>
    );
};

SnackbarProvider.PropTypes = {
    children: PropTypes.any,
};

export default SnackbarProvider;