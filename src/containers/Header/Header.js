import React,{Component} from 'react';
import './Header.css';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

class Header extends Component{
    state={
            username:"",
            password:"",
            signUp:false
    }
    onChangeUsername=(event)=>{
        this.setState({username:event.target.value})
    }
    onChangePassword=(event)=>{
        this.setState({password:event.target.value})
    }
    onLoginHandler=(event)=>{
        event.preventDefault();
        const userData={
            username:this.state.username,
            onChangePassword:this.state.password
        }
    }
    onSignUpHandler=(event)=>{
       this.setState({
           signUp:true
       })
    }
    render(){
        const buttons=<form>
            <Input
             placeholder="username"
             styles={{marginRight:"5px",padding:"3px"}}
             type="text"
             value={this.state.username}
             changed={this.onChangeUsername} 
            />
            <Input
             placeholder="password"
             styles={{marginRight:"5px",padding:"3px"}}
             type="password"
             value={this.state.password}
             changed={this.onChangePassword} 
            />
            <Button
            title="Login"
            type="submit"
            classNameProps="Login"
            clicked={this.onLoginHandler}/>
             <Button
            title="Sign Up"
            type="button"
            classNameProps="Login"
            clicked={this.onSignUpHandler}/>
            </form>
        return(
            <div className="Header">
                <div className="Buttons">
                {buttons}
                </div>
            </div>
        )
    }
}

export default Header;