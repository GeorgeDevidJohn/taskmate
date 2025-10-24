import React, { useState, useRef } from 'react';
import { StyleSheet, View, Pressable, TextInput, Alert, ScrollView, Modal, Animated } from 'react-native';
import { router } from 'expo-router';
import { EyeClosedIcon, EyeIcon, Users, HelpCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const [selectedRole, setSelectedRole] = useState('');

  const handleContinue = () => {
    if (!fullName || !email || !password || !phoneNumber || !address) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    setIsModalVisible(true);
    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleFinalSubmit = () => {
    if (!selectedRole) {
      Alert.alert('Error', 'Please select a role');
      return;
    }
    
    // TODO: Implement actual registration logic with role
    Alert.alert('Success', `Registration successful as ${selectedRole}!`);
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false);
      
      // Navigate to appropriate dashboard based on role
      if (selectedRole === 'Helper') {
        router.replace('/helper-dashboard');
      } else if (selectedRole === 'Need Help') {
        router.replace('/customer-dashboard');
      }
    });
  };

  const handleCloseModal = () => {
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false);
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>Create Account</ThemedText>
          <ThemedText style={styles.subtitle}>Fill in your details to get started</ThemedText>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Full Name Field */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Full Name</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#999999"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          {/* Email Field */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Email</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="example@gmail.com"
              placeholderTextColor="#999999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Phone Number Field */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Phone Number</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="+1 (555) 123-4567"
              placeholderTextColor="#999999"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          {/* Address Field */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Address</ThemedText>
            <TextInput
              style={[styles.input, styles.addressInput]}
              placeholder="Enter your address"
              placeholderTextColor="#999999"
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Password Field */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.inputLabel}>Password</ThemedText>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#999999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon size={20} color="#ff6333" />
                ) : (
                  <EyeClosedIcon size={20} color="#ff6333" />
                )}
              </Pressable>
            </View>
          </View>

          {/* Continue Button */}
          <Pressable style={styles.continueButton} onPress={handleContinue}>
            <ThemedText style={styles.continueButtonText}>Continue</ThemedText>
          </Pressable>

          {/* Login Link */}
          <View style={styles.bottomSection}>
            <ThemedText style={styles.bottomText}>
              Already have an account?{' '}
              <ThemedText style={styles.loginLink} onPress={() => router.back()}>
                Login
              </ThemedText>
            </ThemedText>
          </View>
        </View>
      </ScrollView>

      {/* Role Selection Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalOverlayAnimated, { opacity: overlayOpacity }]} />
          <Pressable style={styles.modalBackdrop} onPress={handleCloseModal} />
          <LinearGradient
            colors={['#ff6333', '#ff8c5a']}
            style={styles.modalContent}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>Choose Your Role</ThemedText>
            <ThemedText style={styles.modalSubtitle}>
              Select how you want to participate in the community
            </ThemedText>
          </View>

          <View style={styles.roleButtonsContainer}>
            {/* Helper Button */}
            <Pressable
              style={[
                styles.roleButton,
                selectedRole === 'Helper' && styles.roleButtonSelected,
                selectedRole === 'Need Help' && styles.roleButtonFaded
              ]}
              onPress={() => handleRoleSelect('Helper')}
            >
              <LinearGradient
                colors={selectedRole === 'Helper' ? ['#ffffff', '#f8f8f8'] : ['#ffffff', '#f0f0f0']}
                style={styles.roleButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Users 
                  size={24} 
                  color={selectedRole === 'Helper' ? '#ff6333' : '#ff6333'} 
                  style={[
                    styles.roleButtonIcon,
                    selectedRole === 'Need Help' && styles.roleButtonIconFaded
                  ]} 
                />
                <ThemedText style={[
                  styles.roleButtonText,
                  selectedRole === 'Helper' && styles.roleButtonTextSelected,
                  selectedRole === 'Need Help' && styles.roleButtonTextFaded
                ]}>
                  Helper
                </ThemedText>
              </LinearGradient>
            </Pressable>

            {/* Need Help Button */}
            <Pressable
              style={[
                styles.roleButton,
                selectedRole === 'Need Help' && styles.roleButtonSelected,
                selectedRole === 'Helper' && styles.roleButtonFaded
              ]}
              onPress={() => handleRoleSelect('Need Help')}
            >
              <LinearGradient
                colors={selectedRole === 'Need Help' ? ['#ffffff', '#f8f8f8'] : ['#ffffff', '#f0f0f0']}
                style={styles.roleButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <HelpCircle 
                  size={24} 
                  color={selectedRole === 'Need Help' ? '#ff6333' : '#ff6333'} 
                  style={[
                    styles.roleButtonIcon,
                    selectedRole === 'Helper' && styles.roleButtonIconFaded
                  ]} 
                />
                <ThemedText style={[
                  styles.roleButtonText,
                  selectedRole === 'Need Help' && styles.roleButtonTextSelected,
                  selectedRole === 'Helper' && styles.roleButtonTextFaded
                ]}>
                  Need Help
                </ThemedText>
              </LinearGradient>
            </Pressable>
          </View>

          {/* Final Submit Button */}
          <Pressable style={styles.finalSubmitButton} onPress={handleFinalSubmit}>
            <ThemedText style={styles.finalSubmitButtonText}>Submit</ThemedText>
          </Pressable>
          </LinearGradient>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  addressInput: {
    minHeight: 80,
    paddingTop: 14,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
  },
  eyeIcon: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  continueButton: {
    backgroundColor: '#ff6333',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    shadowColor: '#ff6333',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  bottomSection: {
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
  loginLink: {
    color: '#ff6333',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackdrop: {
    flex: 1,
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 32,
    paddingHorizontal: 24,
    paddingBottom: 40,
    minHeight: 300,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    textAlign: 'center',
  },
  roleButtonsContainer: {
    marginBottom: 32,
  },
  roleButton: {
    borderRadius: 50,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  roleButtonSelected: {
    shadowColor: '#ff6133',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  roleButtonFaded: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  roleButtonGradient: {
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  roleButtonIcon: {
    marginRight: 12,
  },
  roleButtonIconFaded: {
    opacity: 0.4,
  },
  roleButtonText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ff6333',
  },
  roleButtonTextSelected: {
    color: '#ff6333',
    opacity: 1,
  },
  roleButtonTextFaded: {
    color: '#ff6333',
    opacity: 0.4,
  },
  finalSubmitButton: {
    opacity: 0.8,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  finalSubmitButtonText: {
    color: '#ffff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  modalOverlayAnimated: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
