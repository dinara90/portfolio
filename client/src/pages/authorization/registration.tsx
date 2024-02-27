import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import { Link } from 'react-router-dom';
import {PATH} from '../../constants/paths';
import authImg from '../../assets/images/auth.jpg'


const Registration: FC = () => {
    const [username, SetUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);

    return (
    <div className='authorization'>
      <img src={authImg} width={'25%'}></img>
      <div className='authForm'>
      <div>
        <h2>Create a new account</h2>
      </div>
      <div>
        <form action="javascript:void(0);" method="POST">
        <div className='inputField'>
            <label htmlFor="username" >Username</label>
            <div ><input id="username" name="username" type="text" autoComplete="text" onChange={e => SetUsername(e.target.value)}/>
            </div>
          </div>

          <div className='inputField'>
            <label htmlFor="email" >Email address</label>
            <div ><input id="email" name="email" type="email" autoComplete="email" onChange={e => setEmail(e.target.value)}/>
            </div>
          </div>
    
          <div className='inputField'> 
            <div>
              <label htmlFor="password">Password</label>
            </div>
            <div ><input id="password" name="password" type="password" autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}/>
            </div>
          </div>
    
          <div>
            <button type="submit" onClick={() => store.registration(username, email, password)}>Sign up</button>
          </div>
        </form>
    
        <p>
        Already have an account?
          <Link to={PATH.LOGIN} >Sign in</Link>
        </p>
      </div>
      </div>


      {/* <div>
            <input
                
                value={email}
                type="text"
                placeholder='@email'
            />
            <input
                value={password}
                type="password"
                placeholder='Password'
            />
            <button >
                Login
            </button>
            <button onClick={() => store.registration(email, password)}>
                Registration
            </button>
        </div> */}
    </div>        
    );
};

export default observer(Registration);