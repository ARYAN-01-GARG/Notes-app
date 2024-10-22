import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

export const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [sessionId, setSessionId] = useState("");
    const [notes, setNotes] = useState([]);

    return (
        <UserContext.Provider value={{
            user, setUser,
            username, setUsername,
            email, setEmail,
            password, setPassword,
            sessionId, setSessionId,
            notes, setNotes,
        }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};