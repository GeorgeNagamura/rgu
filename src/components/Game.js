import React, { Component } from 'react'
import Board from './Board'

export class Game extends Component {
    state = {
        turn: 2,
        piece_selected: null,
        p1_pos: Array(7).fill(0),
        p2_pos: Array(7).fill(0),
        p1_row_status: Array(8).fill(null),
        m_row_status: Array(8).fill(null),
        p2_row_status: Array(8).fill(null),
        rolled: null,
        possible_moves: null,
        selected_move: null,
    }

    select_piece = (num, player) => {
        console.log(player, num)
        if (parseInt(player,10) === this.state.turn){
            if (this.state.piece_selected === num){
                this.setState({
                    piece_selected: null
                })
            } else{
                this.setState({
                    piece_selected: num
                })
            }    
        }
        
    }

    checkSelected(num){
        if (this.state.piece_selected === num){
            console.log("same piece")
        }

    }

    updateRoll = (num) => {
        this.setState({
            rolled: num
        })
        
    }

    checkMoves(){
        let absolute_piece = this.state.piece_selected.substr(1);
        let p_num = "0";
        this.state.turn === 1? p_num = "y" : p_num = "g"
        let domain = null
        this.state.turn === 1? domain = this.state.p1_pos : domain = this.state.p2_pos
        
        let abs_move = domain[absolute_piece -1] + this.state.rolled
        console.log(abs_move)
        let r1_copy = [...this.state.p1_row_status]
        let m_copy = [...this.state.m_row_status]
        let r2_copy = [...this.state.p2_row_status]
        const map_r1 = [4, 3, 2, 1, 0, 15, 14, 13]
        const map_m = [5, 6, 7, 8, 9, 10, 11, 12]
        if (this.state.turn === 1){
            let temp_list = [...this.state.p1_pos]
            temp_list[absolute_piece -1] = abs_move
            if (r1_copy.indexOf(this.state.piece_selected) !== -1) {
                
                r1_copy[r1_copy.indexOf(this.state.piece_selected)] = null
                console.log(r1_copy)
            } else if (m_copy.indexOf(this.state.piece_selected) !== -1) {
                
                m_copy[m_copy.indexOf(this.state.piece_selected)] = null
            }
            if (abs_move < 5 || abs_move > 12){
                const i_r1 = map_r1.indexOf(abs_move)
                
                r1_copy[i_r1] = this.state.piece_selected}
            else {
                const i_m = map_m.indexOf(abs_move)
                m_copy[i_m] = this.state.piece_selected}
            
            this.setState({
                p1_pos: [...temp_list],
                p1_row_status: [...r1_copy],
                m_row_status: [...m_copy]
            })
        } else {
            let temp_list = [...this.state.p2_pos]
            temp_list[absolute_piece -1] = abs_move
            if (r2_copy.indexOf(this.state.piece_selected) !== -1) {
                
                r2_copy[r2_copy.indexOf(this.state.piece_selected)] = null
                console.log(r2_copy)
            } else if (m_copy.indexOf(this.state.piece_selected) !== -1) {
                
                m_copy[m_copy.indexOf(this.state.piece_selected)] = null
            }
            if (abs_move < 5 || abs_move > 12){
                const i_r2 = map_r1.indexOf(abs_move)
                
                r2_copy[i_r2] = this.state.piece_selected}
            else {
                const i_m = map_m.indexOf(abs_move)
                m_copy[i_m] = this.state.piece_selected}
            
            this.setState({
                p2_pos: [...temp_list],
                p2_row_status: [...r2_copy],
                m_row_status: [...m_copy]
            })
        }
       



        return (p_num + "abs_move")
        
    }

    selectMove = (house) => {
        console.log('from Game: ' + this.state.piece_selected)
        if (this.state.piece_selected !== null){

            let move = this.checkMoves()
            let p_move = move.substr(1)
            if (p_move === house){
                this.setState({
                    selected_move: move,
                    
                })
            }
        
        }
        this.setState({
            piece_selected: null
        })
        
    }

    render() {
        return (
            <div>
                <h2>Turn: {this.state.turn === 1? "Player 1": "Player 2"}</h2>
                <Board  data={this.state} 
                        select_piece={this.select_piece} 
                        updateRoll={this.updateRoll}
                        selectMove = {this.selectMove}
                        />
            </div>
        )
    }
}



export default Game
