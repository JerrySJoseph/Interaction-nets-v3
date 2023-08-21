import { Button, Modal, Stack } from '@mantine/core'
import React, { useState } from 'react'
import AddNode from '../../forms/addNode/AddNode';
const ControlPanel = () => {

    const [opened, setOpened] = useState(false);
    const [title,setTitle]=useState<String>('');
    const [form,setForm]=useState<React.ReactNode>();

    function handleAddNode(){
       setOpened(true);
    }


    return (
        <div className="control-panel">
            <Stack>
                <Button onClick={handleAddNode}>Add Node</Button>
            </Stack>
            <Modal opened={opened} onClose={()=>setOpened(false)} title="Add node" centered radius='md' withCloseButton>
                <AddNode onClose={()=>setOpened(false)}/>
            </Modal>

        </div>
    )
}

export default ControlPanel