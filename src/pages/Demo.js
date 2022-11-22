import { useEffect, useContext } from 'react'
import { useNavigate  } from 'react-router-dom';
import { CredentialsContext, CurrencyContext } from '../App';

export default function Demo() {
    const [, setCredentials] = useContext(CredentialsContext);
    const [, setCurrency] = useContext(CurrencyContext);

    const navigate  = useNavigate();

    useEffect(() => {
        // login demouser
        setCredentials({
        username: "demouser",
        password: "$2b$10$cgrf7pkSFOKBAfsCa9aFe.IjK/CiCx5NrrjUb.uoO/fJJBOG/Hi2i",
        });
        localStorage.setItem('user', JSON.stringify({
        username: "demouser",
        password: "$2b$10$cgrf7pkSFOKBAfsCa9aFe.IjK/CiCx5NrrjUb.uoO/fJJBOG/Hi2i",
        }))
        
        // handle currency settings on load -> set global variable and save in localStorage
        setCurrency("USD");
        localStorage.setItem('currency', "USD");

        navigate("/stocks");
    
    }, [navigate, setCredentials, setCurrency])
    
    
    return (
       null
    )
}
