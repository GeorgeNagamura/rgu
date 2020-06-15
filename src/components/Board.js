import React, { Component } from 'react'
import Piece from './Piece'
import Square from './Square'
import HoldArea from './HoldArea'
import SafeArea from './SafeArea'

export class Board extends Component {
    saferow = ["flower", "tile", "tile", "tile", "start", "goal", "flower", "tile"];
    middlerow = ["tile", "tile", "tile", "flower", "tile", "tile", "tile", "tile"];
    rtypes = [[this.saferow], [this.middlerow], [this.saferow]]
    s = [4, 3, 2, 1, 0, 15, 14, 13]
    m = [5, 6, 7, 8, 9, 10, 11, 12]
    hnumlist = [[this.s], [this.m], [this.s]] 

    state = {
        status: {"r1": [0, 0, 0, 0, 0, 0, 0, 0], "rm": [0, 0, 0, 0, 0, 0, 0, 0], "r2":[0, 0, 0, 0, 0, 0, 0, 0]},
        safe: [Array(7).fill(0), Array(7).fill(0)],
        yhouse: [1, 1, 1, 1, 1, 1, 1],
        ghouse: [2, 2, 2, 2, 2, 2, 2],
        rolled: 3,
        t_select: [],
        target: [],
        source: [],
        turn: "2",    
    }

    renderSafe = (color) => { 
        const safe = this.state.safe    
        let s_index = null
        color === "ys"? s_index = 0: s_index = 1
        
        return (
            safe[s_index].map( (v, i) => {
                return (!v===0? <div style={{   display: "flex",
                                        width: "75px",
                                        height: "75px",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}><Piece id={color + 15} player={v}/></div>:
                                    null
                                    )
            })
        )
    }

    //render hold area (start)
    renderHold = (color) => { 
        const yhouse = this.state.yhouse
        const ghouse = this.state.ghouse
        let house = null
        let check_select = 9
        let this_id = (color + 0)
        
        this.state.t_select[0] === this_id? check_select = 0: check_select=9
        
        color === "yh"? house = yhouse : house=ghouse
        
        return (
            house.map( (v, i) => {
                return (i !== check_select? <div style={{    display: "flex",
                                        width: "100px",
                                        height: "100px",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}><Piece id={color + 0} player={v}/></div>:
                                        <div style={{    display: "flex",
                                        width: "100px",
                                        height: "100px",
                                        alignItems: "left",
                                        justifyContent: "center",
                                        backgroundColor: "red"
                                    }}><Piece id={color + 0} player={v}/></div>)
            })
        )
    }
    
    movePiece = (id, occupied) => {
        let player = "2"
        //se for o turno do jogador
        let t_select_copy = [...this.state.t_select]
        let target_copy = []
        let source_copy = []
        console.log(this.state.status["r1"])
        const yhouse = this.state.yhouse
        const ghouse = this.state.ghouse
        if (this.state.turn === player){
            //checar se a casa está ocupada
            let row = id.substr(0, 2)
            let hnumber = id.substr(2)
            console.log ("turn 1")
            
            //checar se há uma peça selecionada
            if (this.state.t_select.length === 0){
                console.log(occupied)
                if (occupied === parseInt(player)){
                    console.log("piece selected: " + id)
                    //se a peça não estiver selecionada e for o primeiro click
                    if (this.state.t_select.length === 0) {
                        //selecionar peça
                        t_select_copy.push(id)
                        source_copy.push(id)
                        this.setState({
                        t_select: [...t_select_copy],
                        source: [...source_copy]        
                        })
                        console.log("adding: " + this.state.t_select)
                        console.log("Source: " + source_copy[0])
                    } else {
                        console.log("already occupied")
                        //se não for a mesma casa
                        if (!(this.state.t_select.includes(id))){
                            t_select_copy = [id]
                            source_copy = [id]
                            this.setState({
                                t_select: [...t_select_copy],
                                source: [...source_copy]
                            })
                            console.log("selecting other")
                            console.log("Source: " + source_copy[0])
                            //se for uma casa vazia
                        } 
                    }
                }
            //se a peça estiver selecionada
            }else {
                //checar se a casa está ocupada
                if (occupied !== 0){
                    //se for da mesma cor
                    if (occupied === parseInt(player)){
                        console.log("Movement not allowed - occupied by: " + occupied)
                        //se for a mesma peça:
                        if(this.state.t_select[0] === id){
                            console.log("de-select")
                            t_select_copy = []
                            this.setState({
                                t_select: t_select_copy
                            })
                        }
                        //se for outra peça:
                        else {
                            console.log("outra peça")
                            t_select_copy = [id]
                            source_copy = [id]
                            this.setState({
                                t_select: [...t_select_copy],
                                source: [...source_copy]
                            })
                        }
                    //peça é de outra cor  
                    } else {
                        //checar se o movimento é permitido
                        target_copy = [id]
                        this.setState({
                            
                            target: [...source_copy]
                        })
                        console.log("selecting target")
                        console.log("Target: " + target_copy[0])
                    }
                } else {

                    //checar se o movimento é permitido

                    
                    //status copies
                    let r1_copy = [...this.state.status["r1"]]
                    let rm_copy = [...this.state.status["rm"]]
                    let r2_copy = [...this.state.status["r2"]]
                    let status_copy = {"r1": r1_copy, "rm": rm_copy, "r2": r2_copy}
                    // house copies
                    let yhouse_copy = [...this.state.yhouse]
                    let ghouse_copy = [...this.state.ghouse]
                    const src_row = this.state.source[0].substr(0, 2)
                    const src_num = this.state.source[0].substr(2)
                    //atualiza status
                    if (!((player === "1" && row === "r2")||(player === "2" && row === "r1"))){
                        if (row === "r1"){
                            
                            r1_copy[hnumber] = parseInt(player)
                            
                        } else if (row === "rm"){
                            
                            rm_copy[hnumber] = parseInt(player)
                            
                        } else if (row === "r2") {
                            
                            r2_copy[hnumber] = parseInt(player)
                            
                        }
                        //apaga peça do tabuleiro
                        
                        if (src_row === "r1"){
                            
                            r1_copy[src_num] = 0
                            
                        } else if (src_row === "rm"){
                            
                            rm_copy[src_num] = 0
                            
                        } else if(src_row === "r2") {
                            
                            r2_copy[src_num] = 0
                            
                        } else if (src_row === "yh"){
                            yhouse_copy = [...yhouse]
                            yhouse_copy = [...yhouse_copy.slice(1, yhouse_copy.length)]
                            console.log(yhouse_copy)
                        }  else if (src_row === "gh"){
                            ghouse_copy = [...ghouse]
                            ghouse_copy = [...ghouse_copy.slice(1, ghouse_copy.length)]
                            console.log(ghouse_copy)
                        }
                    //apaga peça da house
                    //yhouse_copy ou ghouse_copy
                    }

                    status_copy = {"r1": r1_copy, "rm": rm_copy, "r2": r2_copy}
                    t_select_copy = []
                    console.log(this.state.source)
                    console.log(status_copy, this.state.status)
                    this.setState({
                        status: status_copy,
                        t_select: t_select_copy,
                        yhouse: yhouse_copy,
                        ghouse: ghouse_copy,
                    })
                    console.log(status_copy, this.state.status)   
                }
            }
            
             
        //turn 2
        } else {
            console.log("turn 2")
        }
        
        
        
        
    }
    
    countPieces = (player) => {
        let a = this.count(this.state.status.r1, player); 
        let b = this.count(this.state.status.rm, player);
        let c = this.count(this.state.status.r2, player);
        return (a + b + c) 

    }
    tSelect = (id) => {
        let t_select_copy = [...this.state.t_select]
        let target_copy = []
        let source_copy = []
        if (this.state.t_select.length === 0) {
            t_select_copy.push(id)
            source_copy.push(id)
            this.setState({
            t_select: [...t_select_copy],
            source: [...source_copy]        
            })
            console.log("adding")
            console.log("Source: " + source_copy[0])
        } else {
            if (!(this.state.t_select.includes(id))){
                t_select_copy = [id]
                source_copy = [id]
                this.setState({
                    t_select: [...t_select_copy],
                    source: [...source_copy]
                })
                console.log("selecting other")
                console.log("Source: " + source_copy[0])
            }
            else {
                t_select_copy = []
                this.setState({
                    t_select: []
                })
                console.log("cancelling")
            }


            
        }
        
    }

    renderRow(num){
        const rlist = ["r1", "rm", "r2"]
        const tomap = this.rtypes[num]
        
        return (tomap[0].map( (value, index) => 
            {   
                
                return (
                <Square key= {rlist[num] + index}
                        id = {rlist[num] + index}
                        className="square"
                        row = {rlist[num]}
                        numero = {index} 
                        hnum={this.hnumlist[num][0][index]} 
                        occupied={this.state.status[rlist[num]][index]}
                        content = {value + " " + this.hnumlist[num][0][index] }
                        tSelect = {this.movePiece}
                        t_select = {this.state.t_select}    
                        >
                    
                </Square>
            )}
            ))

    }

    rollDice = () => {
        this.setState({
            rolled: this.state.rolled + 1
        })
    }

    render() {
        return (
            <div className="game_area">
                
                <div className="board">
                    <HoldArea   className="hold_area" 
                                children={this.renderHold("yh")}
                                movePiece = {this.movePiece}
                                id={"yh0"}
                                occupied = {this.state.yhouse.length === 0? 0:1}></HoldArea>
                
                    <div className="R1">{this.renderRow(0)}</div>
                    <div className="RM">{this.renderRow(1)}</div>
                    <div className="R2">{this.renderRow(2)}</div>
                    <button onClick={this.rollDice.bind(this)}>Roll</button>
                    <HoldArea   className="hold_area" 
                                children={this.renderHold("gh")}
                                movePiece = {this.movePiece}
                                id={"gh0"}
                                occupied = {this.state.yhouse.length === 0? 0:2}></HoldArea>
                </div>
                <div className="safe_area_holder">
                    <SafeArea className="safe_area" children={this.renderSafe("ys")}></SafeArea>
                    <SafeArea className="safe_area" children={this.renderSafe("gs")}></SafeArea>
                </div>
            </div>
        )
    }
    //tools
    arrayRemove = (arr, value) => { return arr.filter(function(ele){ return ele !== value; });}

    locUpdate = (dowhat) => {
        if (this.state.t_select.length !== 0){
            let row = this.state.t_select[0].substr(0, 2)
            let hnumber = this.state.t_select[0].substr(2)
            let status_copy = this.state.status
            status_copy[row][hnumber] = dowhat
         }
    }

    count = (array, num) => {
        var counts = {}
        for (let i = 0; i < array.length; i++) {
          let num = array[i];
          counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
          return counts[num] > 0? counts[num]:0
      
      }
}

export default Board
