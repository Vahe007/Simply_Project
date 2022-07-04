import { Alert, AlertTitle } from '@mui/material';
import { createContext, useContext, useState } from 'react';


const AlertsContext = createContext({});

export const AlertsContextProvider = ({children}) => {
    const [showAlertMessage, setAlertMessage] = useState(false);

    const configAlertContext = {
        value: {
            showAlertMessage, 
            setAlertMessage
        }
    }

    return (
              <AlertsContext.Provider {...configAlertContext}>
                {children}
              </AlertsContext.Provider>
           )
}

function AlertMessage(props) {
    const {severity, title, message, onClose} = props;

    return (
            <Alert severity= {severity} onClose={onClose}>

                <AlertTitle>
                    {title}
                </AlertTitle>

                {message}
            </Alert>            
    )
}



export default AlertMessage;

export const useAlertsContext = () => useContext(AlertsContext);
