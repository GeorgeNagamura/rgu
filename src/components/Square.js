import React  from 'react'
import Piece from './Piece'
import tile from '../img/tile.png'
import flower from '../img/flower.png'
import startY from '../img/start_yellow.png'
import startG from '../img/start_green.png'
import goalY from '../img/goal_yellow.png'
import goalG from '../img/goal_green.png'


function Square(props) {
    
    let t_selected = false 

    const handleClick = () => {

        props.tSelect(props.id, props.occupied, props.hnum)
        
    }
    
    let border = "solid 3px grey"
    let images = [tile, flower, startY, startG, goalY, goalG]
    let img = images[0]
    let style = {
        backgroundImage: `url(../img/tile.png)`
    }

    if (props.bg === "flower"){
        img=flower
    } else if(props.bg === "start_yellow"){
        img=startY
    } else if(props.bg === "start_green"){
        img=startG
    } else if(props.bg === "goal_yellow"){
            img=goalY
    } else if(props.bg === "goal_green"){
            img=goalG
    }

    t_selected = props.t_select[0] === props.id? true:false
    border = t_selected? "solid 3px red":"none"
    
    //background: bg_color,
    style = {
        
        backgroundImage: `url(${img})`,
        border: border
    }
    return (
        
        <div className={props.className} onClick={handleClick} style={style} >
            {props.occupied === 0? null: <Piece player={props.occupied}/>}        
        </div>
    )
}

export default Square
