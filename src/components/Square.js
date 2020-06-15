import React  from 'react'
import Piece from './Piece'

function Square(props) {
    
    let t_selected = false 

    const handleClick = () => {

        props.tSelect(props.id, props.occupied)
        
    }
    
    let bg_color = "grey"
    let style = {
        
    }

    
    
    t_selected = props.t_select[0] === props.id? true:false
    bg_color = t_selected? "blue":"grey"
    
    style = {
        background: bg_color
    }
    return (
        
        <div className={props.className} onClick={handleClick} style={style} >
            {props.occupied === 0? props.content: <Piece player={props.occupied}/>}        
        </div>
    )
}

export default Square
