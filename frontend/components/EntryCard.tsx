import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Entry } from '@sharedTypes'

interface EntryCardProps {
    entry: Entry
}

export const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.date}>{entry.date}</Text>
            <Text style={styles.note}>{entry.note}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  card: { padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 12 },
  date: { fontWeight: 'bold' },
  note: { marginTop: 4 },
});