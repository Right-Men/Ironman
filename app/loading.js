var React = require('react');
var ReactNative = require('react-native');


var {
    AppRegistry,
    StyleSheet,
    View,

} = ReactNative;

var Spinner = require('react-native-spinkit');

var Loading = React.createClass({

    getInitialState() {
        return {
            index: 0,
            types: ['Bounce'],
            size: 100,
            color: "#FFFFFF",
            isVisible: true
        }
    },

    render() {
        var type = this.state.types[this.state.index];

        return (
            <View style={styles.container}>
                <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type} color={this.state.color}/>
            </View>
        );
    }

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d35400',
    },

    spinner: {
        marginBottom: 50
    },


});

AppRegistry.registerComponent('fl', () => Loading);
