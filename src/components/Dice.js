import React, { Component } from 'react'

export class Dice extends Component {
    state = {
        rolled: null,
    }
    
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
        }
    rollDice = () => {
        let d1= this.getRandomInt(2)
        let d2= this.getRandomInt(2)
        let d3= this.getRandomInt(2)
        let d4= this.getRandomInt(2)
        this.setState({rolled: (d1+d2+d3+d4)})
        this.props.updateRoll(d1+d2+d3+d4)
    }

    render() {
        return (
            <div className="dice_area" style={{display: "flex", width: "800px", justifyContent: "center"}}>
                <h2>{this.state.rolled}</h2>
                <button onClick={this.rollDice.bind(this)}>Roll Dice</button>
            </div>
        )
    }
}

export default Dice
