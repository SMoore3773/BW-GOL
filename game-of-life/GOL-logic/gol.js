
let toggleRun;
let reset;
let iterate;

const game = (props) =>{

    return(p5) =>{

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
        
        p5.setup = () =>{
            const canvas = p5.createCanvas()
            
        }
        function makeGrid() {
            
            grid = new Array(col);
            for (let i = 0; i< col; i++) {
                grid[i] = new Array(row);
            }
        
            tempGrid = new Array(col);
            for (let i = 0; i<col; i++) {
                tempGrid[i] = new Array(row);
            }   
        }

    }
}


