import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import styles from './style';

import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

import {LineChart} from 'react-native-chart-kit';
import Orientation from 'react-native-orientation';

class App extends Component {
  state = {
    isLoading: true,
    isRefreshing: false,
    reportData: [],
    screenWidth: Dimensions.get('window').width
  };

  ChartConfig = {
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) =>
        `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 2,
    },
  };

  loadReportData = () => {
    fetch('http://192.168.1.106:8000/', {
      method: 'get',
    })
      .then((response) => response.json())
      .then((json) => {
        json.datasets.forEach((dataItem, index, data) => {
          let color = '';
          switch (index) {
            case 0:
              color = 'rgba(255, 255, 255, 1)';
              break;
            case 1:
              color = 'rgba(0, 0, 255, 1)';
              break;
            case 2:
              color = 'rgba(0, 255, 0, 1)';
              break;
            case 3:
              color = 'rgba(255, 255, 0, 1)';
              break;
            case 4:
              color = 'rgba(255, 0, 0, 1)';
              break;
          }
          data[index] = {...data[index], color: () => color};
        });

        this.setState({
          isLoading: false,
          isRefreshing: false,
          reportData: json,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          isRefreshing: false,
        });
      });
  };

  _orientationChanged = (orientation) => {
    this.setState({
      screenWidth: Dimensions.get('window').width
    });
  };

  refreshReportInfo = () => {
    this.setState({
      isRefreshing: true,
    });

    Orientation.addOrientationListener(this._orientationChanged);

    this.loadReportData();
  };

  componentDidMount(): void {
    this.loadReportData();
  }

  render() {
    return this.state.isLoading ? (
        <View style={styles.loadingView}>
          <ActivityIndicator
            size="large"
          />
        </View>

    ) : (
      <View>
        <StatusBar barStyle="white-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.refreshReportInfo}
              />
            }
            style={styles.scrollView}>
            <Image
              style={styles.logo}
              source={require('./assets/bk.png')}
            />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <LineChart
                data={this.state.reportData}
                width={this.state.screenWidth - 4}
                height={350}
                chartConfig={this.ChartConfig}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 6,
                }}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}



export default App;
