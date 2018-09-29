import React,{Component} from 'react';
import './Layout.css';
import Header from '../Header/Header';

class Layout extends Component{
    render(){
        return(
            <div>
                <Header/>
                <main>
                    {this.porps.children}
                </main>
            </div>
        )
    }
}

export default Layout;