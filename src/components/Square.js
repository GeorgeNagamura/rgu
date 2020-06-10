import React, { Component } from 'react'

export class Square extends Component {
    selectMove = () => {
        console.log(this.props.hnum)
        this.props.selectMove(this.props.hnum)
    }
    
    render() {
        return (
            <div style={{height: "100px", 
                        width: "100px", 
                        backgroundColor: "beige", 
                        border: "solid", 
                        borderColor:"black"}} 
                    onClick={this.selectMove.bind(this)}>
                {this.props.occupied}
            </div>
        )
    }
}

export default Square
