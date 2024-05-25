import { action } from '@storybook/addon-actions'
import type { Meta } from '@storybook/react'
import { Edge, ArrowMarker } from '../../../components/views/Graph'
import styles from '../../stories.module.scss'

const meta = {
  component: Edge,
} satisfies Meta<typeof Edge>

export default meta

const edges = [
  {
    points: [
      [10, 20],
      [100, 200],
    ],
    onMouseDown: action('mouse down'),
    onDoubleClick: action('double click'),
  },
]

export const Regular = () => (
  <div>
    <svg className={styles.Container}>
      <defs>
        <ArrowMarker />
      </defs>
      <g>
        <Edge {...edges[0]} />
      </g>
    </svg>
  </div>
)
