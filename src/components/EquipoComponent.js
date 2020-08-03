import React from 'react';
import axios from 'axios';
import EquipoTableRow from '../components/EquipoTableRow';


class EquipoComponent extends React.Component{

    constructor(){
        super();
        this.state = {

            equipos:[],
            personas:[]

        };
    }
    

    componentDidMount(){

        axios.get('http://localhost:8080/api/equipos/all')
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
                                        equipos.map((equipos,index)=>

                                        <EquipoTableRow key={index} index={index+1} equipos={equipos}/>

                                       
                                        )
                                        }

                        </tbody>

                    </table>

            </div>



        )


    }
}

export default  EquipoComponent;
