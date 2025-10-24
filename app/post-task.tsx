import React, { useState, useRef } from 'react';
import { StyleSheet, View, ScrollView, Pressable, TextInput, Alert, Modal, TouchableOpacity, Animated } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, ArrowLeft, Plus, X } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const taskCategories = [
  'Moving & Transportation',
  'Home Improvement',
  'Cleaning & Maintenance',
  'Pet Care',
  'Grocery Shopping',
  'Tech Support',
  'Garden & Landscaping',
  'Event Planning',
  'Tutoring & Education',
  'Other'
];

export default function PostTaskScreen() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const handleBack = () => {
    router.back();
  };

  const handleNotificationPress = () => {
    // TODO: Navigate to notifications
    console.log('Notifications pressed');
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowCategoryModal(false);
    });
  };

  const handleCloseModal = () => {
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowCategoryModal(false);
    });
  };

  const handleAddImage = () => {
    // TODO: Implement image picker
    Alert.alert('Info', 'Image picker functionality coming soon!');
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handlePostTask = () => {
    if (!selectedCategory || !description || !address) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    Alert.alert('Success', 'Task posted successfully!');
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={['#ff8c1a', '#ff6333']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerTop}>
          <Pressable style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color="#ffffff" />
          </Pressable>
          <ThemedText style={styles.headerTitle}>Post New Task</ThemedText>
          <Pressable style={styles.notificationButton} onPress={handleNotificationPress}>
            <Bell size={24} color="#ffffff" />
            <View style={styles.notificationBadge}>
              <ThemedText style={styles.badgeText}>3</ThemedText>
            </View>
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category Selection */}
        <View style={styles.section}>
          <ThemedText style={styles.label}>Task Category *</ThemedText>
          <Pressable style={styles.dropdownButton} onPress={() => {
            setShowCategoryModal(true);
            Animated.timing(overlayOpacity, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }).start();
          }}>
            <ThemedText style={[styles.dropdownText, !selectedCategory && styles.placeholderText]}>
              {selectedCategory || 'Select a category'}
            </ThemedText>
            <ThemedText style={styles.dropdownArrow}>▼</ThemedText>
          </Pressable>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <ThemedText style={styles.label}>Task Description *</ThemedText>
          <TextInput
            style={styles.textArea}
            placeholder="Describe your task in detail..."
            placeholderTextColor="#999999"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Address */}
        <View style={styles.section}>
          <ThemedText style={styles.label}>Address *</ThemedText>
          <TextInput
            style={styles.textInput}
            placeholder="Enter the task location address"
            placeholderTextColor="#999999"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        {/* Images Section */}
        <View style={styles.section}>
          <ThemedText style={styles.label}>Images (Optional)</ThemedText>
          <View style={styles.imageContainer}>
            {images.map((image, index) => (
              <View key={index} style={styles.imagePreview}>
                <Pressable 
                  style={styles.removeImageButton}
                  onPress={() => handleRemoveImage(index)}
                >
                  <X size={16} color="#ffffff" />
                </Pressable>
                <ThemedText style={styles.imagePlaceholder}>Image {index + 1}</ThemedText>
              </View>
            ))}
            {images.length < 3 && (
              <Pressable style={styles.addImageButton} onPress={handleAddImage}>
                <Plus size={24} color="#ff6333" />
                <ThemedText style={styles.addImageText}>Add Image</ThemedText>
              </Pressable>
            )}
          </View>
        </View>

        {/* Post Button */}
        <View style={styles.section}>
          <Pressable style={styles.postButton} onPress={handlePostTask}>
            <LinearGradient
              colors={['#ff8c1a', '#ff6333']}
              style={styles.postButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <ThemedText style={styles.postButtonText}>Post Task</ThemedText>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>

      {/* Category Modal */}
      <Modal
        visible={showCategoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={handleCloseModal}
        >
          <Animated.View style={[styles.modalOverlayAnimated, { opacity: overlayOpacity }]} />
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Select Category</ThemedText>
              <Pressable onPress={handleCloseModal}>
                <X size={24} color="#666666" />
              </Pressable>
            </View>
            <ScrollView style={styles.modalScrollView}>
              {taskCategories.map((category) => (
                <Pressable
                  key={category}
                  style={styles.categoryItem}
                  onPress={() => handleCategorySelect(category)}
                >
                  <ThemedText style={styles.categoryText}>{category}</ThemedText>
                  {selectedCategory === category && (
                    <ThemedText style={styles.checkmark}>✓</ThemedText>
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
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
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#ff0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginTop: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  dropdownButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000000',
    flex: 1,
  },
  placeholderText: {
    color: '#999999',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666666',
  },
  textArea: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minHeight: 120,
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
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  imagePreview: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  removeImageButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ff0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    fontSize: 12,
    color: '#666666',
  },
  addImageButton: {
    width: 100,
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ff6333',
    borderStyle: 'dashed',
  },
  addImageText: {
    fontSize: 12,
    color: '#ff6333',
    marginTop: 4,
  },
  postButton: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 20,
    marginBottom: 40,
  },
  postButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlayAnimated: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: '90%',
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  modalScrollView: {
    maxHeight: 400,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryText: {
    fontSize: 16,
    color: '#000000',
    flex: 1,
  },
  checkmark: {
    fontSize: 16,
    color: '#ff6333',
    fontWeight: '700',
  },
});
