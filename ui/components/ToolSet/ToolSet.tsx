import { ActionIcon, Card, Divider, Grid, Group, Stack, Text, Title, Tooltip } from '@mantine/core'
import { IconArrowBarToUp, IconArrowUpRightCircle, IconCrosshair, IconLine, IconNumber, IconNumber1, IconSum } from '@tabler/icons-react';
import React from 'react'


export const ToolType = {
    NUMBER: 0,
    AUX_LINK: 1,
    PRINCIPAL_LINK: 2,
    OPERATOR: 3,
    MOVE: 4
}

interface ToolSetProps {
    currentTool: number,
    onToolChange: (tool: number) => any,
}

const toolSetMenuData = [
    { label: 'Number Node', icon: <IconNumber1 />, type: ToolType.NUMBER },
    { label: 'Auxilary Link', icon: <IconLine />, type: ToolType.AUX_LINK },
    { label: 'Principal Link', icon: <IconArrowUpRightCircle />, type: ToolType.PRINCIPAL_LINK },
    { label: 'Operator Node', icon: <IconSum />, type: ToolType.OPERATOR },
    { label: 'Move Node', icon: <IconCrosshair />, type: ToolType.MOVE },
]


const ToolSet = (props: ToolSetProps) => {

    const { currentTool = -1, onToolChange } = props;

    return (
        <Card style={{ height: '100%' }} >
            <Card.Section>
                <Title size='xs' p='xs' ta='center'>Components</Title>
                <Divider />
            </Card.Section>
            <Grid p='sm'>
                {
                    toolSetMenuData.map(menuItem => (
                        <Grid.Col span={6} key={menuItem.label}>
                            <Group position='center'>
                                    <Tooltip label={menuItem.label} position='right' withArrow color='orange' openDelay={500} withinPortal >
                                        <ActionIcon variant={currentTool === menuItem.type ? 'filled' : 'light'} size='xl' color='orange' onClick={() => onToolChange(menuItem.type)}>
                                            {menuItem.icon}
                                        </ActionIcon>
                                    </Tooltip>
                                </Group>
                        </Grid.Col>
                    ))
                }
            </Grid>

        </Card>
    )
}

export default ToolSet