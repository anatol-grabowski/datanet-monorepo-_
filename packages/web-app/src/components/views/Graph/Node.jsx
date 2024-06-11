import PropTypes from 'prop-types'
import React from 'react'
import { PaperclipIcon } from '../Primitives'
import ReactMarkdownMath from './ReactMarkdownMath'
import { stylesheet } from 'astroturf'

const styles = stylesheet`
.NodeWrapper {
  position: absolute;
  transform: translate(-50%, -50%);
  width: max-content;

  .Node {
    pointer-events: all;
    display: inline-block;
    font-size: 1.5rem;
    border: solid black 2px;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: rgba(255, 255, 187, 0.9);
    cursor: default;
    user-select: none;

    & > div > :first-child {
      margin-top: 0.0rem;
    }

    & > div > :last-child {
      margin-bottom: 0.0rem;
    }

    &:hover {
      border-width: 4px;
    }

    .MarkdownWrapper {
      & > * {
        margin: 0;
      }

      * {
        pointer-events: none;
      }

      a {
        pointer-events: all;
      }

      ul {
        padding-left: 1.7rem;
        white-space: nowrap;
      }

      li {
        white-space: pre-wrap;
      }

      p {
        white-space: pre-wrap;
      }
    }
  }
}

.node .node-tags {
  border-width: 1px-solid-black;
}

.node-tags .node-tag {
  display: inline-block;
  border: 2px solid black;
  border-radius: 5px;
  margin: 0.1rem;
  padding: 0 0.1rem;
  background: #ffd;
}
`

const PureReactMarkdown = React.memo(ReactMarkdownMath)
const preventDefault = evt => evt.preventDefault()

export default class Node extends React.Component {
  onMouseDown = (event) => {
    const isLink = event.target.nodeName.toLowerCase() === 'a'
    if (isLink) return
    const { onMouseDown } = this.props
    onMouseDown(event)
  }

  render() {
    const {
      coords,
      text,
      details,
      tags,
      attachments,
      onMouseUp,
      onDoubleClick,
    } = this.props
    const { onMouseDown } = this
    const [x, y] = coords
    return (
      <div
        className={styles.NodeWrapper}
        style={{
          top: y + 'px',
          left: x + 'px',
        }}
      >
        <div
          className={styles.Node}
          title={details}
          onMouseDown={onMouseDown}
          onContextMenu={preventDefault}
          onMouseUp={onMouseUp}
          onDoubleClick={onDoubleClick}
        >
          <PureReactMarkdown
            className={styles.MarkdownWrapper}
          >
            {text}
          </PureReactMarkdown>
          {/* <NodeTags tags={tags}/> */}
        </div>
        {attachments.length > 0 && <PaperclipIcon /> }
      </div>
    )
  }
}

Node.defaultProps = {
  tags: [],
  attachments: [],
}

Node.propTypes = {
  coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  text: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  attachments: PropTypes.arrayOf(PropTypes.object),
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
}

// const NodeTags = ({tags}) => (
//   <div className='node-tags'>
//     {tags.map((tag, i) => <NodeTag key={i} text={tag}/>)}
//   </div>
// )

// const NodeTag = ({text}) => (
//   <div className='node-tag'>{text}</div>
// )
