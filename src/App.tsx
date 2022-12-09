import Slider from './components/Slider'
import items from './assets/data'
import Table from './components/Table'
import { useState } from 'react'

function App() {
  const [slideWidth, setSlideWidth] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const [offsetX, setOffsetX] = useState(0)

  return (
    <div className="app">
      <Slider
        items={items}
        setSlideWidth={setSlideWidth}
        setScrollLeft={setScrollLeft}
        offsetX={offsetX}
      />
      <Table
        items={items}
        slideWidth={slideWidth}
        scrollLeft={scrollLeft} 
        setOffsetX={setOffsetX}/>
    </div>
  )
}

export default App
