
import { useState } from 'react'
import './App.css'

interface TCell {
  row: number,
  column: number
}
function App() {
  const [card, setCard] = useState([
    [1, 0, 3, 1],
    [2, 0, 2, 0],
    [3, 4, 0, 4]
  ])

  const [ isReveled, setIsReveled] = useState(new Array(card.length).fill("").map(() => new Array(card[0].length).fill(false)))
  
  

  const [ firstItem, setFirstItem ] = useState<TCell>()

  function handleSelectedCard (row: number, column: number) {
    const clickedNumber: number = card[row][column]
    const newIsReveled = [...isReveled]
    newIsReveled[row][column] = true 
    setIsReveled(newIsReveled)    
   

   if(firstItem) {
    const firstNumberChoosed = card[firstItem.row][firstItem.column]
    if(firstNumberChoosed === clickedNumber){
      console.log('Acertou')
    }else{
     setTimeout(() => {
      newIsReveled[firstItem.row][firstItem.column] = false 
      newIsReveled[row][column] = false 
      setIsReveled([...newIsReveled])   
     }, 1000)
    }
  setFirstItem(undefined)
   }else{
    setFirstItem({
      row,
      column,
    })
   }
  }
  return (
    <div className="App">
      <div className="grid-container">
        {card.map((linha, linhaIndex) => (
          <div className="linha" key={linhaIndex}>
            {linha.map((numero, numeroIndex) =>
              <div 
              className="card" 
              key={numeroIndex} 
              onClick={() => handleSelectedCard(linhaIndex, numeroIndex)}>
                {isReveled[linhaIndex][numeroIndex] ? numero : ''}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
