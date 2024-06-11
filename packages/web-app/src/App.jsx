import React, { useState, useEffect, useCallback } from 'react'
import './index.css'
import GraphApi from './api/graph.api'
import { GraphEditor } from './components/containers'
import { useParams } from 'react-router-dom'

const helpText = ``

const App = (props) => {
  const [backgroundText, setBackgroundText] = useState(helpText)
  const [graph, setGraph] = useState(null)

  const { graph: graphName } = useParams()

  const handleKeyDown = useCallback((event) => {
    let charCode = String.fromCharCode(event.which).toLowerCase()
    if ((event.ctrlKey || event.metaKey) && charCode === 's') {
      const start = Date.now()
      event.preventDefault()
      console.log('Ctrl + S pressed')
      if (!graph) return
      setBackgroundText(helpText + 'Saving ' + graphName)
      GraphApi.saveGraph(graph, graphName)
        .then(() => setBackgroundText(helpText + 'Saved ' + graphName + '\n' + new Date() + '\n' + (Date.now() - start) + ' ms'))
        .catch(err => setBackgroundText(helpText + 'Error while saving\n' + err))
    }
  }, [graph, graphName])

  const openGraph = useCallback(() => {
    setBackgroundText(helpText + 'Opening graph ' + graphName)
    const start = Date.now()
    GraphApi.getGraph(graphName ?? 'test400')
      .then(graph => {
        window.g = graph
        setGraph(graph)
        setBackgroundText(helpText + 'Opened graph ' + graphName + '\n' + (Date.now() - start) + ' ms')
      })
      .catch(err => {
        setBackgroundText(helpText + 'Error while opening\n' + err)
      })
  }, [graphName])

  useEffect(() => {
    openGraph()
  }, [openGraph])

  useEffect(() => {
    const handlePropsChange = () => {
      openGraph()
    }
    handlePropsChange()
  }, [props, openGraph])

  return (
    <div>
      <div className='graph-container'
        onKeyDown={handleKeyDown}
        tabIndex="0"
      >
        <div className='graph-info-text'>{backgroundText}</div>
        {graph && <GraphEditor graph={graph} />}
      </div>
    </div>
  )
}

export default App
