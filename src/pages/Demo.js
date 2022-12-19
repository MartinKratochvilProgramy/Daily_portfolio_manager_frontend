import { useEffect, useContext } from 'react'
import { useNavigate  } from 'react-router-dom';
import { CredentialsContext, CurrencyContext } from '../App';
import Cookies from 'universal-cookie';
import LoadingSpinner from '../components/LoadingSpinner';
import { serverRoute } from '../serverRoute';
import { handleErrors } from './Login';

export default function Demo() {
    const [, setCredentials] = useContext(CredentialsContext);
    const [, setCurrency] = useContext(CurrencyContext);

    const navigate  = useNavigate();

    useEffect(() => {

        fetch(serverRoute + `/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "demouser",
                password: "demouser",
            }),
        })
            .then(handleErrors)
            .then(async (res) => {
                const json = await res.json();
                // set user in localStorage
                const username = json.username;
                const password = json.password;
                setCredentials({
                    username,
                    password,
                });
                localStorage.setItem('user', JSON.stringify({
                    username,
                    password
                }))

                // handle currency settings on load -> set global variable and save in localStorage
                setCurrency(json.settings.currency);
                localStorage.setItem('currency', json.settings.currency);

                const cookies = new Cookies();
                cookies.set('token', json.token, { path: '/', maxAge: 6000 });

                navigate("/stocks");
            })

    }, [navigate, setCredentials, setCurrency])
    
    
    return (
        <div className='flex justify-center items-center h-screen'>
            <LoadingSpinner size={64} />
        </div>
    )
}
