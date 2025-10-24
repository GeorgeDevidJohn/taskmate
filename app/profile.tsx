import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Save, User, Mail, Phone, MapPin } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Downtown, New York, NY 10001'
  });

  const [editedData, setEditedData] = useState(userData);

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(userData);
  };

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
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
          <ThemedText style={styles.headerTitle}>Profile</ThemedText>
          <View style={styles.headerRight}>
            {isEditing ? (
              <>
                <Pressable style={styles.cancelButton} onPress={handleCancel}>
                  <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
                </Pressable>
                <Pressable style={styles.saveButton} onPress={handleSave}>
                  <Save size={20} color="#ffffff" />
                  <ThemedText style={styles.saveButtonText}>Save</ThemedText>
                </Pressable>
              </>
            ) : (
              <Pressable style={styles.editButton} onPress={handleEdit}>
                <ThemedText style={styles.editButtonText}>Edit</ThemedText>
              </Pressable>
            )}
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Picture Section */}
        <View style={styles.profileSection}>
          <View style={styles.profilePicContainer}>
            <View style={styles.profilePic}>
              <User size={60} color="#ffffff" />
            </View>
          </View>
          <ThemedText style={styles.profileName}>{userData.name}</ThemedText>
        </View>

        {/* User Details */}
        <View style={styles.detailsSection}>
          {/* Name */}
          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <User size={20} color="#666666" />
              <ThemedText style={styles.labelText}>Full Name</ThemedText>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={editedData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholder="Enter your full name"
                placeholderTextColor="#999999"
              />
            ) : (
              <View style={styles.displayValue}>
                <ThemedText style={styles.displayText}>{userData.name}</ThemedText>
              </View>
            )}
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <Mail size={20} color="#666666" />
              <ThemedText style={styles.labelText}>Email Address</ThemedText>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={editedData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="Enter your email"
                placeholderTextColor="#999999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            ) : (
              <View style={styles.displayValue}>
                <ThemedText style={styles.displayText}>{userData.email}</ThemedText>
              </View>
            )}
          </View>

          {/* Phone */}
          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <Phone size={20} color="#666666" />
              <ThemedText style={styles.labelText}>Phone Number</ThemedText>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={editedData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                placeholder="Enter your phone number"
                placeholderTextColor="#999999"
                keyboardType="phone-pad"
              />
            ) : (
              <View style={styles.displayValue}>
                <ThemedText style={styles.displayText}>{userData.phone}</ThemedText>
              </View>
            )}
          </View>

          {/* Address */}
          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <MapPin size={20} color="#666666" />
              <ThemedText style={styles.labelText}>Address</ThemedText>
            </View>
            {isEditing ? (
              <TextInput
                style={[styles.textInput, styles.multilineInput]}
                value={editedData.address}
                onChangeText={(value) => handleInputChange('address', value)}
                placeholder="Enter your address"
                placeholderTextColor="#999999"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            ) : (
              <View style={styles.displayValue}>
                <ThemedText style={styles.displayText}>{userData.address}</ThemedText>
              </View>
            )}
          </View>
        </View>

        {/* Save Button (when editing) */}
        {isEditing && (
          <View style={styles.saveSection}>
            <Pressable style={styles.saveButtonLarge} onPress={handleSave}>
              <LinearGradient
                colors={['#ff8c1a', '#ff6333']}
                style={styles.saveButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Save size={24} color="#ffffff" />
                <ThemedText style={styles.saveButtonLargeText}>Save Changes</ThemedText>
              </LinearGradient>
            </Pressable>
          </View>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  profilePicContainer: {
    marginBottom: 16,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ff6333',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
  },
  detailsSection: {
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
  multilineInput: {
    minHeight: 80,
    paddingTop: 14,
  },
  displayValue: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  displayText: {
    fontSize: 16,
    color: '#000000',
  },
  saveSection: {
    marginBottom: 32,
  },
  saveButtonLarge: {
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
  saveButtonLargeText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
  },
});
