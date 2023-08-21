import type { NextPage } from 'next'
import { Card, Grid } from '@mantine/core'
import Canvas from '../ui/components/canvas/Canvas'

const Home: NextPage = () => {
  return (
    <Grid style={{height:'100%'}}>
      <Grid.Col span={8}>
       <Canvas/>
      </Grid.Col>
      <Grid.Col span={4} style={{height:'100%'}}>
        
      </Grid.Col>
    </Grid>
  )
}

export default Home
