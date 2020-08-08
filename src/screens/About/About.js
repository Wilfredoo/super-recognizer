import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Linking,
} from "react-native";
import * as firebase from "firebase";
import Header from "../Repetitive/Header";

export default class Profile extends Component {
  state = {
    email: "",
    displayName: "",
  };

  componentDidMount() {
    // const { email, displayName } = firebase.auth().currentUser;
    // this.setState({ email, displayName });
  }

  signOutUser = () => {
    firebase.auth().signOut();
  };

  render() {
    return (
      <>
        <Header navigation={this.props.navigation} />
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <View style={styles.sponsorContainer1}>
              <Text style={styles.text}>
                Hey there, this app is in beta. Thanks for testing and leave
                some feedback pls.
              </Text>
            </View>
            <View style={styles.sponsorContainer2}>
              <Text style={styles.text}>
                Also, you can sponsor this project by donating 5 euros a month
                to my patreon page: {"\n"}
              </Text>
              <Text
                style={styles.link}
                onPress={() => {
                  Linking.openURL("https://www.patreon.com/octopusprojects");
                }}
              >
                https://www.patreon.com/octopusprojects {"\n"}
              </Text>

              <Text style={styles.text}>
                That way I can dedicate more hours to this project, create the
                app faster and do a better job.{"\n"}
              </Text>
              <Text style={styles.text}>
                Thanks for your support!{"\n"}- Wilfredo
              </Text>
            </View>
            <View style={styles.sponsorContainer3}>
              <Text style={styles.sponsors}>
                Sponsors up to date:{"\n"}- Wilfredo Casas (dad){"\n"}- Maria
                Farach (mom){"\n"}- (you?)
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ marginTop: 32 }}
            onPress={() => this.signOutUser()}
          >
            {/* <Text>Log Out</Text> */}
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
  },
  sponsors: {
    textAlign: "center",
    fontSize: 12,
  },
  textContainer: {
    maxWidth: "80%",
  },
  link: { textAlign: "center", fontSize: 18, color: "#005086", 
  textDecorationLine: 'underline',
},
  sponsorContainer1: {
    backgroundColor: "#f1c5c5",
    borderWidth: 5,
    padding: 10,
    marginBottom: 10,
  },
  sponsorContainer2: {
    backgroundColor: "#faf0af",
    borderWidth: 5,
    padding: 10,
    marginBottom: 10,
  },
  sponsorContainer3: {
    backgroundColor: "#e5edb7",
    borderWidth: 5,
    padding: 10,
    marginBottom: 10,
  },
});
