import { useState } from 'react';
import { Modal, Portal, Text, Button, TextInput } from 'react-native-paper';
import { reviewModalStyles } from '../../styles/CollectionPageStyles';
import { View } from 'react-native';
import { ReviewModalProps } from '../../interfaces/interfaces';
import { Picker } from '@react-native-picker/picker';
import { modalPickerStyles } from '../../styles/CollectionPageStyles';
import { ref, update } from 'firebase/database';
import { database } from '../../firebase/firebaseConfig';
import { Alert } from 'react-native';

const ReviewModal = ({ game }: ReviewModalProps) => {

    const [visible, setVisible] = useState<boolean>(false);
    const [review, setReview] = useState<string>(game.review);
    const [reviewScore, setReviewScore] = useState<string>(game.reviewScore);

    const scoreOptions = ["0", "1", "2", "3", "4", "5"];

    const hide = () => {
        setReview(game.review);
        setReviewScore(game.reviewScore);
        setVisible(false)
    };
    
    const saveReview = () => {
        update(ref(database, `myGames/${game.firebaseId}`), { review: review, reviewScore: reviewScore });
        setVisible(false);
        Alert.alert("Review Saved", `Your review for ${game.name} has been saved!`);
    }

    return (
        <>
            <Button onPress={() => setVisible(true)}>Review</Button>

            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={hide}
                    style={{ alignItems: "center" }}
                    contentContainerStyle={reviewModalStyles.modalBody}
                >
                    <View style={reviewModalStyles.contentBody}>
                        
                        <View style={{ height: 250, marginLeft: 20, marginRight: 20 }}>
                            <Text style={reviewModalStyles.headerText}>Your Review for {game.name}</Text>
                            <TextInput
                                multiline
                                placeholder="Write your review"
                                value={review}
                                onChangeText={text => setReview(text)}
                            />
                        </View>

                        <View style={{ alignItems: "center" }}>
                            <Text>Your review score:</Text>
                            <Picker
                                style={modalPickerStyles}
                                mode='dropdown'
                                selectedValue={reviewScore}
                                onValueChange={(itemValue) => setReviewScore(itemValue)}
                            >
                                {
                                    scoreOptions.map((option, index) => {
                                        return <Picker.Item key={index} label={option} value={option} />
                                    })
                                }
                            </Picker>

                            <View style={reviewModalStyles.buttonView}>
                                <Button onPress={hide}>Exit</Button>
                                <Button onPress={saveReview}>Save</Button>
                            </View>
                        </View>

                    </View>
                </Modal>
            </Portal>
        </>
    );
};

export default ReviewModal