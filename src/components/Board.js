/*1. Draw the yellow pieces,
2. Draw the board,
3. Draw the green pieces,
4.1. Draw dice, draw button*/

import React, { Component } from 'react'
import Piece from './Piece'
import Square from './Square'
import Dice from './Dice'

const piece_list = [1,2,3,4,5,6,7];
const P1= ['flower', 'tile', 'tile', 'tile', 'startYellow', 'goalYellow', 'flower', 'tile'];
const P2= ['flower', 'tile', 'tile', 'tile', 'startGreen', 'goalGreen', 'flower', 'tile'];
const M= ['tile', 'tile', 'tile', 'flower', 'tile', 'tile', 'tile', 'tile'];
const pnums= [4, 3, 2, 1, 0, 15, 14, 13];
const mnums= [5, 6, 7, 8, 9, 10, 11, 12];


export class Board extends Component {
    render() {
        return (
            <div className="whole_board">
                
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
                <div className="tiles">
                    <div className="row1" style={{display: "flex"}}>
                        {P1.map((value, index) => (
                            <Square key = {"p1" + index}
                                    type={value}
                                    occupied = {this.props.data.p1_row_status[index]}
                                    hnum={pnums[index]} 
                                    selectMove = {this.props.selectMove}
                                    called = {this.props.data.selected_move}
                                    />
                        ))}
                    </div>
                    <div className="row2" style={{display: "flex"}}>
                        {M.map((value, index) => (
                            <Square key = {"m" + index}
                                    type={value}
                                    occupied = {this.props.data.m_row_status[index]}
                                    hnum={mnums[index]} 
                                    selectMove = {this.props.selectMove}
                                    called = {this.props.data.selected_move}
                                    />
                        ))}
                    </div>
                    <div className="row3" style={{display: "flex"}}>
                        {P2.map((value, index) => (
                            <Square key = {"p2" + index}
                                    type={value}
                                    occupied = {this.props.data.p2_row_status[index]}
                                    hnum={pnums[index]} 
                                    selectMove = {this.props.selectMove}
                                    called = {this.props.data.selected_move}
                                    />
                        ))}
                    </div>
                    <div className="green_pieces" style={{display: "flex"}}>
                    {piece_list.map((value)=> (
                        <Piece  key={"g" + value}
                                num={"g" + value} 
                                player="2" 
                                turn={this.props.data.turn} 
                                select={this.props.select_piece} 
                                pselected= {this.props.data.piece_selected}/>
                    ))}
                    </div>
                    <Dice updateRoll = {this.props.updateRoll}/>
                </div>
            </div>
        )
    }
}

export default Board
