import React from 'react';
import axios from 'axios';



class EquipoComponent extends React.Component{

    constructor(){
        super();
        this.state = {

            equipos:[],
            personas:[]

        };
    }
    

    componentDidMount(){

        axios.get('https://isw-nhr.herokuapp.com/api/equipos/all')
        .then(res => {
          const persons = res.data;
          this.setState({ equipos:persons});
        })
    }


    render(){
        const {equipos} = this.state;
        const isLoading = equipos.length === 0;
        return(

            <div>
                    <h1 className="text-center"> Lista de equipos </h1>
                    <table className = "table table-striped">
                        <thead>
                            <tr>
                            <td>Id Equipo</td>
                            <td>Nombre Equipo</td>
                            <td>Medico a cargo</td>
                            <td>Integrantes  </td>
                            </tr>
                        </thead>
                        <tbody>
                                        {
                                            
                                            this.state.equipos.map(

                                                user =>
                                                <tr key = {user.idEquipo}>
                                                     <td>  {user.idEquipo}</td>
                                                    <td> {user.nameEquipo   }</td>
                                                    <td>  {user.director}</td>
                                                    <td>  {user.integrantes}</td>
                                                </tr>
    
    
                                            )
                                        
                                        }

                        </tbody>

                    </table>

            </div>



        )


    }
}

export default  EquipoComponent;