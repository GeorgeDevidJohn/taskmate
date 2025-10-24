import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Save, Eye, EyeOff, Lock } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ResetPasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleResetPassword = () => {
    // Basic validation
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters long.');
      return;
    }

    // TODO: Implement actual password reset logic
    Alert.alert(
      'Success',
      'Password has been reset successfully!',
      [
        { text: 'OK', onPress: () => router.back() }
      ]
    );
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={['#ff8c1a', '#ff6333']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <Pressable style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color="#ffffff" />
          </Pressable>
          <ThemedText style={styles.headerTitle}>Reset Password</ThemedText>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Reset Your Password</ThemedText>
          <ThemedText style={styles.sectionDescription}>
            Enter your new password to reset your password.
          </ThemedText>
        </View>

        <View style={styles.formSection}>

          {/* New Password Field */}
          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <Lock size={20} color="#666666" />
              <ThemedText style={styles.labelText}>New Password</ThemedText>
            </View>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter new password"
                placeholderTextColor="#999999"
                secureTextEntry={!showNewPassword}
              />
              <Pressable style={styles.eyeButton} onPress={toggleNewPasswordVisibility}>
                {showNewPassword ? (
                  <EyeOff size={20} color="#666666" />
                ) : (
                  <Eye size={20} color="#666666" />
                )}
              </Pressable>
            </View>
          </View>

          {/* Confirm Password Field */}
          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <Lock size={20} color="#666666" />
              <ThemedText style={styles.labelText}>Confirm New Password</ThemedText>
            </View>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm new password"
                placeholderTextColor="#999999"
                secureTextEntry={!showConfirmPassword}
              />
              <Pressable style={styles.eyeButton} onPress={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#666666" />
                ) : (
                  <Eye size={20} color="#666666" />
                )}
              </Pressable>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.saveSection}>
          <Pressable style={styles.saveButton} onPress={handleResetPassword}>
            <LinearGradient
              colors={['#ff8c1a', '#ff6333']}
              style={styles.saveButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Save size={24} color="#ffffff" />
              <ThemedText style={styles.saveButtonText}>Reset Password</ThemedText>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  headerRight: {
    width: 40, // To balance the layout
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginTop: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  formSection: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 8,
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
  },
  eyeButton: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  saveSection: {
    marginBottom: 32,
  },
  saveButton: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
  },
});
