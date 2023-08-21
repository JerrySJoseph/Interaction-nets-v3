import { Button, Group, NumberInput, Select, Stack } from '@mantine/core'
import { number } from 'prop-types'
import React, { useState } from 'react'
import { useAppContext } from '../../../data/context/app-context'
import { generateNewNode, NodeType, Operator } from '../../../data/models/node'


interface FormData {
    type: NodeType,
    value: number,
    operator: Operator
}

interface AddNodeProps {
    onClose: () => any
}


const AddNode = ({onClose}:AddNodeProps) => {

    const { addNode } = useAppContext();
    const [formData, setFormData] = useState<FormData>({
        type: 'Constant',
        value: 100,
        operator: '+'
    })


    function createNode() {
        const node = generateNewNode(formData.type, formData.type === 'Constant' ? formData.value : formData.operator);
        addNode(node);
        onClose();
    }


    return (
        <Stack >
            <Select
                radius='md'
                name='node-type'
                label="Node Type"
                placeholder="Pick one"
                data={[
                    { value: 'Operator', label: 'Operator (+, -, *, /, %)' },
                    { value: 'Constant', label: 'Number' },
                ]}
                value={formData.type}
                onChange={s => setFormData(prev => ({ ...prev, type: s }))}
            />
            {
                formData.type === 'Constant' && <NumberInput
                    value={formData.value}
                    placeholder="Any Number or decimal"
                    label="Add Value for the node"
                    withAsterisk
                    onChange={v => setFormData(prev => ({ ...prev, value: v }))}
                />
            }

            <Button onClick={createNode}>Add node</Button>
        </Stack>
    )
}

export default AddNode