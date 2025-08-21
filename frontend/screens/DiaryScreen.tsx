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
import { RootStackParamList } from '../App'
import { useFocusEffect } from '@react-navigation/native'
import { Entry } from '@types';
import { getEntries, clearEntries } from '@helpers'

type Props = NativeStackScreenProps<RootStackParamList, 'Diary'>

const DiaryScreen: React.FC<Props> = ({ navigation }) => {
  const [entries, setEntries] = useState<Entry[]>([])

  const loadEntries = async () => {
    const storedEntries = await getEntries()
    setEntries(storedEntries)
  }

  useFocusEffect(
    useCallback(() => {
      loadEntries()
    }, [])
  )

  return (
    <ScreenWrapper>
      <Text style={styles.title}>Baby Diary</Text>
      <View style={styles.btnsHolder}>
        <Button 
          title="NEW ENTRY" 
          onPress={() => navigation.navigate('NewEntry')}
          style={styles.newEntryBtn}
        />
        <Button 
          title="DELETE ALL" 
          onPress={async () => {
            await clearEntries()
            setEntries([])
          }}
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
                navigation.navigate('EntryDetail', { entryId: item.id })
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
  noEntriesText: {margin: 50, alignSelf: 'center', fontSize: 20},
  btnsHolder: {flexDirection: 'row', justifyContent: 'space-between'},
  newEntryBtn: { backgroundColor: 'blue' },
  deleteAllBtn: {backgroundColor: 'red'},
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  entriesList: { marginTop: 16 },
})

export default DiaryScreen
