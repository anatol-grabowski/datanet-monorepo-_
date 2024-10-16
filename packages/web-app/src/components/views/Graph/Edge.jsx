import PropTypes from 'prop-types'
import React from 'react'
import styles from './Edge.module.scss'

function Edge(props) {
  const {
    points,
    onMouseDown,
    onDoubleClick,
  } = props
  const [from, to] = points
  return (
    <line className={styles.Edge}
      x1={from[0]}
      y1={from[1]}
      x2={to[0]}
      y2={to[1]}
      onDoubleClick={onDoubleClick}
      onMouseDown={onMouseDown}
      markerEnd="url(#arrow)"
    />
  )
}

Edge.propTypes = {
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
}

export default React.memo(Edge)
