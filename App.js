
import React from 'react';
import { NativeBaseProvider, StatusBar, VStack, Center, PresenceTransition, Switch, Image, Pressable, HStack, Slide, Alert, Text, Box, CheckIcon, Stagger, Icon, IconButton, Button, useDisclose } from 'native-base';
import { SafeAreaView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';


const Stag = () => {
  const {
    isOpen,
    onToggle
  } = useDisclose();
  return <Center>
    <Box alignItems="center" minH="220">
      <Stagger visible={isOpen} initial={{
        opacity: 0,
        scale: 0,
        translateY: 34
      }} animate={{
        translateY: 0,
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          mass: 0.8,
          stagger: {
            offset: 30,
            reverse: true
          }
        }
      }} exit={{
        translateY: 34,
        scale: 0.5,
        opacity: 0,
        transition: {
          duration: 100,
          stagger: {
            offset: 30,
            reverse: true
          }
        }
      }}>
        <IconButton mb="4" variant="solid" bg="indigo.500" colorScheme="indigo" borderRadius="full" icon={<Icon as={MaterialIcons} size="6" name="location-pin" _dark={{
          color: "warmGray.50"
        }} color="warmGray.50" />} />
        <IconButton mb="4" variant="solid" bg="yellow.400" colorScheme="yellow" borderRadius="full" icon={<Icon as={MaterialCommunityIcons} _dark={{
          color: "warmGray.50"
        }} size="6" name="microphone" color="warmGray.50" />} />
        <IconButton mb="4" variant="solid" bg="teal.400" colorScheme="teal" borderRadius="full" icon={<Icon as={MaterialCommunityIcons} _dark={{
          color: "warmGray.50"
        }} size="6" name="video" color="warmGray.50" />} />
        <IconButton mb="4" variant="solid" bg="red.500" colorScheme="red" borderRadius="full" icon={<Icon as={MaterialIcons} size="6" name="photo-library" _dark={{
          color: "warmGray.50"
        }} color="warmGray.50" />} />
      </Stagger>
    </Box>
    <HStack alignItems="center">
      <IconButton variant="solid" borderRadius="full" size="lg" onPress={onToggle} bg="cyan.400" icon={<Icon as={MaterialCommunityIcons} size="6" name="dots-horizontal" color="warmGray.50" _dark={{
        color: "warmGray.50"
      }} />} />
    </HStack>
  </Center>;
};

export default function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [useScaleTransition, setUseScaleTransition] = React.useState(false);
  const [useSlideFunction, setSlideFunction] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [isSlideOpen, setIsSlideOpen] = React.useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="auto" />
        <VStack w='100%' alignItems='center'>

          <Center>
            PresenceTransition
            <HStack space={4} alignItems="center">
              <Switch
                isChecked={useScaleTransition}
                onToggle={() => setUseScaleTransition(!useScaleTransition)}
                value="scaleTransition"
                accessibilityLabel="Use Scale Transition"
              />
              <Button onPress={() => setIsOpen(!isOpen)}>
                {isOpen ? "Ocultar" : "Mostrar"}
              </Button>
            </HStack>
          </Center>

          <Center mt="10">
            <PresenceTransition
              visible={isOpen}
              initial={useScaleTransition ? { opacity: 0, scale: 0 } : { opacity: 0 }}
              animate={useScaleTransition ? { opacity: 1, scale: 1, transition: { duration: 250 } } : { opacity: 1, transition: { duration: 250 } }}
            >
              {useScaleTransition ? (
                <Pressable onPress={pickImage}>
                  <Image
                    source={{ uri: selectedImage || 'https://via.placeholder.com/200' }}
                    alt="Selected Image"
                    size="200"
                    rounded="md"
                  />
                </Pressable>
              ) : (
                <Center bg="teal.500" rounded="md" w="200" h="200" _text={{ color: "white" }}>
                  Transición Suave
                </Center>
              )}
            </PresenceTransition>
          </Center>

          <Center mt="10" mb="10">
            Slide
            <HStack space={4} alignItems="center">
              <Switch
                isChecked={useSlideFunction}
                onToggle={() => setSlideFunction(!useSlideFunction)}
                value="slideFunction"
                accessibilityLabel="Use Slide"
              />
              <Button onPress={() => setIsSlideOpen(!isSlideOpen)}>
                {isSlideOpen ? "Ocultar" : "Mostrar"}
              </Button>
            </HStack>
          </Center>

          <Slide in={isSlideOpen} placement="top">
            {useSlideFunction ? (
              <Box w="100%" position="absolute" p="2" borderRadius="xs" bg="emerald.100" alignItems="center" justifyContent="center" _dark={{ bg: "emerald.200" }} safeArea>
                <HStack space={2}>
                  <CheckIcon size="4" color="emerald.600" mt="1" _dark={{ color: "emerald.700" }} />
                  <Text color="emerald.600" textAlign="center" _dark={{ color: "emerald.700" }} fontWeight="medium">
                    Compra satisfactoria. Entrega en curso.
                  </Text>
                </HStack>
              </Box>
            ) : (
              <Alert justifyContent="center" status="error" safeAreaTop={8}>
                <Alert.Icon />
                <Text color="error.600" fontWeight="medium">
                  No hay conexión a Internet.
                </Text>
              </Alert>
            )}
          </Slide>

          <Stag/>

        </VStack>
      </SafeAreaView>
    </NativeBaseProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
