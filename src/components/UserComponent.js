import React from 'react'
import UserService from '../services/UserService'
import axios from 'axios';


class UserComponet extends React.Component{
    constructor(){

        super();
        this.state = {

            users:[]

        };


    }
    componentDidMount(){

        axios.get('http://localhost:8080/api/personas/all')
        .then(res => {
          const persons = res.data;
          this.setState({ users:persons });
        })



    }
    render(){
        return(

            <div>
                    <h1 className="text-center"> Lista de personas</h1>
                    <table className = "table table-striped">
                        <thead>
                            <tr>
                            <td>Id</td>
                            <td>nombre</td>
                            <td>apellido</td>
                            <td>identificador</td>
                            <td>especializacion</td>
                            <td>estado</td>
                            </tr>


                        </thead>
                        <tbody>
                                        {
                                        this.state.users.map(

                                            user =>
                                            <tr key = {user.idPersona}>
                                                <td> {user.idPersona}</td>
                                                <td>  {user.nombre}</td>
                                                <td>  {user.apellido}</td>
                                                <td>  {user.identificador}</td>
                                                <td>  {user.especializacion}</td>
                                                <td>  {user.estado}</td>
                                            </tr>


                                        )
                                        }

                        </tbody>


                    </table>

            </div>



        )


    }

}
export default  UserComponet;
