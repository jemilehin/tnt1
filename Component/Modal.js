import React from "react";

import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet
} from "react-native";
import colors from "../Constant/Color.json"

export const MessageModal = (props) => {

    return(
        <Modal
        visible={props.modalVisible}
        transparent={true}
        onRequestClose={() => {
          props.setModalVisible(!props.modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{props.msgText}</Text>
            <Pressable
              style={[styles.buttonModal,{backgroundColor: colors.PRIMARY_COLOR}]}
              onPress={() => props.setModalVisible(!props.modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    buttonModal: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      top: 13
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    }
  });