import type { Meta } from '@storybook/react'
import cx from 'classnames'
import { action } from '@storybook/addon-actions'
import { Node } from '../../../components/views/Graph'
import styles from '../../stories.module.scss'

const meta = {
  component: Node,
} satisfies Meta<typeof Node>

export default meta

const mouseActions = {
  onMouseDown: action('mouse down'),
  onMouseUp: action('mouse up'),
  onDoubleClick: action('double click'),
}

const nodes = [
  {
    id: '435',
    coords: [100, 50],
    text: 'hello 100, 50',
    details: 'hint',
    ...mouseActions
  },
  {
    id: 'fds',
    coords: [200, 50],
    text: 'hello `markdown`; 200, 50',
    details: '',
    ...mouseActions
  },
  {
    id: '54hj',
    coords: [200, 200],
    text: 'hello\ntwo *lines*;of $s$ when $u = 10\\frac{m}{s}$ 200',
    details: '',
    ...mouseActions
  },
]

export const Regular = () => (
  <div>
    <div className={cx(styles.Container, styles.rel)}>
      <Node {...nodes[0]} />
    </div>
    <div className={cx(styles.Container, styles.rel)}>
      <Node {...nodes[1]} />
      <Node {...nodes[2]} />
    </div>
  </div>
)
