import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import { Link } from 'react-router-dom';
import {PATH} from '../../constants/paths';
import authImg from '../../assets/images/auth.jpg'

const Login: FC = () => {
    const [username, SetUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);

    return (<div className='authorization'>
    <img src={authImg} width={'25%'}></img>
      <div className='authForm'>
      <div>
        <h2>Login account</h2>
      </div>
      <div>
        <form action="javascript:void(0);" method="POST">
          <div>
            <div ><input id="email" placeholder='Email address' type="email" autoComplete="email" onChange={e => SetUsername(e.target.value)}/>
            </div>
          </div>
    
          <div>
            <div ><input id="password" placeholder='Password' type="password" autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}/>
            </div>
          </div>
    
          <div>
            <button type="submit" onClick={() => username.includes('@') ?
            store.loginEmail(username, password)
          : store.loginUsername(username,password)
          }>Sign in</button>
          </div>
        </form>
    
        <p>
        New user?
          <Link to={PATH.REGISTER} >Create an account</Link>
        </p>
      </div>
      </div>



      
    </div>
    );
};

export default observer(Login);