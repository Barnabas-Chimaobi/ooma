import React, {Component} from 'react';
import {View, UIManager, findNodeHandle, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

const ICON_SIZE = 24;

interface Props {
  actions: any;
  onPressMenu: (eventName: string, index: Number) => void;
}

class PopupMenu extends Component {
  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.string).isRequired,
    onPressMenu: PropTypes.func.isRequired,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      icon: null,
    };
  }

  onError() {
    console.log('Popup Error');
  }

  onPress = () => {
    if (this.state.icon) {
      UIManager.showPopupMenu(
        findNodeHandle(this.state.icon),
        this.props.actions,
        this.onError,
        this.props.onPressMenu,
      );
    }
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onPress}>
          <Icon
            name="more-vert"
            size={ICON_SIZE}
            color={'grey'}
            ref={this.onRef}
          />
        </TouchableOpacity>
      </View>
    );
  }

  onRef = (icon: any) => {
    if (!this.state.icon) {
      this.setState({icon});
    }
  };
}

export {PopupMenu};

// import React, {useState, useRef} from 'react';
// import {View, UIManager, findNodeHandle, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import PropTypes from 'prop-types';

// const ICON_SIZE = 24;

// interface Props {
//   actions: any;
//   onPressMenu: (eventName: string, index: Number) => void;
// }

// export const PopupMenu = ({actions, onPressMenu}: Props) => {
//   const [icon, setIcon] = useState(0);

//   const onError = () => {
//     console.log('Popup Error');
//   };

//   const onPress = () => {
//     console.warn(icon);

//     if (icon) {
//       UIManager.showPopupMenu(
//         findNodeHandle(icon),
//         actions,
//         onError,
//         onPressMenu,
//       );
//     }
//   };

//   const onRef = (icons: any) => {
//     if (!icon) {
//       setIcon(icons);
//     }
//   };

//   return (
//     <View>
//       <TouchableOpacity onPress={onPress}>
//         <Icon name="more-vert" size={ICON_SIZE} color={'black'} ref={onRef} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// PopupMenu.propTypes = {
//   // array of strings, will be list items of Menu
//   actions: PropTypes.arrayOf(PropTypes.string).isRequired,
//   onPressMenu: PropTypes.func.isRequired,
// };
