import { Flex, useMediaQuery } from '@chakra-ui/react'
import AppFooterNav from './AppFooterNav'
import AppFooterAddress from './AppFooterAddress'
import AppFooterHours from './AppFooterHours'
import AppFooterContacts from './AppFooterContacts'
import AppFooterDocs from "./AppFooterDocs";

const AppFooterInfo = () => {
    const [isLessThan768] = useMediaQuery('(max-width: 768px)')

    return (
        <Flex flexDir="column" align="center" gap={8} w="100%">
            <Flex
                gap={4}
                justify="space-around"
                w="85%"
                flexDir={isLessThan768 ? 'column' : 'row'}
            >
                <AppFooterNav/>
                <AppFooterAddress/>
                <AppFooterHours/>
                <AppFooterContacts/>
            </Flex>

            <Flex justify="space-around" w="85%">
                <AppFooterDocs/>
            </Flex>
        </Flex>
    )
}

    export default AppFooterInfo
