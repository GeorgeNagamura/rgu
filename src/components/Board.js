import React, { Component } from 'react'
import Piece from './Piece'
import Square from './Square'
import HoldArea from './HoldArea'
import SafeArea from './SafeArea'

export class Board extends Component {
    saferow1 = ["flower", "tile", "tile", "tile", "start_yellow", "goal_yellow", "flower", "tile"];
    saferow2 = ["flower", "tile", "tile", "tile", "start_green", "goal_green", "flower", "tile"];
    middlerow = ["tile", "tile", "tile", "flower", "tile", "tile", "tile", "tile"];
    rtypes = [[this.saferow1], [this.middlerow], [this.saferow2]]
    s = [4, 3, 2, 1, 0, 15, 14, 13]
    m = [5, 6, 7, 8, 9, 10, 11, 12]
    hnumlist = [[this.s], [this.m], [this.s]] 

    state = {
        status: {"r1": [0, 0, 0, 0, 0, 0, 0, 0], "rm": [0, 0, 0, 0, 0, 0, 0, 0], "r2":[0, 0, 0, 0, 0, 0, 0, 0]},
        safe: [Array(7).fill(0), Array(7).fill(0)],
        ysaved: 0,
        gsaved: 0,
        yhouse: [1, 1, 1, 1, 1, 1, 1],
        ghouse: [2, 2, 2, 2, 2, 2, 2],
        rolled: null,
        t_select: [],
        target: [],
        source: [],
        turn: "2",
        src_hnum: null,
        dice_total_style: true,
        history:["implementar mais para frente"]    
    }

    

    renderSafe = (color) => { 
        const safe = this.state.safe    
        let s_index = null
        color === "ys"? s_index = 0: s_index = 1
        
        return (
            safe[s_index].map( (v, i) => {
                
                return (v!==0? <div style={{   display: "flex",
                                        width: "75px",
                                        height: "75px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        margin: 0
                                    }}><Piece style={{
                                        width: "50px",
                                        height: "50px",
                                    }}  id={color + 15} player={v}/></div>:
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
    
    movePiece = (id, occupied, hnum) => {
        let player = this.state.turn
        //se for o turno do jogador
        let t_select_copy = [...this.state.t_select]
        
        let source_copy = []
        console.log(this.state.status["r1"])
        const yhouse = this.state.yhouse
        const ghouse = this.state.ghouse
        let piece_placed = false
        
        

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
                            source: [...source_copy],
                            src_hnum: hnum,        
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
                                source: [...source_copy],
                                src_hnum: hnum,
                            })
                            console.log("selecting other")
                            console.log("Source: " + source_copy[0])
                            //se for uma casa vazia não faz nada
                        } 
                    }
                }
            //se a peça estiver selecionada
            }else {
                console.log(this.state.src_hnum + this.state.rolled === hnum)
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
                        //se for outra peça da mesma cor:
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
                        if (true){
                            if (hnum !== 8){
                                //trocar a peça por outra
                                let r1_copy = [...this.state.status["r1"]]
                                let rm_copy = [...this.state.status["rm"]]
                                let r2_copy = [...this.state.status["r2"]]
                                let status_copy = {"r1": r1_copy, "rm": rm_copy, "r2": r2_copy}
                                let yhouse_copy = [...this.state.yhouse]
                                let ghouse_copy = [...this.state.ghouse]
                                const src_row = this.state.source[0].substr(0, 2)
                                const src_num = this.state.source[0].substr(2)
                                //substitui a peça
                                rm_copy[hnumber] = parseInt(player)
                                //apaga a peça que comeu
                                if (src_row === "r1"){
                                            
                                    r1_copy[src_num] = 0
                                    
                                } else if (src_row === "rm"){
                                    
                                    rm_copy[src_num] = 0
                                    
                                } else if(src_row === "r2") {
                                    
                                    r2_copy[src_num] = 0
                                    
                                }
                                //mandar a peça comida de volta para casa
                                if (player === "1"){
                                    ghouse_copy.push(2)
                                } else {
                                    yhouse_copy.push(1)
                                }
                                //update status
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
                                piece_placed = true
                                alert("Perdeu, preibói!!!")
                            }
                        }
                        //checar se a casa não é a roseta
                        
                    }
                //se a casa estiver vazia
                } else {
                    if(this.state.src_hnum + this.state.rolled === hnum)
                    
                    {        //checar se o movimento é permitido
                       
                        
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
                        let safe_copy = [ [...this.state.safe[0] ], [...this.state.safe[1] ] ]
                        let ysaved_copy = this.state.ysaved
                        let gsaved_copy = this.state.gsaved

                        if (hnum === 15) {
                            console.log("casa 15")
                            //apaga a peça
                            if (src_row === "r1"){
                                    
                                r1_copy[src_num] = 0
                                piece_placed = true
                            } else if (src_row === "rm"){
                                
                                rm_copy[src_num] = 0
                                piece_placed = true
                            } else if(src_row === "r2") {
                                
                                r2_copy[src_num] = 0
                                piece_placed = true
                            }
                            //coloca a peça no safe
                            //safe: [Array(7).fill(0), Array(7).fill(0)]
                            
                            let saved_index = player === "1"? ysaved_copy : gsaved_copy
                            safe_copy[(parseInt(player)-1)][saved_index] = parseInt(player)
                            player === "1"? ysaved_copy = ysaved_copy++:gsaved_copy++
                            alert("Você salvou uma peça!")
                        } else if (hnum === 0) {
                            console.log("do nothing")
                        }

                        else if(!(id.substr(0, 2) !== "rm" && hnumber === "5") ){
                            
                            //se estiver na linha certa
                            if (!((player === "1" && row === "r2")||(player === "2" && row === "r1"))){
                                //atualiza status
                                if (row === "r1"){
                                    
                                    r1_copy[hnumber] = parseInt(player)
                                    piece_placed = true
                                } else if (row === "rm"){
                                    
                                    rm_copy[hnumber] = parseInt(player)
                                    piece_placed = true
                                } else if (row === "r2") {
                                    
                                    r2_copy[hnumber] = parseInt(player)
                                    piece_placed = true
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
                                    piece_placed = true
                                }  else if (src_row === "gh"){
                                    ghouse_copy = [...ghouse]
                                    ghouse_copy = [...ghouse_copy.slice(1, ghouse_copy.length)]
                                    console.log(ghouse_copy)
                                    piece_placed = true
                                }
                                
                            }
                        //se for a casa 15 (goal)
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
                            ysaved: ysaved_copy,
                            gsaved: gsaved_copy,
                            safe: [...safe_copy]
                        })
                        console.log(safe_copy)
                           
                    }
                }
            }
            
             
        
        } 
        
        
        let turn_copy = this.state.turn
        const flower_list = [4, 8, 14]
        
        
        
        //se a peça estiver sido posicionada e cair na roseta
        if (piece_placed && this.state.t_select.length !==0 && flower_list.includes(hnum) && this.state.rolled !== null){
                alert("Você caiu em uma roseta! Jogue de novo!")
                
            }
        
        //se a roseta do meio estiver ocupada pelo mesmo jogador   
        
        else if (piece_placed){
            console.log(piece_placed)
            alert("Fim do turno")
            turn_copy = this.state.turn === "1"? "2":"1"
                this.setState({
                    turn: turn_copy,
                    rolled: null
                })
            
        }   
        console.log(piece_placed)
    }
    
    countPieces = (player) => {
        let a = this.count(this.state.status.r1, player); 
        let b = this.count(this.state.status.rm, player);
        let c = this.count(this.state.status.r2, player);
        return (a + b + c) 

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
                        bg = {value}    
                        >
                    
                </Square>
            )}
            ))

    }

    rollDice = () => {
        let d1 = this.getRandomInt(2)
        let d2 = this.getRandomInt(2)
        let d3 = this.getRandomInt(2)
        let d4 = this.getRandomInt(2)
        const total = d1+d2+d3+d4
        
        this.setState({
            rolled: total,
            dice_total_style: !this.state.dice_total_style
        })

        
        

        
          
    }
    dice_style = null
    
    dice_style1 = {
        fontSize: "100pt",
        color: "white"
    }
    dice_style2 = {
        fontSize: "100pt",
        color: "black"
    }

    render() {
        return (
            <div className="ui">
                <div className="game_area">
                    
                    <div className="board">
                        <HoldArea   className="hold_area" 
                                    children={this.renderHold("yh")}
                                    movePiece = {this.movePiece}
                                    id={"yh0"}
                                    occupied = {this.state.yhouse.length === 0? 0:1}
                                    hnum={0}></HoldArea>
                    
                        <div className="R1">{this.renderRow(0)}</div>
                        <div className="RM">{this.renderRow(1)}</div>
                        <div className="R2">{this.renderRow(2)}</div>
                        
                        <HoldArea   className="hold_area" 
                                    children={this.renderHold("gh")}
                                    movePiece = {this.movePiece}
                                    id={"gh0"}
                                    occupied = {this.state.yhouse.length === 0? 0:2}
                                    hnum={0}></HoldArea>
                    </div>
                    <div className="safe_area_holder">
                        <SafeArea className="safe_area" children={this.renderSafe("ys")}></SafeArea>
                        <SafeArea className="safe_area" children={this.renderSafe("gs")}></SafeArea>
                    </div>
                </div>
                <div className="dice_area">
                    <div style={{   fontSize: "40pt",
                                    backgroundColor: this.state.turn === "1"?
                                        "yellow":"green"}} >
                        Turno Jogador: {this.state.turn}</div>
                    <div className="dice_total" style={this.state.dice_total_style? this.dice_style1:this.dice_style2}>{this.state.rolled}</div>
                    <button className="btn" onClick={this.rollDice.bind(this)}>ROLAR DADOS</button>
                    <button className="btn" onClick={this.passarVez.bind(this)}>PASSAR A VEZ</button>
                </div>
            </div>
        )
    }

    passarVez = () => {
        let vez = this.state.turn
        vez === "1"? vez = "2": vez="1"
        this.setState({
            turn: vez,
            rolled: null
        })
    }

    componentDidUpdate(){
        setTimeout( ()=>{
            if (this.state.rolled === 0){
                let turn_copy = this.state.turn
                turn_copy = this.state.turn === "1"? "2":"1"
                    this.setState({
                        turn: turn_copy,
                        rolled: null
                    })
                return    alert("Que pena! Você tirou zero. Passe a vez")
            }
        }, 700 )
    }

    //tools

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
        }

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
