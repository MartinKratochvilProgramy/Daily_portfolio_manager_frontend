import { useEffect, useContext } from 'react'
import { useNavigate  } from 'react-router-dom';
import { CredentialsContext, CurrencyContext } from '../App';
import Cookies from 'universal-cookie';

export default function Demo() {
    const [, setCredentials] = useContext(CredentialsContext);
    const [, setCurrency] = useContext(CurrencyContext);

    const navigate  = useNavigate();

    useEffect(() => {
        // login demouser
        setCredentials({
            username: "demouser",
        });
        localStorage.setItem('user', JSON.stringify({
            username: "demouser",
        }))
        
        // handle currency settings on load -> set global variable and save in localStorage
        setCurrency("USD");
        localStorage.setItem('currency', "USD");

        const cookies = new Cookies();
        cookies.set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGZhZjA5NTUwMjZlMzJjMzZkNzkyNiIsImlhdCI6MTY3MTM4MjQ3NywiZXhwIjoxNjcxMzg2MDc3fQ.obKwSXlL_GrbUr-KdyyhZDeNyPsyB3_srNv_M2Pd9AA", { path: '/', maxAge: 6000 });

        navigate("/stocks");
    
    }, [navigate, setCredentials, setCurrency])
    
    
    return (
       null
    )
}
