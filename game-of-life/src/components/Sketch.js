import React, {useState, useEffect} from 'react';
import { game, toggleRun, reset, iterate } from '../golLogic/gol';
import {presetPatterns} from '../golLogic/presets'

function Sketch() {
    let [cells, setCells] = useState(25);
    let [pixelWidth, setPixelWidth] = useState(650);
    let [iteration, setIteration] = useState(100);
    let [running, setRunning] = useState(false);
    let [generation, setGeneration] = useState(0);
    
    let [preset, setPreset] = useState('empty')
    let [sketchOpts, setSketchOpts] = useState({
        setGeneration: setGeneration,
        setRunning: setRunning,
        cells: cells,
        pixelWidth: pixelWidth,
        iteration: iteration,
        
        preset: preset
    });
    let [golGame, setGolGame] = useState();

    useEffect(() =>{
        setSketchOpts({
            ...sketchOpts,
            cells: cells,
            pixelWidth: pixelWidth,
            
            iteration: iteration,
            preset: preset
        });
    }, [ cells, pixelWidth, iteration,  preset]);

    useEffect(() => {
        setGolGame(new window.p5(game(sketchOpts), "sketch"));
    }, []);


    const handleSubmit = (event) =>{
        golGame.remove();
        setGeneration(0);
        setGolGame(new window.p5(game(sketchOpts), "sketch"));
        event.preventDefault();
    };

    const cellChange = (event) =>{
        if (event.target.value === ""){
            setCells(0);
        }else{
            setCells(parseInt(event.target.value));
        }
    };

    const iterationChange = (event) =>{
        if (event.target.value ===""){
            setIteration(0);
        }else{
            setIteration(parseInt(event.target.value));
        }
    };

    const presetChange = (event) =>{
        setPreset(event.target.value);
    };


    return (
        <>
            <div id = 'sketch'>
            </div>
            <div> Generation: {generation}</div>
            <div className='game'>
                <button onClick={()=>{toggleRun()}}>{!running && "Start"}{running && "pause"}</button>
                <button onClick={reset}>Reset</button>
                <button onClick={iterate}>Next Iteration</button>

                <form onSubmit={handleSubmit}>
                    <label>
                        Number of cells on an axis:  
                        <input
                        type='text'
                        value={cells.toString()}
                        onChange={cellChange}
                        />
                    </label>
                    <br/>
                    <label>
                        Iteration time in ms: 
                        <input 
                        type="text"
                        value={iteration.toString()}
                        onChange={iterationChange}
                        />
                    </label>
                    <br/>
                    <label>
                        Load preset:  
                        <select 
                        value={preset} onChange={presetChange}>
                            { Object.keys(presetPatterns).map((key) => (
                            <option key={key} value={key}> {key} </option>
                            )) }
                        </select>
                    </label>
                    <br/>
                    <input 
                    type="submit"
                    value="update grid"
                    />
                </form>
                <p>From Wikipedia:
                The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.
                </p>
                <p>Rules of the game</p>
                <ol>
                    <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                    <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                    <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                    <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
</li>
                </ol>
                <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns">Wiki for the Game of Life</a>
            </div>
        </>
    )
};
export default Sketch;