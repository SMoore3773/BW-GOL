
import {presetPatterns} from './presets'

let toggleRun;
let reset;
let iterate;

const game = (props) =>{
    console.log('props', props)
    return(r) =>{
        console.log('r', r)

        const iteration = props.iteration;
        const pixelWidth = props.pixelWidth;
        const cells = props.cells;
        const cellSize = pixelWidth/cells;

        
        let generation = 0;
        let running = false;
        const newCells = [];
        const deadCells = [];
        let grid;
        let gridBuffer;
        const posChange = new Set();


        let lifeInterval = setInterval(r.iterate, iteration);


        r.setup = () =>{
            const canvas = r.createCanvas(pixelWidth, pixelWidth);
            canvas.mouseClicked(r.clickHandler);
            
            r.stroke(200);
            r.strokeCap(r.ROUND);
            r.strokeWeight(1)
            
            r.noLoop();
            r.noSmooth();

            r.setGrid();
            
            r.setPreset();
        };

        r.setGrid = () =>{
            grid = Array(cells).fill(null).map(() =>{
                return Array(cells).fill(null).map(()=>{
                    return 0
                   
                });
            });
            gridBuffer = Array(cells).fill(null).map(()=>{
                return Array(cells).fill(0);
            });
            r.bufferInit()
        };

        r.setPreset = () =>{
            const center = Math.floor(cells/2);
            presetPatterns[props.preset].forEach((set) =>{
                grid[set[0]+ center][set[1]+ center] = 1;
            });
        };

        r.clickHandler = () =>{
            if (!running) {
                const [x, y] = [Math.floor(r.mouseX/cellSize), Math.floor(r.mouseY/cellSize)];
                if (grid[x][y]) {
                    grid[x][y] = 0;
                    } else {
                    grid[x][y] = 1;
                    }
                r.redraw();
                }
            return false;
        }

        r.toggleRun = () =>{
            if(running){
                clearInterval(lifeInterval);
            }else{
                lifeInterval = setInterval(r.iterate, iteration);
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

        r.setGeneration = (inputGen) =>{
            generation = inputGen;
            props.setGeneration(generation);
        };

        r.iterate = () =>{
            const temp = grid;
            grid = gridBuffer;
            gridBuffer = temp;

            r.setGeneration(generation + 1);

            r.action();
        };

        r.draw = () =>{
            for(let i of Array(cells).keys()) {
                for (let j of Array(cells).keys()) {
                    if (grid[i][j]){
                        r.fill(0);
                    }else{
                        r.fill(255);
                    }
                    r.rect(i * cellSize, j * cellSize, cellSize);
                }
            }
            r.bufferInit();
        };

        r.action = () =>{
            r.fill(0);
            newCells.forEach((newCell)=>{
                r.rect(newCell[0] * cellSize, newCell[1] * cellSize, cellSize)
            });
            r.fill(255);
            deadCells.forEach((deadCell)=>{
                r.rect(deadCell[0] * cells, deadCell[1] * cellSize, cellSize)
            });
            r.runbuffer();
        }

        r.bufferInit = () =>{
            newCells.length = 0
            deadCells.length = 0
            grid.forEach(function(column, i){
                const bufferColumn = gridBuffer[i];
                column.forEach(function(cellval, j){
                    bufferColumn[j] = r.nextCellState(i,j)
                });
            });
        };

        
        r.runbuffer = () =>{
            const changes = newCells.concat(deadCells);
            newCells.length = 0;
            deadCells.length = 0;
            changes.forEach((cell)=>{
                posChange.add(`${cell[0]}, ${cell[1]}`);
                adj.forEach(function(set){
                    const x = (cell[0] + set[0] + cells) % cells;
                    const y = (cell[1] + set[1] + cells) % cells;
                    posChange.add(`${x},${y}`);
                });
            });
            posChange.forEach((cellStr) =>{
                const cell = cellStr.split(',');
                const x = parseInt(cell[0]);
                const y = parseInt(cell[1]);
                gridBuffer[x][y] = r.nextCellState(x,y)
            });
            posChange.clear();
        };

        
        r.nextCellState = (i, j) =>{
            const neighbors = r.countAdj(i, j);

            if (grid[i][j]){
                if (neighbors === 2 || neighbors ===3){
                    return 1;
                }else{
                    deadCells.push([i,j]);
                    return 0;
                }
            }else{
                if (neighbors ===3){
                    newCells.push([i,j]);
                    return 1;
                }else{
                    return 0;
                }
            }
        };

        const adj = [
            [0,1],[1,0],[-1,0],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]
        ];

        r.countAdj = (i,j) => {
            return adj.reduce(function(count, set) {
                const x = i + set[0];
                const y = j + set[1];
                if (
                    x >= cells ||
                    x < 0 ||
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