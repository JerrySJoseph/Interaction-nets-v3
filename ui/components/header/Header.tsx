import { Avatar, Burger, Button, Group, Header as MantineHeader, HeaderProps as MantineHeaderProps, MediaQuery, Text, useMantineTheme } from '@mantine/core'
import { ColorSchemeToggle } from '../colorschemetoggle/ColorSchemeToggle';
import {IconPlayerPlay} from '@tabler/icons-react'
import { useAppContext } from '../../../data/context/app-context';

type HeaderProps = Omit<MantineHeaderProps, 'children'> & {
    open: boolean
    toggleOpen: () => any
}

const Header = (headerProps: HeaderProps) => {

    const theme = useMantineTheme()

    const {reduceCurrentInet}=useAppContext();
    

    return (
        <MantineHeader {...headerProps}>
            <MediaQuery smallerThan='lg' styles={{ justifyContent: 'start' }}>
                <Group position='apart'>
                    <MediaQuery largerThan="lg" styles={{ display: 'none' }}>
                        <Burger
                            opened={headerProps.open}
                            onClick={headerProps.toggleOpen}
                            size="sm"
                            color={theme.colors.gray[6]}
                            mr="xl"
                        />
                    </MediaQuery>

                    <Group >
                        <Avatar src='/img/logo.png' />
                        <Text size='xl' fw='bold'>Interaction Nets</Text>
                    </Group>

                    <Button leftIcon={<IconPlayerPlay/>} onClick={reduceCurrentInet}>Reduce</Button>
                    
                    <ColorSchemeToggle/>

                </Group>
            </MediaQuery>
        </MantineHeader>
    )
}

export default Header