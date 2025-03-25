import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text, Flex,
} from '@chakra-ui/react'
import CustomSVG from '../assets/icons/sleep'
import useWorkingHours from '../hooks/useWorkingHours'

interface Props {
  children: React.ReactNode
  header: string
  openSignal?: boolean
  setModalIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}
const TimeBasedModal = ({children , header, openSignal=true, setModalIsOpen=undefined}:Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
 //  const [isTimeMatched, setIsTimeMatched] = useState(false);
  const { todayWorkingHours, isClosed } = useWorkingHours()
  useEffect(() => {
      if (isClosed && openSignal) {
       // setIsTimeMatched(true);
        onOpen();
      }

  }, [onOpen, isClosed]);

  useEffect(() => {
    if(openSignal && setModalIsOpen){
      onOpen();
      setModalIsOpen(false)
    }
  }, [onOpen, openSignal])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          background="white.200"
          margin="auto"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p="25px"
          gap="15px"
          w={["90%", "80%", "80%"]}
        >
          <ModalHeader textAlign="center" mt="3vh">{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody flexDir="column">
            <Flex alignItems="center" gap="5%">
              <CustomSVG />
              <Flex flexDirection="column">
                <Text>Na pewno wrócimy między</Text>
                <Text fontSize="30px" fontWeight="700" alignSelf="center">{todayWorkingHours.open} do {todayWorkingHours.closed}</Text>
              </Flex>
            </Flex>
            <Text mt="2vh">
              {children}
            </Text>
          </ModalBody>
          <Button color="white" onClick={onClose} bg="blue.100" w="60% 80%" alignSelf="center">
            Zamów w przedsprzedaży
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TimeBasedModal;
