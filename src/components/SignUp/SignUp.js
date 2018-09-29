import React,{Component} from "react";
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

class SignUp extends Componenet{
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
        this.setState(email:event.target.value)
    }
    onChangeAge=(event)=>{
        this.setState({age:this.event.age})
    }
    onChangeName=(event)=>{
        this.setState({name:this.target.value})
    }
    onChangeLastName=(event)=>{
        this.setState({lastname:this.target.value})
    }
    onSubmitSignHeandler=(event)=>{
        event.preventDefault();
        
    }

    render(){
        return(
            <form>
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
              type="text"
              value={this.state.password}
              changed={this.onChangePassword} 
            />
                <Input
              placeholder="email"
              styles={{marginRight:"5px",padding:"3px"}}
              type="email"
              value={this.state.email}
              changed={this.onChangeEmail} 
            />
                <Input
              placeholder="age"
              styles={{marginRight:"5px",padding:"3px"}}
              type="number"
              value={this.state.age}
              changed={this.onChangeAge} 
            />
                <Input
              placeholder="name"
              styles={{marginRight:"5px",padding:"3px"}}
              type="text"
              value={this.state.name}
              changed={this.onChangeName} 
            />
                <Input
              placeholder="lastname"
              styles={{marginRight:"5px",padding:"3px"}}
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