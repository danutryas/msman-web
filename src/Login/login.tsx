import { useContext } from 'react';
import './login.scss'
import AuthContext from '../Auth/Auth';


const LoginPage =  () => {
    const {setLoginAccount,login} = useContext(AuthContext)
    
    const onChangeInput = (e : any) => {
        setLoginAccount((account: any) => ({
            ...account,
            [e.target.name] : e.target.value
        }));
    }
    
    
  return (
    <div className='body-content'>
        <div className="login-card">
            <p className="logo">MSMAN</p>
            <div className="login-form">
                <div className="form-input">
                    <input type="text" name="username" id="username" placeholder='username' onChange={(e) => onChangeInput(e)}/>
                    <input type="password" name="password" id="password" placeholder='password'onChange={(e) => onChangeInput(e)}/>
                </div>
                <div className="form-submit">
                    <form>
                        <button type="submit" onClick={(e) => login(e)}>
                            LOGIN
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default LoginPage;