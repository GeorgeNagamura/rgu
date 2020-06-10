import React, { Component } from 'react'

export class YPieceHolder extends Component {
    render() {
        return (
            
            <div className="yellow_pieces" style={{display: "flex"}}>
                    {piece_list.map((value)=> (
                        <Piece  key={"y" + value}
                                num={"y" + value} 
                                player="1" 
                                turn={this.props.data.turn} 
                                select={this.props.select_piece} 
                                pselected= {this.props.data.piece_selected}
                        />
                    ))}
            </div>
            
        )
    }
}

export default YPieceHolder
