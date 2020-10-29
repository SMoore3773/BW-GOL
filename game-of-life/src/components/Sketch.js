import React, {useState, useEffect} from 'react';
import { game, toggleRun, reset, iterate } from '../golLogic/gol';
import {presetPatterns} from '../golLogic/presets'

function Sketch() {
    let [cells, setCells] = useState(25);
    let [pixelWidth, setPixelWidth] = useState(600);
    let [iteration, setIteration] = useState(30);
    let [running, setRunning] = useState(false);
    let [generation, setGeneration] = useState(0);
    let [randomStart, setRandomStart] = useState(0);
    let [preset, setPreset] = useState('empty')
    let [sketchOpts, setSketchOpts] = useState({
        setGeneration: setGeneration,
        setRunning: setRunning,
        cells: cells,
        pixelWidth: pixelWidth,
        iteration: iteration,
        randomStart: randomStart,
        preset: preset
    });
    let [golGame, setGolGame] = useState();

    useEffect(() =>{
        setSketchOpts({
            ...sketchOpts,
            cells: cells,
            pixelWidth: pixelWidth,
            randomStart: randomStart,
            iteration: iteration,
            preset: preset
        });
    }, [ cells, pixelWidth, iteration, randomStart, preset]);

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
                
            </div>
        </>
    )
};
export default Sketch;