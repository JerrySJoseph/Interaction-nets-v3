import { Card, Divider, Group, Stack, ThemeIcon, Title, useMantineTheme, Text, TextInput, TextProps, TextInputProps, NumberInput } from '@mantine/core';
import { IconCheck, IconFilterBolt, IconSettings2 } from '@tabler/icons-react';
import { isNumber } from 'lodash';
import React, { ReactNode, RefObject, useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useAppContext } from '../../../data/context/app-context';
import { INode } from '../../../data/models/node';
import NodeComponent from '../NodeComponent/NodeComponent';


const ControlPanel = () => {

    const { inet } = useAppContext();
    const theme = useMantineTheme();

    return (
        <Card style={{ height: '100%' }}>
            <Group spacing='xs'>
                <ThemeIcon size='lg' variant='light'>
                    <IconSettings2 />
                </ThemeIcon>
                <Title size='xs' color={theme.primaryColor}> Control Panel</Title>
            </Group>
            <Card.Section my='xs'>
                <Divider />
            </Card.Section>
            <Stack spacing='xs' mt='xs'>
                {
                    inet.nodes.map(currentNode => (<NodeCardComponent key={currentNode.id} node={currentNode} />))
                }
            </Stack>
        </Card>
    )
}

interface NodeCardComponentProps {
    node: INode,
}

const NodeCardComponent = (props: NodeCardComponentProps) => {

    const { node } = props;
    const { updateNode } = useAppContext();
    const [edit, setEdit] = useState<string>('');


    function handleOnEdit(e: React.MouseEvent<HTMLDivElement>) {
        const { id } = e.currentTarget;
        setEdit(id);
    }

    return (
        <Card p='sm' withBorder>
            <Group>
                <NodeComponent node={node} thumbnail dragDisabled />
                <Stack spacing={0}>
                    <EditableText value={node.label} onChanged={(nV=>updateNode({...node,label:nV}))} />
                    {
                        isNumber(node.value)?
                        <EditableNumber value={node.value} onChanged={(nV=>updateNode({...node,value:nV}))} />
                        : <EditableText value={node.value} onChanged={(nV=>updateNode({...node,value:nV}))} />
                    }
                </Stack>
            </Group>
        </Card>
    )
}

export interface EditableTextProps extends TextProps {
    value: string,
    onChanged?: (text: string) => any
}

const EditableText: React.FC<EditableTextProps> = ({ value, onChanged = () => { }, ...props }) => {

    const [edit, setEdit] = useState(false);
    const [_value, setValue] = useState<string>(value)

    const ref=useRef(null);
    useOutsideAlerter(ref,handleCloseEdit);

    useEffect(()=>{
        setValue(value);
    },[edit])

    function handleCloseEdit(){
        onChanged(_value);
        setEdit(false)
    }


    function handleKeyDown(e:React.KeyboardEvent<HTMLInputElement>){
        if(e.key==='Enter')
            handleCloseEdit();
        else if(e.key==='Escape')
            setEdit(false)
    }


    return (<>
        {!edit && <Text {...props} onClick={() => setEdit(true)}>{value}</Text>}
        {edit && <TextInput ref={ref} size='xs' value={_value} onChange={e => setValue(e.target.value)} onKeyDown={handleKeyDown}/>}
    </>)
}


export interface EditableNumberProps extends TextProps {
    value: number,
    onChanged?: (n: number) => any
}

const EditableNumber: React.FC<EditableNumberProps> = ({ value, onChanged = () => { }, ...props }) => {

    const [edit, setEdit] = useState(false);
    const [_value, setValue] = useState<number>(value)
    const ref=useRef(null);
    useOutsideAlerter(ref,()=>setEdit(false));

    useEffect(()=>{
        setValue(value);
    },[edit])

    function handleCloseEdit(){
        onChanged(_value);
        console.log('new number',_value)
        setEdit(false)
    }


    function handleKeyDown(e:React.KeyboardEvent<HTMLInputElement>){
        if(e.key==='Enter')
            handleCloseEdit();
        else if(e.key==='Escape')
            setEdit(false)
    }

    return (<>
        {!edit && <Text {...props} onClick={() => setEdit(true)}>{value}</Text>}
        {edit && <NumberInput ref={ref} size='xs' value={_value} type='number' onChange={e => setValue(e||0)} onKeyDown={handleKeyDown} />}
    </>)
}


/**
 * Hook that alerts clicks outside of the passed ref
 */



function useOutsideAlerter(ref: RefObject<HTMLElement>,onOutsideclick:()=>any=()=>{}){
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onOutsideclick();
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
    return 
}





export default ControlPanel;