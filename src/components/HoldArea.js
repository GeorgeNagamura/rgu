import React from 'react'

function HoldArea(props) {
    
    const handleClick = () => {

        props.movePiece(props.id, props.occupied, props.hnum)
        
    }

    return (
        <div className={props.className} onClick={handleClick}>
            {props.children}
        </div>
    )
}

export default HoldArea
