import React from 'react'

//const id= props.id - color+num?
//const type = props.type - color

function Piece(props) {
    const color = props.player === 2? "green": "yellow"
    const style = {
        backgroundColor: color
    }
    return (
        <div className="piece" type={props.player} style={style}>
            
        </div>


    )
}
export default Piece
