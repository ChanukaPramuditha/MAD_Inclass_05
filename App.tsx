import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, FontAwesome } from '@expo/vector-icons';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const colors = {
  navy: '#0D1523',
  white: '#FFFFFF',
  text: '#29313D',
  muted: '#424B58',
  divider: '#454950',
  backdrop: 'rgba(6, 12, 24, 0.56)',
  inputBorder: '#D8DDE5',
};

function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [points, setPoints] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pointsToAdd, setPointsToAdd] = useState('1');

  const closeDialog = () => {
    setDialogOpen(false);
    setPointsToAdd('1');
  };

  const handleAddPoints = () => {
    const amount = Number(pointsToAdd);

    if (!Number.isSafeInteger(amount) || amount < 1 || amount > 100000) {
      Alert.alert('Invalid amount', 'Enter a whole number from 1 to 100,000.');
      return;
    }

    setPoints((previous) => previous + amount);
    closeDialog();
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" backgroundColor={colors.navy} />

      {/* Dark app bar including the physical device safe area. */}
      <View style={[styles.appBar, { paddingTop: insets.top }]}>
        <Text style={styles.appBarTitle}>My Profile</Text>
      </View>

      <View style={styles.mainArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.avatarSection}>
            <Image
              source={require('./assets/profile-avatar.png')}
              style={styles.avatar}
              resizeMode="contain"
              accessibilityLabel="Profile avatar with verified check mark"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.detailsSection}>
            <View style={styles.detailGroup}>
              <Text style={styles.detailLabel}>Name</Text>
              <Text style={styles.detailText}>Diluka</Text>
            </View>

            <View style={styles.detailGroup}>
              <Text style={styles.detailLabel}>Email</Text>
              <View style={styles.inlineDetail}>
                <FontAwesome name="envelope" size={20} color={colors.navy} />
                <Text style={styles.detailText} selectable>
                  diluka.w@nsbm.ac.lk
                </Text>
              </View>
            </View>

            <View style={styles.detailGroup}>
              <Text style={styles.detailLabel}>Points</Text>
              <View style={styles.inlineDetail}>
                <FontAwesome name="star" size={22} color={colors.navy} />
                <Text style={styles.detailText}>{points}</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <Pressable
          style={[styles.fab, { bottom: 17 + Math.max(insets.bottom, 0) }]}
          onPress={() => setDialogOpen(true)}
          accessibilityRole="button"
          accessibilityLabel="Add points"
          accessibilityHint="Opens a dialog to add points to the profile"
        >
          <Feather name="plus" size={28} color={colors.white} />
        </Pressable>
      </View>

      {/* Sample FAB action. The screenshot does not reveal its original action. */}
      <Modal
        animationType="fade"
        transparent
        visible={dialogOpen}
        onRequestClose={closeDialog}
      >
        <KeyboardAvoidingView
          style={styles.modalOuter}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Pressable style={styles.modalBackdrop} onPress={closeDialog} />
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Add Points</Text>
            <Text style={styles.modalDescription}>
              Enter how many points to add to this profile.
            </Text>
            <TextInput
              style={styles.input}
              value={pointsToAdd}
              onChangeText={setPointsToAdd}
              keyboardType="number-pad"
              placeholder="Number of points"
              maxLength={6}
              selectTextOnFocus
              accessibilityLabel="Points to add"
            />
            <View style={styles.modalActions}>
              <Pressable
                onPress={closeDialog}
                style={[styles.actionButton, styles.cancelButton]}
                accessibilityRole="button"
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleAddPoints}
                style={[styles.actionButton, styles.confirmButton]}
                accessibilityRole="button"
              >
                <Text style={styles.confirmText}>Add</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ProfileScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  appBar: {
    backgroundColor: colors.navy,
    height: 132, // total header height including the safe-area padding
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  appBarTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
  },
  mainArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 115,
  },
  avatarSection: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 19,
    paddingBottom: 14,
  },
  avatar: {
    width: 166,
    height: 166,
  },
  divider: {
    height: 1.5,
    backgroundColor: colors.divider,
    marginHorizontal: 21,
  },
  detailsSection: {
    paddingHorizontal: 22,
    paddingTop: 20,
  },
  detailGroup: {
    marginBottom: 29,
  },
  detailLabel: {
    fontSize: 19,
    lineHeight: 27,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  detailText: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '400',
    color: colors.muted,
    flexShrink: 1,
  },
  inlineDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 29,
  },
  fab: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
    shadowColor: '#000000',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  modalOuter: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.backdrop,
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    elevation: 9,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  modalDescription: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 9,
    height: 48,
    paddingHorizontal: 14,
    fontSize: 17,
    color: colors.text,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 22,
  },
  actionButton: {
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#EEF0F4',
  },
  confirmButton: {
    backgroundColor: colors.navy,
  },
  cancelText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
