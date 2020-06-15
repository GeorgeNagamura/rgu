import React from 'react'

function SafeArea(props) {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    )
}

export default SafeArea 
