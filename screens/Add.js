import React, {useState} from 'react';

import {Text, StyleSheet, ScrollView} from 'react-native';
import {Container, Form, Item, Input, Button, H1} from 'native-base';

import shortid from 'shortid';
import AsyncStorage from '@react-native-community/async-storage';

const Add = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [totalNoSeason, setTotalNoSeason] = useState('');

  const addToList = async () => {
    try {
      if (!name || !totalNoSeason) {
        return alert('Please add both fields');
        // TODO: addd snackbar here
      }

      const seasonToAdd = {
        id: shortid.generate(),
        name,
        totalNoSeason,
        isWatched: false,
      };

      // Store values
      const storeValue = await AsyncStorage.getItem('@season_list');

      const prevList = await JSON.parse(storeValue);

      if (!prevList) {
        const newList = [seasonToAdd];

        await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
      } else {
        prevList.push(seasonToAdd);

        await AsyncStorage.setItem('@season_list', JSON.stringify(prevList));
      }

      navigation.navigate('Home');
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      <Container style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <H1 style={styles.heading}>Add to watch list</H1>
          <Form>
            <Item rounded style={styles.formItem}>
              <Input
                placeholder="Seasons name"
                style={{
                  color: '#eee',
                }}
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </Item>
            <Item rounded style={styles.formItem}>
              <Input
                placeholder="Total no of seasons"
                style={{
                  color: '#eee',
                }}
                value={totalNoSeason}
                onChangeText={(noOfSeason) => setTotalNoSeason(noOfSeason)}
              />
            </Item>
            <Button rounded block onPress={addToList}>
              <Text style={{color: '#eee'}}>Add</Text>
            </Button>
          </Form>
        </ScrollView>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
  },
});

export default Add;
