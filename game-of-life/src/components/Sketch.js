import React, {useState, useEffect} from 'react';
import { game, toggleRun, reset, iterate } from '../golLogic/gol';
import{ preset } from '../golLogic/presets';

function Sketch() {
    let [cells, setCells] = useState(40);
    let [pixelWidth, setPixelWidth] = useState(600);
    let [iteration, setIteration] = useState(30);
    let [running, setRunning] = useState(false);
    let [generation, setGeneration] = useState(0);
    let [randomStart, setRandomStart] = useState(30);
    let [preset, setPreset] = useState('block')
    let [sketchOpts, setSketchOpts] = useState({
        setGeneration: setGeneration,
        setRunning: setRunning,
        cells: cells,
        pixelWidth: pixelWidth,
        iteration: iteration,
        randomStart: randomStart,
        preset: preset
    });
    let [gol, setGol] = useState();

    useEffect(() =>{
        setSketchOpts({
            ...setSketchOpts,
            cells: cells,
            pixelWidth: pixelWidth,
            randomStart: randomStart,
            iteration: iteration,
            preset: preset
        });
    }, [ cells, pixelWidth, iteration, randomStart, preset]);

    useEffect(() => {
        setGol(new window.p5(game(sketchOpts), "sketch"));
    }, []);


    const handleSubmit = (event) =>{
        gol.remove();
        setGeneration(0);
        setGol(new window.p5(game(sketchOpts), "sketch"));
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
            <div class='game'>
                <button onClick={()=>{toggleRun()}}>{!running && "Start"}{running && "pause"}</button>
                <button onClick={reset}>Reset</button>
                <button onClick={iterate}>Next Iteration</button>

                <form onSubmit={handleSubmit}>
                    <label>
                        Number of cells on an axis:  
                        <input
                        type='text'
                        value={cells.toString()}
                        conChange={cellChange}
                        />
                    </label>
                    <label>
                        Iteration time in ms: 
                        <input 
                        type="text"
                        value={iteration.toString()}
                        onChange={iterationChange}
                        />
                    </label>
                    <label>
                        Load preset:  
                        <select value={preset} onChange={presetChange}>
                            { Object.keys(preset).map((key) => (
                            <option key={key} value={key}>{key}</option>
                            )) }
                        </select>
                    </label>
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