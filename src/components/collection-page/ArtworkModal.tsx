import { useEffect, useState } from 'react';
import { Modal, Portal, Text, Button } from 'react-native-paper';
import { artworkModalStyles, artworkButtonProps } from '../../styles/ArtworkModalStyles';
import { View, Image, Alert } from 'react-native';
import { ArtworkModalProps } from '../../types/types';
import * as ImagePicker from 'expo-image-picker';
import { database } from '../../firebase/firebaseConfig';
import { ref, update } from 'firebase/database';
import { placeholderImage } from '../../constants/constants';

const ArtworkModal = ({ game }: ArtworkModalProps) => {

    const [visible, setVisible] = useState<boolean>(false);
    const [coverArt, setCoverArt] = useState<string>(game.backgroundImage);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setImageError(false);
    }, [coverArt]);

    const selectCoverArt = async () => {

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            console.log(pickerResult.assets[0].uri)
            setCoverArt(pickerResult.assets[0].uri);
        }
    };

    const open = () => {
        setCoverArt(game.backgroundImage);
        setVisible(true);
    }

    const hide = () => {
        setVisible(false);
    }

    const useDefaultArt = () => {
        if (!game.defaultImage) {
            Alert.alert("Alert!", "No default cover art available!");
            return;
        }
        if (game.defaultImage === coverArt) {
            Alert.alert("Alert!", "Default cover art already selected!");
            return;
        }
        setCoverArt(game.defaultImage);
    }

    const saveCoverArt = () => {
        update(ref(database, `myGames/${game.firebaseId}`), { backgroundImage: coverArt });
        hide();
    }

    return (
        <>
            <Button
                onPress={open}
                textColor='green'
            >Artwork
            </Button>

            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={hide}
                    style={artworkModalStyles.modalStyle}
                    contentContainerStyle={artworkModalStyles.contentContainer}
                >
                    <View style={artworkModalStyles.contentBody}>
                        <Text style={artworkModalStyles.headerText}>Change Game Cover Art</Text>
                        <View style={artworkModalStyles.imageView}>
                            <Text style={artworkModalStyles.text}>Preview of Selected Cover Art:</Text>
                            <Image
                                source={imageError ? placeholderImage : { uri: coverArt }}
                                style={artworkModalStyles.image}
                                onError={() => setImageError(true)}
                            />
                        </View>
                        <View style={artworkModalStyles.buttonView}>
                            <Button
                                buttonColor={artworkButtonProps.backgroundColor}
                                textColor={artworkButtonProps.color}
                                style={artworkModalStyles.button}
                                onPress={useDefaultArt}
                            >
                                Use Default Art
                            </Button>
                            <Button
                                buttonColor={artworkButtonProps.backgroundColor}
                                textColor={artworkButtonProps.color}
                                style={artworkModalStyles.button}
                                onPress={selectCoverArt}
                            >
                                Upload Custom Art
                            </Button>
                        </View>
                        <View style={artworkModalStyles.exitView}>
                            <Button onPress={hide}>Exit</Button>
                            <Button onPress={saveCoverArt}>Save</Button>
                        </View>
                    </View>
                </Modal>
            </Portal>
        </>
    )
}

export default ArtworkModal