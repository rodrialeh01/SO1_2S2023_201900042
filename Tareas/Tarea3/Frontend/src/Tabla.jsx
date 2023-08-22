import React from 'react';

class Tabla extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render(){
        var {cols} = []
        if(this.props.columnas != null){
            cols = this.props.columnas;
        }
        var {tuplas} = [];
        if(this.props.tuplas != null && this.props.tuplas != undefined)
            tuplas = this.props.tuplas;

        return (
            <form >  
                <div className="container">
                    <table className="table table-dark table-hover table-bordered">
                        <thead>
                            <tr>
                                {cols.map(col => (
                                    <th scope="col" key={col}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tuplas.map(tupla => (
                            <tr className="table-success">
                                {tupla.map(t => (
                                    <td>{t}</td>
                                ))}
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </form>
        )

    }
}

export default Tabla;