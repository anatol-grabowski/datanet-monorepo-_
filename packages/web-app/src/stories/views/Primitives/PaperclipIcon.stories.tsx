import type { Meta } from '@storybook/react'
import { PaperclipIcon } from '../../../components/views/Primitives'
import styles from '../../stories.module.scss'

const meta = {
  component: PaperclipIcon,
} satisfies Meta<typeof PaperclipIcon>

export default meta

export const Regular = () => (
  <div>
    <div
      className={styles.Container}
      style={{position: 'absolute', top: '50px', left: '50px', width: '100px'}}
    >
      <PaperclipIcon />
    </div>
  </div>
)
