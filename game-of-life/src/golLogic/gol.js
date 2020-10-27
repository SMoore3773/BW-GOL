
import {preset} from './presets'

let toggleRun;
let reset;
let iterate;

const game = (props) =>{

    return(r) =>{

        const iteration = props.iteration;
        const pixelWidth = props.puxelWidth;
        const cells = props.cells;
        const cellSize = pixelWidth/cells;

        let generation = 0;
        let running = false;
        const births = [];
        const deaths = [];
        let grid;
        let gridBuffer;

        let interval = setInterval(r.iterate, iteration);

        r.setup = () =>{
            const canvas = r.createCanvas(pixelWidth, pixelWidth);
            canvas.mouseClicked(r.clickHandler);
            
            r.stroke(200);
            r.strokeCap(r.SQUARE);
            r.strokeWeight(2)
            
            r.noLoop();
            r.noSmooth();

            r.setGrid();
            
            r.setPreset();
        };

        r.setGrid = () =>{
            grid = Array(cells).fill(null).map(() =>{
                return Array(cells).fill(null).map(()=>{
                    if (Math.random() > props.randomStart / 100){
                        return 0;
                    }else{
                        return 1;
                    }
                });
            });
            gridBuffer = Array(cells).fill(null).map(()=>{
                return Array(cells).fill(0);
            });
            r.bufferInit()
        };

        r.setPreset = () =>{
            const center = Math.floor(cells/2);
            preset[props.preset].forEach((set) =>{
                grid[set[0]+ center][set[1]+ center] = 1;
            });
        };

        r.clickHandler = () =>{
            if (!running) {
                const [x, y] = r.mouseCoord();
                if (grid[x][y]) {
                    grid[x][y] = 0;
                    } else {
                    grid[x][y] = 1;
                    }
                r.redraw();
                }
            return false;
        }

        r.mouseCoord = () =>{
            return[Math.floor(r.mouseX/cellSize), Math.floor(r.mouseY/cellSize)]
        };

        r.toggleRun = () =>{
            if(running){
                clearInterval(interval);
            }else{
                interval = setInterval(r.iterate, iteration);
            }
            running = !running;
            props.setRunning(running);
        };

        r.reset = () =>{
            r.setGeneration(0);
            if (running){
                r.toggleRun();
            }
            r.setGrid();
            r.redraw();
        };

        r.setGeneration = (propsGen) =>{
            generation = propsGen;
            props.setGeneration(generation);
        };

        r.iterate = () =>{
            const temp = grid;
            grid = gridBuffer;
            gridBuffer = temp;

            r.setGeneration(generation + 1);

            r.draw();
        }

        r.draw = () =>{
            for(let i of Array(cells).keys()){
                for (let j of Array(cells).keys()){
                    if (grid[i][j]){
                        r.fill(50);
                    }else{
                        r.fill(200);
                    }
                    r.rect(i * cellSize, j * cellSize, cellSize);
                }
            }
            r.bufferInit();
        };

        r.bufferInit = () =>{
            births.length = 0
            deaths.length = 0
            grid.forEach(function(column, i){
                const bufferColumn = gridBuffer[i];
                column.forEach(function(j){
                    bufferColumn[j] = r.nextCellState(i,j)
                });
            });
        };

        r.nextCellState = (i, j) =>{
            const neighbors = r.countAdj(i, j);

            if (grid[i][j]){
                if (neighbors === 2 || neighbors ===3){
                    return 1;
                }else{
                    deaths.push([i,j]);
                    return 0;
                }
            }else{
                if (neighbors ===3){
                    births.push([i,j]);
                    return 1;
                }else{
                    return 0;
                }
            }
        };

        const adj = [
            [0,1],[1,0],[-1,0],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]
        ]

        r.countAdj = (i,j)=>{
            return adj.reduce(function(count, pair){
                const x = i + pair[0];
                const y = j + pair[1];
                if (
                    x >= cells ||
                    x < 0||
                    y >= cells ||
                    y < 0
                    ){
                        return count;
                    }else{
                        return count + grid[x][y];
                    }
            }, 0);
        };


        toggleRun = r.toggleRun;
        reset = r.reset;
        iterate = r.iterate;
    };     
};



export { game, toggleRun, reset, iterate };