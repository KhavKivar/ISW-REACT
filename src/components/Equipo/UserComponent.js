import React,{ useState, useEffect }from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';





function newPersona(data){
  axios.post('https://isw-nhr.herokuapp.com/api/personas', data )
  .then(res => {      
      const dd = res.data;
      console.log(dd);

    })  
}

function removePersona(id){
  axios.delete('https://isw-nhr.herokuapp.com/api/personas/delete/'+ id.toString())
  .then
  (
    res =>{
      console.log(res.data);
    }

  )


}

function editPersona(data){
  axios.put('https://isw-nhr.herokuapp.com/api/personas/edit/'+data.idPersona,data).then(

    res=>{
      console.log(res.data);
    }
  )


}

export default function MaterialTableDemo() {
    
  const [state, setState] = React.useState([

      {nombre: 'Romina', apellido: 'Vasquez',identificador: 13,especializacion: 'medico', 
     }
    ]);

  

  useEffect(() => {


    

    axios
      .get('https://isw-nhr.herokuapp.com/api/personas/all')
      .then(res => res.data)
      .then(res => setState({data:res}));
  },[]);





  return (
    <MaterialTable
      title="Personas"
      columns={ [
        {title: 'id', field:'idPersona',editable:'never'},
        { title: 'Nombre', field: 'nombre' },
        { title: 'Apellido', field: 'apellido' },
        { title: 'Identificador', field: 'identificador' },
        { title: 'Especializacion', field: 'especializacion' },
        { title: 'Estado',field:'estado'}
      
        ]}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                newPersona(newData);


                console.log(data);

                return {...prevState,data};
              });
            }, 600);
          }),

          onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  
                  editPersona(newData);

                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                removePersona(oldData.idPersona);

                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
    
      }}
    />
  );
}