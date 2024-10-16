import PropTypes from 'prop-types'
import React from 'react'
import Node from './Node'
import withGroupedEvents from '../../hocs/withGroupedEvents'
import styles from './Nodes.module.scss'

function Nodes(props) {
  const {
    nodes,
    onNodeMouseDown,
    onNodeMouseUp,
    onNodeDoubleClick
  } = props
  return (
    <div className={styles.Nodes}>
      {
        nodes.map(node => (
          <Node
            key={node.id}
            {...node}
            onMouseDown={onNodeMouseDown(node)}
            onMouseUp={onNodeMouseUp(node)}
            onDoubleClick={onNodeDoubleClick(node)}
          />
        ))
      }
    </div>
  )
}

Nodes.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onNodeMouseDown: PropTypes.func,
  onNodeMouseUp: PropTypes.func,
  onNodeDoubleClick: PropTypes.func,
}

const NodesWithGroupedHandlers = withGroupedEvents([
  'onNodeMouseDown',
  'onNodeMouseUp',
  'onNodeDoubleClick',
])(Nodes)

export default NodesWithGroupedHandlers
