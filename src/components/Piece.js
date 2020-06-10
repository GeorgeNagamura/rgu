import React, { Component } from 'react'

export class Piece extends Component {
    state = {
        selected: false,
        piece_selected: this.props.pselected,
        
    }
    /*
    Este componente tem só que registrar que foi clicado. O resto das informações, tem que receber de cima
    
    select = () => {
        
        (parseInt(this.props.player, 10) === this.props.turn?
            !this.state.selected?
                this.props.num !== this.state.piece_selected?
                    this.setState({selected: !this.state.selected, piece_selected: this.props.num}):
                    console.log('multiple')
                
                : this.props.num === this.state.piece_selected?
                    this.setState({selected: false, piece_selected: null}):
                    console.log("multiple")
                
                
        :  console.log("not your turn"))
        this.props.select(this.props.num)
    }*/
    
    select = () => this.props.select(this.props.num, this.props.player)

    render() {
        return (
            <div>
                <button onClick={this.select.bind(this)}>
                    {
                        this.props.pselected === this.props.num? "X": this.props.num }
                </button>
            </div>
        )
    }
}

export default Piece
