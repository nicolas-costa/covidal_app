import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  logo: {
    width: '100%',
    height: 300,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  loadingView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
});

export default styles;
