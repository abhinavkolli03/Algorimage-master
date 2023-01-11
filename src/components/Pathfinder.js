import React, {Component, useState, useEffect} from 'react';
import Node from "./Node";
import Astar from "../algorithms/astar.js";
import Bfs from "../algorithms/bfs.js";
import Dfs from "../algorithms/dfs.js";
import Djikstras from "../algorithms/djikstras.js"
import Greedy_bfs from "../algorithms/greedy_bfs.js"
import "./Pathfinder.css";
import "./Node.css";
import {Slider} from '@material-ui/core';
import Select from 'react-select'
import Stack from 'stack-styled'
import {PathfinderToolbar, PathfinderResults} from './NavBarElements.js'
import Button from 'reactive-button';
import RecursiveDivision from '../mazes/recursive_division.js'

var speed = 30
var playing = false

let cols = 51;
let rows = 21;

var timeTaken = 0;
var lengthOfPath = 0;

var holdingRed = false;
var holdingRedTempValue = [];
var holdingGreen = false;
var holdingGreenTempValue = [];

//dropdowns
let algorithmsOptions = [
{ value: 0, label: 'A* Search', children: [{value: 0, label: 'Manhattan'}, {value: 1, label: 'Euclidean'}, {value: 2, label: 'Octile'}, {value: 3, label: 'Chebyshev'}]},
{ value: 1, label: 'Djikstras', children: [{value: 0, label: 'None'}]},
{ value: 2, label: 'Greedy Best First Search', children: [{value: 0, label: 'Manhattan'}, {value: 1, label: 'Euclidean'}, {value: 2, label: 'Octile'}, {value: 3, label: 'Chebyshev'}]},
{ value: 3, label: 'Breadth-First Search', children: [{value: 0, label: 'None'}]},
{ value: 4, label: 'Depth-First Search', children: [{value: 0, label: 'None'}]}]
var switchAlgorithm = 0

var heuristicOptions = algorithmsOptions[0].children
var switchHeuristic = 0
var heuristicText = ""

var speedOptions = [
{ value: 0, label: "Slow", speed: 120},
{ value: 1, label: "Moderate", speed: 75},
{ value: 2, label: "Fast", speed: 30},
{ value: 3, label: "Quick", speed: 5}]
var switchSpeed = 2

var mazeOptions = [
{ value: 0, label: "Randomized Walls"},
{ value: 1, label: "Recursive Divison"}
]
var mazeSwitch = 0

var mousePressed = false;

var NODE_START_ROW = 9;
var NODE_START_COL = 12;
var NODE_END_ROW = 9;
var NODE_END_COL = 38;

const Pathfinder = () => {
    const [Grid, setGrid] = useState([]);
    const [Path, setPath] = useState([]);
    const [VisitedNodes, setVisitedNodes] = useState([]);
    const [ResultsText, setResultsText] = useState("");
    const [ResultsTwoText, setResultsTwoText] = useState("");
    const [WallDensity, setWallDensity] = useState(10.0);

    useEffect(() => {
        initializeGrid()
    }, [])

    //Creates grid
    const initializeGrid = () => {
        const grid = new Array(rows);
        for(let i = 0; i < rows; i++) {
            grid[i] = new Array(cols)
        }
        createSpot(grid);
        addNeighbors(grid);
        setGrid(grid);
        performAlgorithm(grid);
        return(grid);
    }

    const generateRecursiveDivisionMaze = () => {
        if(!playing) {
            clearVisualVisitedNodes()
            const mazeGrid = RecursiveDivision(rows, cols)
            const grid = new Array(rows)
            for(let i = 0; i < rows; i++) {
                grid[i] = new Array(cols)
            }
            createSpot(grid)
            for(let i = 0; i < mazeGrid.length; i++) {
                for(let j = 0; j < cols; j++) {
                    if(mazeGrid[i][j] === 1 && !grid[i][j].isEnd)
                        grid[i][j].isWall = true
                }
            }
            addNeighbors(grid)
            setGrid(grid)
            performAlgorithm(grid)
            return(grid)
        }
    }

    function performAlgorithm(grid) {
        setResultsText("Time: 0 ms")
        setResultsTwoText("Length: 0 units")
        const startNode = grid[NODE_START_ROW][NODE_START_COL];
        const endNode = grid[NODE_END_ROW][NODE_END_COL];
        timeTaken = performance.now();
        let path = testProperAlgorithm(startNode, endNode, switchHeuristic);
        timeTaken = Math.trunc((performance.now() - timeTaken) * 1000) / 1000;
        lengthOfPath = path.path.length;
        setPath(path.path);
        setVisitedNodes(path.visitedNodes);
    }

    function testProperAlgorithm(startNode, endNode, switchHeuristic) {
        switch(switchAlgorithm) {
            case 0:
                return Astar(startNode, endNode, switchHeuristic)
            case 1:
                return Djikstras(startNode, endNode)
            case 2:
                return Greedy_bfs(startNode, endNode, switchHeuristic)
            case 3:
                return Bfs(startNode, endNode)
            case 4:
                return Dfs(startNode, endNode)
        }
    }

    //creates spot
    const createSpot = (grid) => {
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                grid[i][j] = new Spot(i, j);
            }
        }
    }

    const addNeighbors = (grid) => {
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                grid[i][j].neighbors = []
                grid[i][j].addSpotNeighbors(grid);
            }
        }
    }

    const addWalls = (grid) => {
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                if(Math.random(1) < WallDensity)
                    grid[i][j].addSpotWall(grid);
            }
        }
    }
    //spot constructor
    function Spot(i, j) {
        this.x = i;
        this.y = j;
        this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
        this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
        this.g = 0;
        this.f = 0;
        this.h = 0;
        this.neighbors = [];
        this.isWall = false;
        this.previous = undefined;
        this.addSpotWall = function(grid) {
            if(!this.isEnd) {
                this.isWall = true;
            }
        }
        this.addSpotNeighbors = function(grid) {
            let x = this.x;
            let y = this.y;
            if(grid[x-1] && grid[x-1][y]) {
                this.neighbors.push(grid[x-1][y]);
            }
            if(grid[x+1] && grid[x+1][y]) {
                this.neighbors.push(grid[x+1][y]);
            }
            if(grid[x][y-1] && grid[x][y-1]) {
                this.neighbors.push(grid[x][y-1]);
            }
            if(grid[x][y+1] && grid[x][y+1]) {
                this.neighbors.push(grid[x][y+1]);
            }
        };
    }  

    function handleMouseDown(row, col) {
        if(!playing) {
            clearVisualVisitedNodes()
            if(Grid[row.row][col.col].isEnd) {
                holdingRed = true
                holdingRedTempValue = [row.row, col.col]
            }
            else if(Grid[row.row][col.col].isStart) {
                holdingGreen = true
                holdingGreenTempValue = [row.row, col.col]
            }
            var newGrid = addMousePressedObject(Grid, row.row, col.col);
            mousePressed = true;
            addNeighbors(newGrid);
            setGrid(newGrid);
            performAlgorithm(newGrid);
        }
    }

    function handleMouseEnter(row, col) {
        //clearVisualVisitedNodes()
        var newGrid = Grid
        var changed = false
        if(!holdingRed && !holdingGreen && mousePressed) {
            newGrid = addMousePressedObject(Grid, row.row, col.col);
        } else if(holdingRed && mousePressed) {
            newGrid = changeEnd(Grid, row.row, col.col)
            changed = true
        } else if(holdingGreen && mousePressed) {
            newGrid = changeStart(Grid, row.row, col.col)
            changed = true
        }
        if(changed) {
            createSpot(newGrid)
        }
        addNeighbors(newGrid);
        setGrid(newGrid);
        performAlgorithm(newGrid);
    }

    function handleMouseUp() {
        mousePressed = false
        holdingRed = false
        holdingRedTempValue = []
        holdingGreen = false
        holdingGreenTempValue = []
    }

    const changeEnd = (grid, row, col) => {
        NODE_END_ROW = row;
        NODE_END_COL = col;
        return grid
    }

    const changeStart = (grid, row, col) => {
        NODE_START_ROW = row;
        NODE_START_COL = col;
        return grid
    }

    const addMousePressedObject = (grid, row, col) => {
        const tempNode = grid[row][col];
        if(!tempNode.isEnd && !tempNode.isStart) {
            tempNode.isWall = !tempNode.isWall
            grid[row][col] = tempNode;
        }
        return grid;
    }

    //Grid with node
    const gridWithNode = () => {
        return (
            <div style={{maxWidth: "2000px", maxHeight: "1200px"}}>
                {Grid.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className="rowWrapper">
                            {row.map((node, nodeIndex) => {
                                const {isStart, isEnd, isWall} = node;
                                return (
                                    <Node key={nodeIndex} 
                                        isStart={isStart} 
                                        isEnd={isEnd} 
                                        isWall = {isWall}
                                        row = {rowIndex}
                                        col = {nodeIndex}
                                        mousePressed = {mousePressed}
                                        onMouseDown={(row, col) => handleMouseDown(row, col)}
                                        onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                                        onMouseUp={() => handleMouseUp()}
                                    />
                                    //<p>hi</p>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        )
    }

    const visualizeShortestPath = (shortestPathNodes) => {
        for(let i = 0; i < shortestPathNodes.length; i++) {
            setTimeout(() => {
                const node = shortestPathNodes[i];
                document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path";
            }, 8 * i); //frame rate
        }
        setResultsText("Time: " + timeTaken + " ms")
        setResultsTwoText("Length: " + lengthOfPath + " units")
        playing = false
        return (
            <div>
                <p>{ResultsText}</p>
                <p>{ResultsTwoText}</p>
            </div>
        )
    };

    const visualizePath = () => {
        if(!playing) {
            performAlgorithm(Grid)
            playing = true
            for(let i = 0; i <= VisitedNodes.length; i++) {
                if(i === VisitedNodes.length) {
                    setTimeout(() => {
                        visualizeShortestPath(Path);
                    }, speed * i); //delayed frame rate
                } else {
                    setTimeout(() => {
                        const node = VisitedNodes[i];
                        document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited";
                    }, speed * i)
                }
            }
        }
    };

    const randomizeWalls = () => {
        if(!playing) {
            let wallGrid = initializeGrid()
            addWalls(wallGrid)
            addNeighbors(wallGrid);
            setGrid(wallGrid)
            performAlgorithm(wallGrid)
            clearVisualVisitedNodes()
        }
    }

    const reset = () => {
        if(!playing) {
            initializeGrid()
            clearVisualVisitedNodes()
            setWallDensity(10)
        }
    }

    function clearVisualVisitedNodes() {
        if(!playing) {
            for(let i = 0; i < VisitedNodes.length; i++) {
                const node = VisitedNodes[i];
                document.getElementById(`node-${node.x}-${node.y}`).className = "node";
            }
        }
    }

    const handleAlgoChange = (selectedOption) => {
        for(let i = 0; i < algorithmsOptions.length; i++) {
            if(algorithmsOptions[i].label === selectedOption.label) {
                switchAlgorithm = i
                heuristicOptions = algorithmsOptions[i].children
                clearVisualVisitedNodes()
            }
        }
        performAlgorithm(Grid)
    }

    const handleHeuristicChange = (selectedOption) => {
        for(let i = 0; i < heuristicOptions.length; i++) {
            if(heuristicOptions[i].label === selectedOption.label) {
                switchHeuristic = i
                clearVisualVisitedNodes()
            }
        }
        heuristicText = heuristicOptions[switchHeuristic]
        performAlgorithm(Grid)
    }

    const handleSpeedChange = (selectedOption) => {
        for(let i = 0; i < speedOptions.length; i++) {
            if(speedOptions[i].label === selectedOption.label) {
                switchSpeed = i
            }
        }
        speed = speedOptions[switchSpeed].speed
    }

    const handleMazeChange = (selectedOption) => {
        for(let i = 0; i < mazeOptions.length; i++) {
            if(mazeOptions[i].label === selectedOption.label) {
                mazeSwitch = i
            }
        }
        switch(mazeSwitch) {
            case 0:
                randomizeWalls()
                break
            case 1:
                generateRecursiveDivisionMaze()
                break
        }
    }

    function valuetext(value) {
        setWallDensity(value / 100)
        return `${value}%`
    }

    return (
        <div className="Wrapper">
            <PathfinderToolbar>
                <div style={{width: 180}}>
                    <Select text={algorithmsOptions[switchAlgorithm]} defaultValue = {algorithmsOptions[0]}
                    onChange={handleAlgoChange} options={algorithmsOptions}/>
                </div>
                <Button onClick={clearVisualVisitedNodes} idleText={'Clear Path'} color={'yellow'}/>
                <Button onClick={visualizePath} idleText={'Visualize Path'} color={'green'}/>
                <Button onClick={reset} idleText={'Reset Board'} color={'red'}/>
                <div style={{width: 180}}>
                    <Select text={heuristicText} defaultValue={heuristicOptions[0]}
                    onChange={handleHeuristicChange} options={heuristicOptions}/>
                </div>
            </PathfinderToolbar>
            <PathfinderResults style={{color:'white'}}>
                <h5>{ResultsText}</h5>
                <h5>{ResultsTwoText}</h5>
            </PathfinderResults>
            {gridWithNode()}
            <PathfinderToolbar>
                <div style={{width: 180}}>
                    <Select menuPlacement="top" text={speedOptions[switchSpeed]} defaultValue={speedOptions[2]}
                    onChange={handleSpeedChange} options={speedOptions}/>
                </div>
                <div style={{width: 250}}>
                    <Select menuPlacement="top" text={{value: 0, label: "Maze Options"}} defaultValue={{value: 0, label: "Maze Options"}}
                    onChange={handleMazeChange} options={mazeOptions}/>
                </div>
                <div>
                    <h5 style={{color: 'white'}}>Wall Density</h5>
                    <Slider
                        aria-label="Wall Density"
                        defaultValue={WallDensity}
                        getAriaValueText={valuetext}
                        color = "secondary"
                        size = "medium"
                        thumbSize = "small"
                        valueLabelDisplay="auto"
                        min={0}
                        max={50}
                    />
                </div>
                {/*<Button onClick={alterWallsBool} idleText={'Customize Walls'} loadingText={'Tap on grid...'} messageDuration={2000} color={'violet'} rounded/>
                <Button onClick={alterStartBool} idleText={'Move Start'} color={'green'} rounded/>
                <Button onClick={alterEndBool} idleText={'Move End'} color={'red'} rounded/>*/}
            </PathfinderToolbar>
        </div>
    );
}

export default Pathfinder;