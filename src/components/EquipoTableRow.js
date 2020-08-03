import React from 'react';
import {slideDown,slideUp} from '../services/anim';
import '../services/style.css'
import { render } from 'react-dom';


class EquipoTableRow extends React.Component{
    state = { expanded: false }

    toggleExpander = (e) => {
    
    
        if (!this.state.expanded) {
          this.setState(
            { expanded: true },
            () => {
              if (this.refs.expanderBody) {
                slideDown(this.refs.expanderBody);
              }
            }
          );
        } else {
          slideUp(this.refs.expanderBody, {
            onComplete: () => { this.setState({ expanded: false }); }
          });
        }
      }


      render() {
        const { equipos } = this.props;


        return [
          <tr key={equipos.idEquipo} onClick={this.toggleExpander}>

                <td> {equipos.idEquipo}  </td>
                <td> {equipos.nameEquipo}</td>
                <td> {equipos.director}</td>
                <td> {equipos.integrantes} </td>
          </tr>,

        this.state.expanded && (
          <tr className="expandable" key="tr-expander"> 
          <td className="uk-background-muted" colSpan={6}>
            <div ref="expanderBody" className="inner uk-grid">
            
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
            <tbody>{
              


                  <tr key={equipos.personas.idPersona} onClick={this.toggleExpander}>
                  <td> {equipos.personas.idPersona}  </td>
                    <td> {equipos.personas.nombre}  </td>
                    <td> {equipos.personas.apellido}</td>
                    <td> {equipos.personas.identificador}</td>
                    <td> {equipos.personas.especializacion}</td>
                    <td> {equipos.integrantes} </td>
                  </tr>

                    }

           </tbody>

            </div>
            </td>
        </tr>)
        ];
      }

}

export default EquipoTableRow;