const presetPatterns = {
    'empty':[],
    'block':[
        [0,0],
        [1,0],
        [0,1],
        [1,1]
    ],
    'blinker': [
        [-1, 0],
        [0,  0],
        [1,  0]
    ],
    'glider': [
        [0, -1],
        [1,  0],
        [-1, 1],
        [0,  1],
        [1,  1]
      ]
}

export { presetPatterns };