import React, { useState } from 'react';
import { StyleSheet, View, Pressable, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { EyeClosedIcon, EyeIcon } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    // TODO: Implement actual login logic
    Alert.alert('Success', 'Login successful!');
    router.replace('/(tabs)');
  };

  const handleCreateAccount = () => {
    // TODO: Navigate to signup page
    Alert.alert('Info', 'Create account functionality coming soon!');
  };

  const handleSignIn = () => {
    router.push('/register');
  };

  return (
    <ThemedView style={styles.container}>

      {/* Login Title */}
      <ThemedText style={styles.title}>Login</ThemedText>

      {/* Let's Get Started Section */}
      <View style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle}>Let's Get Started</ThemedText>
        <ThemedText style={styles.sectionSubtitle}>Sign in to your account</ThemedText>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Email or Mobile Field */}
        <View style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>Email </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
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
                <EyeIcon size={30} color="#ff6333" />
              ) : (
                <EyeClosedIcon size={30} color="#ff6333" />
              )}
            </Pressable>
          </View>
        </View>

        {/* Forget Password Link */}
        <Pressable style={styles.forgetPasswordContainer}>
          <ThemedText style={styles.forgetPasswordText}>Forget password?</ThemedText>
        </Pressable>

        {/* Login Button */}
        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <ThemedText style={styles.loginButtonText}>Login</ThemedText>
        </Pressable>
      </View>

      {/* Bottom Link */}
      <View style={styles.bottomSection}>
        <ThemedText style={styles.bottomText}>
          Do not have account?{' '}
          <ThemedText style={styles.signInLink} onPress={handleSignIn}>
            Register
          </ThemedText>
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
  sectionHeader: {
    marginBottom: 32,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666666',
  },
  form: {
    marginBottom: 20,
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
  forgetPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  forgetPasswordText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#ff6333',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#ff6333',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  bottomText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
  signInLink: {
    color: '#ff6333',
    fontWeight: '600',
  },
});
