import React, { useEffect, useState } from "react";
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

const TimeBasedModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isTimeMatched, setIsTimeMatched] = useState(false);
  console.log(isTimeMatched, "time modal match");

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const polandTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Warsaw",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).formatToParts(now);

      const hour = Number(
        polandTime.find((part) => part.type === "hour")?.value || 0
      );
      const minute = Number(
        polandTime.find((part) => part.type === "minute")?.value || 0
      );

      console.log(`Poland Time: ${hour}:${minute}`);

      if (hour < 10 || hour >= 22) {
        setIsTimeMatched(true);
        onOpen();
      } else {
        setIsTimeMatched(false);
        onClose();
      }
    };

    checkTime();
  }, [onOpen, onClose]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          background="white"
          margin="auto"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p="25px"
          gap="15px"
          w={["90%", "80%", "80%"]}
        >
          <ModalHeader textAlign="center" mt="3vh">Niestety nasze godziny pracy dobiegły końca.</ModalHeader>
          <ModalCloseButton />
          <ModalBody flexDir="column">
            <Flex alignItems="center" gap="5%">
              <CustomSVG />
              <Flex flexDirection="column">
                <Text>Na pewno wrócimy między</Text>
                <Text fontSize="30px" fontWeight="700" alignSelf="center">11:00 do 23:00</Text>
              </Flex>
            </Flex>
            <Text mt="2vh">
              W międzyczasie możesz złożyć zamówienie w przedsprzedaży...
            </Text>
          </ModalBody>
          <Button color="white" onClick={onClose} bg="#418a91" w="60% 80%" alignSelf="center">
            Zamów w przedsprzedaży
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TimeBasedModal;
