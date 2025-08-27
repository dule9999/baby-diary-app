import React, { useState, useCallback } from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { ScreenWrapper, EntryCard, Button } from '@components'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@navigation'
import { useFocusEffect } from '@react-navigation/native'
import { Entry } from '@sharedTypes';
import { fetchEntries, deleteAllEntries } from '@services'

type Props = NativeStackScreenProps<RootStackParamList, 'Diary'>

const DiaryScreen: React.FC<Props> = ({ route, navigation }) => {
  const { baby } = route.params
  const [entries, setEntries] = useState<Entry[]>([])

  const goBack = () => {
    navigation.goBack()
  }

  const loadEntries = async () => {
    try {
      const apiEntries = await fetchEntries(baby.id)
      setEntries(apiEntries)
    } catch (err) {
      console.error(err)
    }
  }

  const clearEntries = async () => {
    await deleteAllEntries(baby.id)
    setEntries([])
  }

  const navigateToNewEntry = () => {
    navigation.navigate('NewEntry', { baby })
  }

  useFocusEffect(
    useCallback(() => {
      loadEntries()
    }, [])
  )

  return (
    <ScreenWrapper>
      <View style={styles.titleHolder}>
        <Button text="Go Back" onPress={goBack} />
        <Text style={styles.title}>{baby.name} Diary</Text>
      </View>
      <View style={styles.btnsHolder}>
        <Button 
          text="NEW ENTRY" 
          onPress={navigateToNewEntry}
          style={styles.newEntryBtn}
        />
        <Button 
          text="DELETE ALL" 
          onPress={clearEntries}
          style={styles.deleteAllBtn}
        />
      </View>
      {entries.length === 0 ? 
        <Text style={styles.noEntriesText}>No entries yet.</Text> :
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EntryDetail', { babyId: baby.id, entryId: item.id })
              }
            >
              <EntryCard entry={item} />
            </TouchableOpacity>
          )}
          style={styles.entriesList}
        />
        }
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  titleHolder: {flexDirection: 'row', marginBottom: 20},
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, },
  noEntriesText: {margin: 50, alignSelf: 'center', fontSize: 20},
  btnsHolder: {flexDirection: 'row', justifyContent: 'space-between'},
  newEntryBtn: { backgroundColor: 'blue' },
  deleteAllBtn: {backgroundColor: 'red'},
  entriesList: { marginTop: 16 },
})

export default DiaryScreen
