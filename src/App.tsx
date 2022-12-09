import Slider from './components/Slider'
import items from './assets/data'
import Table from './components/Table'
import { useState } from 'react'

function App() {
  const [slideWidth, setSlideWidth] = useState(0)

  return (
    <div className="app">
      <Slider
        items={items}
        setSlideWidth={setSlideWidth}
      />
      <Table
        items={items}
        slideWidth={slideWidth} />
    </div>
  )
}

export default App
