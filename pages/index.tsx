import type { NextPage } from 'next'
import { Card, Grid } from '@mantine/core'
import CanvasEditor from '../ui/components/canvas/CanvasEditor'
import ControlPanel from '../ui/components/ControlPanel/ControlPanel'
import CanvasResult from '../ui/components/canvas/CanvasResult'

const Home: NextPage = () => {
  return (
    <Grid style={{height:'100%'}}>
      <Grid.Col span={5}>
       <CanvasEditor/>
      </Grid.Col>
      <Grid.Col span={2}>
        <ControlPanel/>
      </Grid.Col>
      <Grid.Col span={5}>
        <CanvasResult/>
      </Grid.Col>
    </Grid>
  )
}

export default Home
