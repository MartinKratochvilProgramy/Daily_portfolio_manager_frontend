import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../App';
import { useContext } from 'react';

export const useLogout = () => {
    const [, setCredentials] = useContext(CredentialsContext);
    const navigate = useNavigate();

    const cookies = new Cookies();
    const cookie = cookies.get('token');
    if (!cookie) {
        setCredentials(null);
        localStorage.setItem('user', null);
        navigate("/");
        //window.location.reload();
    }

    return;
}