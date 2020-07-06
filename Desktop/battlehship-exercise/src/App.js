import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

const numRows = 10;
const numCols = 10;

const positions = [
  [2,9],
  [2,9],
  [3,9],
  [4,9],
  [5,9],
  [6,9],
  [5,2],
  [5,3],
  [5,4],
  [5,5],
  [8,1],
  [8,2],
  [8,3],
  [3,0],
  [3,1],
  [3,2],
  [0,0],
  [0,1]
]

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array(numCols))
  }

  return rows;
}

const App = () => {
  //state
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid()
  })
  const [hit, sethit] = useState(false);

  const hitRef = useRef(hit);
  hitRef.current = hit;

  //Hit or Miss
  const hitOrMiss = useCallback(() => {
    if (hitRef.current === true) {
      alert("Hit")
    }

    setGrid(currGrid => {
      return produce(currGrid, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            positions.forEach(([x, y]) => {
              const newRow
              if (i === position[0] && j === position[1]) {
                newRow.push(1)
                sethit(true)
                alert("Hit")
              } else {
                newRow.push(0)
                sethit(false)
                alert("Miss")
              }
              gridCopy[i] = newRow
              newRow = []
            })
          }
        }
      })
    })

    setTimeout(hitOrMiss, 100)
  }, [])

  return (
    <>
    <div>
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={Math.floor(Math.random() * 50)}
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1
                })
                setGrid(newGrid)
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? "pink" : undefined,
                border: "solid 1px grey"
              }}
            />
          ))
        )}
      </div>
    </>
  )
}

export default App