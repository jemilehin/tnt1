import React from 'react'
import { IconButton } from "react-native-paper";

export const Header = (direction,navigation,colors) => {

    direction === "LEFT" ?
    React.useLayoutEffect(() => {
        navigation.setOptions({
        headerLeft: () => (
            <IconButton
              onPress={() => navigation.goBack()}
              style={{left: "-5%", marginLeft: 0}}
              icon="keyboard-backspace"
              color={colors}
              size={25}
            />
          ),
        });
      }, [navigation]) :
      React.useLayoutEffect(() => {
        navigation.setOptions({
        headerRight: () => (
            <IconButton
              onPress={() => navigation.goBack()}
              style={{left: "-5%", marginLeft: 0}}
              icon="keyboard-backspace"
              color={colors.PRIMARY_COLOR}
              size={25}
            />
          ),
        });
      }, [navigation])
}

