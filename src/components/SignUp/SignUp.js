import React, {Component} from "react";
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import './SignUp.css'
import axios from '../../axios';

class SignUp extends Component{
    state={
        username: "",
        password: "",
        email: "",
        age: 0,
        name: "",
        lastname:""
    }
    onChangeUsername=(event)=>{
        this.setState({username:event.target.value})
    }
    onChangePassword=(event)=>{
        this.setState({password:event.target.value})
    }
    onChangeEmail=(event)=>{
        this.setState({email:event.target.value})
    }
    onChangeAge=(event)=>{
        this.setState({age:event.target.value})
    }
    onChangeName=(event)=>{
        this.setState({name:event.target.value})
    }
    onChangeLastName=(event)=>{
        this.setState({lastname:event.target.value})
    }
    onSubmitSignHeandler=(event)=>{
        event.preventDefault();
        axios.post('/register',{...this.state}).then(
            response=>{console.log(response)})
            .catch(err=>console.log(err));

    }

    render(){
        return(
            <form>
                <Input
              placeholder="username"
              styles={{marginRight:"5px",padding:"5px 3px"}}
              type="text"
              value={this.state.username}
              changed={this.onChangeUsername} 
            />
                <Input
              placeholder="password"
              styles={{marginRight:"5px",padding:"5px 3px"}}
              type="text"
              value={this.state.password}
              changed={this.onChangePassword} 
            />
                <Input
              placeholder="email"
              styles={{marginRight:"5px",padding:"5px 3px"}}
              type="email"
              value={this.state.email}
              changed={this.onChangeEmail} 
            />
                <Input
              placeholder="age"
              styles={{marginRight:"5px",padding:"5px 3px"}}
              type="text"
              value={this.state.age}
              changed={this.onChangeAge} 
            />
                <Input
              placeholder="name"
              styles={{marginRight:"5px",padding:"5px 3px"}}
              type="text"
              value={this.state.name}
              changed={this.onChangeName} 
            />
                <Input
              placeholder="lastname"
              styles={{marginRight:"5px",padding:"5px 3px"}}
              type="text"
              value={this.state.lastname}
              changed={this.onChangeLastName} 
            />
            <Button
            title="Submit"
            type="submit"
            classNameProps="Login"
            clicked={this.onSubmitSignHeandler}
            />
            </form>
        )
    }
}

export default SignUp;