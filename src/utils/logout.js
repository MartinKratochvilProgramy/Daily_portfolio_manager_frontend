import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();

const logout = () => {
    navigate("/login");
}