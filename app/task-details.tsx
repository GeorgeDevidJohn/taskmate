import React, { useState, useRef } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Alert, Modal, TouchableOpacity, Animated, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, ArrowLeft, Edit, Trash2, MapPin, User, Star, Send, Plus } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function TaskDetailsScreen() {
  // Mock task data - in real app this would come from navigation params or API
  const [task, setTask] = useState({
    id: 1,
    title: 'Need help moving furniture',
    description: 'I need assistance moving heavy furniture from my living room to the bedroom. The furniture includes a large sofa, coffee table, and two armchairs. Please bring moving equipment if available.',
    address: '123 Main Street, Downtown, New York, NY 10001',
    status: 'assigned',
    assigned: true,
    completed: false,
    postedDate: '2 hours ago',
    images: [
      { id: 1, url: require('@/assets/images/furniture1.jpg') },
      { id: 2, url: require('@/assets/images/furniture2.jpg') },
    ],
    assignee: {
      name: 'John Smith',
      profilePic: '👨‍💼',
      rating: 4.8,
      reviews: 24,
      phone: '+1 (555) 123-4567'
    }
  });

  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [selectedHelper, setSelectedHelper] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  
  // Mock contacted helpers list - in real app this would come from API
  const [contactedHelpers] = useState([
    { id: 1, name: 'Sarah Johnson', profilePic: '👩‍💻', rating: 4.6, reviews: 18 },
    { id: 2, name: 'Mike Wilson', profilePic: '👨‍🔧', rating: 4.9, reviews: 32 },
    { id: 3, name: 'Emily Davis', profilePic: '👩‍🎨', rating: 4.7, reviews: 15 },
    { id: 4, name: 'Alex Johnson', profilePic: '👨‍🎓', rating: 4.5, reviews: 22 },
  ]);

  const handleBack = () => {
    router.back();
  };

  const handleNotificationPress = () => {
    // TODO: Navigate to notifications
    console.log('Notifications pressed');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTask(task);
  };

  const handleSaveEdit = () => {
    setTask(editedTask);
    setIsEditing(false);
    Alert.alert('Success', 'Task updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const handleUpdateField = (field: string, value: string) => {
    setEditedTask(prev => ({ ...prev, [field]: value }));
  };

  const handleDeleteImage = (imageId: number) => {
    Alert.alert(
      'Delete Photo',
      'Are you sure you want to delete this photo?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setEditedTask(prev => ({
              ...prev,
              images: prev.images.filter(img => img.id !== imageId)
            }));
          }
        }
      ]
    );
  };

  const handleAddImage = () => {
    Alert.alert('Add Photo', 'Photo picker functionality coming soon!');
  };


  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => {
            // In a real app, this would call an API to delete the task
            // For now, we'll just navigate back to the dashboard
            Alert.alert(
              'Task Deleted',
              'The task has been successfully deleted.',
              [
                { 
                  text: 'OK', 
                  onPress: () => router.replace('/customer-dashboard') 
                }
              ]
            );
          }
        }
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'assigned': return '#2196F3';
      case 'pending': return '#ffc107';
      default: return '#666666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'assigned': return 'Assigned';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

  const handleAssignTask = () => {
    setSelectedHelper(null);
    setShowAssignmentModal(true);
    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleReassignTask = () => {
    setSelectedHelper(null);
    setShowAssignmentModal(true);
    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleHelperSelect = (helper: any) => {
    setSelectedHelper(helper);
  };

  const handleCloseModal = () => {
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowAssignmentModal(false);
      setSelectedHelper(null);
    });
  };

  const handleAssignSelectedHelper = () => {
    if (!selectedHelper) return;
    
    // Animate overlay out and close modal
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowAssignmentModal(false);
      setSelectedHelper(null);
    });
    
    if (selectedHelper.id === 'none') {
      // Handle unassigning the task
      Alert.alert(
        'Confirm Unassignment',
        'Are you sure you want to unassign this task?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Unassign', 
            onPress: () => {
              setTask(prevTask => ({
                ...prevTask,
                assigned: false,
                status: 'pending',
                assignee: null as any
              }));
              Alert.alert('Success', 'Task has been unassigned!');
            }
          }
        ]
      );
    } else {
      // Handle assigning to a specific helper
      Alert.alert(
        'Confirm Assignment',
        `Are you sure you want to assign this task to ${selectedHelper.name}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Confirm', 
            onPress: () => {
              setTask(prevTask => ({
                ...prevTask,
                assigned: true,
                status: 'assigned',
                assignee: selectedHelper
              }));
              Alert.alert('Success', `Task has been assigned to ${selectedHelper.name}!`);
            }
          }
        ]
      );
    }
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
          <ThemedText style={styles.headerTitle}>Task Details</ThemedText>
          <Pressable style={styles.notificationButton} onPress={handleNotificationPress}>
            <Bell size={24} color="#ffffff" />
            <View style={styles.notificationBadge}>
              <ThemedText style={styles.badgeText}>3</ThemedText>
            </View>
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Task Title */}
        <View style={styles.section}>
          <View style={styles.titleHeader}>
            <ThemedText style={styles.taskTitle}>{task.title}</ThemedText>
            <View style={styles.actionButtons}>
              {!isEditing && (
                <>
                  <Pressable style={styles.editButton} onPress={handleEdit}>
                    <Edit size={20} color="#ff6333" />
                  </Pressable>
                  <Pressable style={styles.deleteButton} onPress={handleDelete}>
                    <Trash2 size={20} color="#ff0000" />
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </View>

        {/* Status */}
        <View style={styles.section}>
          <View style={styles.statusContainer}>
            <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(task.status) }]}>
              <ThemedText style={styles.statusText}>{getStatusText(task.status)}</ThemedText>
            </View>
            {task.assigned && (
              <Pressable style={styles.smallReassignButton} onPress={handleReassignTask}>
                <LinearGradient
                  colors={['#ff8c1a', '#ff6333']}
                  style={styles.smallReassignButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <ThemedText style={styles.smallReassignButtonText}>Re-assign</ThemedText>
                </LinearGradient>
              </Pressable>
            )}
          </View>
        </View>

        {/* Assignment Actions */}
        {!task.assigned && (
          <View style={styles.section}>
            <View style={styles.assignmentButtonsContainer}>
              <Pressable style={styles.assignButton} onPress={handleAssignTask}>
                <LinearGradient
                  colors={['#ff8c1a', '#ff6333']}
                  style={styles.assignButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <User size={20} color="#ffffff" />
                  <ThemedText style={styles.assignButtonText}>Assign Helper</ThemedText>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        )}

        {/* Description */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Description</ThemedText>
          <View style={styles.descriptionCard}>
            {isEditing ? (
              <TextInput
                style={styles.editDescriptionInput}
                value={editedTask.description}
                onChangeText={(text) => handleUpdateField('description', text)}
                placeholder="Enter task description"
                placeholderTextColor="#999999"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            ) : (
              <ThemedText style={styles.descriptionText}>{task.description}</ThemedText>
            )}
          </View>
        </View>

        {/* Address */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Location</ThemedText>
          <View style={styles.addressCard}>
            <MapPin size={20} color="#ff6333" />
            {isEditing ? (
              <TextInput
                style={styles.editAddressInput}
                value={editedTask.address}
                onChangeText={(text) => handleUpdateField('address', text)}
                placeholder="Enter task address"
                placeholderTextColor="#999999"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            ) : (
              <ThemedText style={styles.addressText}>{task.address}</ThemedText>
            )}
          </View>
        </View>

        {/* Images */}
        {task.images && task.images.length > 0 && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Photos</ThemedText>
            <View style={styles.imagesContainer}>
              {task.images.map((image) => (
                <View key={image.id} style={styles.imageCard}>
                  <Image
                    source={image.url}
                    style={styles.taskImage}
                    contentFit="cover"
                  />
                  {isEditing && (
                    <Pressable 
                      style={styles.deleteImageButton}
                      onPress={() => handleDeleteImage(image.id)}
                    >
                      <Trash2 size={16} color="#ffffff" />
                    </Pressable>
                  )}
                </View>
              ))}
            </View>
            {isEditing && (
              <Pressable style={styles.addImageButton} onPress={handleAddImage}>
                <Plus size={20} color="#ff6333" />
                <ThemedText style={styles.addImageButtonText}>Add Photo</ThemedText>
              </Pressable>
            )}
          </View>
        )}

        {/* Assignee Information */}
        {task.assigned && task.assignee && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Assigned Helper</ThemedText>
            <View style={styles.assigneeCard}>
              <View style={styles.assigneeInfo}>
                <View style={styles.profilePic}>
                  <ThemedText style={styles.profilePicText}>{task.assignee.profilePic}</ThemedText>
                </View>
                <View style={styles.assigneeDetails}>
                  <ThemedText style={styles.assigneeName}>{task.assignee.name}</ThemedText>
                   <View style={styles.assigneeStats}>
                     <Star size={16} color="#ff7c3a" />
                     <ThemedText style={styles.rating}>{task.assignee.rating}</ThemedText>
                     <ThemedText style={styles.reviews}>({task.assignee.reviews} reviews)</ThemedText>
                   </View>
                
                </View>
              </View>
              <Pressable style={styles.contactButton}>
                <Send size={20} color="#ffffff" />
              </Pressable>
            </View>
          </View>
        )}

        {/* Task Meta */}
       
      </ScrollView>

      {/* Save and Cancel Buttons */}
      {isEditing && (
        <View style={styles.bottomActionButtons}>
          <Pressable style={styles.cancelButtonBottom} onPress={handleCancelEdit}>
            <LinearGradient
              colors={['#9e9e9e', '#757575']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <ThemedText style={styles.cancelButtonTextBottom}>Cancel</ThemedText>
            </LinearGradient>
          </Pressable>
          <Pressable style={styles.saveButtonBottom} onPress={handleSaveEdit}>
            <LinearGradient
              colors={['#ff8c1a', '#ff6333']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <ThemedText style={styles.saveButtonTextBottom}>Save Changes</ThemedText>
            </LinearGradient>
          </Pressable>
        </View>
      )}

      {/* Assignment Modal */}
      <Modal
        visible={showAssignmentModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAssignmentModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={handleCloseModal}
        >
          <Animated.View style={[styles.modalOverlayAnimated, { opacity: overlayOpacity }]} />
          <TouchableOpacity 
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>
                {task.assigned ? 'Re-assign Helper' : 'Assign Helper'}
              </ThemedText>
              <Pressable onPress={handleCloseModal}>
                <ThemedText style={styles.closeButton}>×</ThemedText>
              </Pressable>
            </View>
            <ScrollView style={styles.helpersList}>
              {/* None Option */}
              <Pressable
                style={[
                  styles.helperItem,
                  selectedHelper && selectedHelper.id === 'none' && styles.helperItemSelected
                ]}
                onPress={() => handleHelperSelect({ id: 'none', name: 'None' })}
              >
                <View style={styles.helperProfilePic}>
                  <ThemedText style={styles.helperProfilePicText}>❌</ThemedText>
                </View>
                <View style={styles.helperInfo}>
                  <ThemedText style={styles.helperName}>None</ThemedText>
                  <View style={styles.helperStats}>
                    <ThemedText style={styles.helperRating}>Unassign this task</ThemedText>
                  </View>
                </View>
                {selectedHelper && selectedHelper.id === 'none' && (
                  <View style={styles.selectedIndicator}>
                    <ThemedText style={styles.selectedCheckmark}>✓</ThemedText>
                  </View>
                )}
              </Pressable>
              
              {contactedHelpers.map((helper) => (
                <Pressable
                  key={helper.id}
                  style={[
                    styles.helperItem,
                    selectedHelper && selectedHelper.id === helper.id && styles.helperItemSelected
                  ]}
                  onPress={() => handleHelperSelect(helper)}
                >
                  <View style={styles.helperProfilePic}>
                    <ThemedText style={styles.helperProfilePicText}>{helper.profilePic}</ThemedText>
                  </View>
                  <View style={styles.helperInfo}>
                    <ThemedText style={styles.helperName}>{helper.name}</ThemedText>
                    <View style={styles.helperStats}>
                      <Star size={16} color="#ff8c1a" />
                      <ThemedText style={styles.helperRating}>{helper.rating}</ThemedText>
                      <ThemedText style={styles.helperReviews}>({helper.reviews} reviews)</ThemedText>
                    </View>
                  </View>
                  {selectedHelper && selectedHelper.id === helper.id && (
                    <View style={styles.selectedIndicator}>
                      <ThemedText style={styles.selectedCheckmark}>✓</ThemedText>
                    </View>
                  )}
                </Pressable>
              ))}
            </ScrollView>
            <View style={styles.modalFooter}>
              <Pressable 
                style={[
                  styles.assignButtonModal,
                  !selectedHelper && styles.assignButtonModalDisabled
                ]}
                onPress={handleAssignSelectedHelper}
                disabled={!selectedHelper}
              >
                <LinearGradient
                  colors={selectedHelper ? ['#ff8c1a', '#ff6333'] : ['#cccccc', '#999999']}
                  style={styles.assignButtonModalGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <User size={20} color="#ffffff" />
                  <ThemedText style={styles.assignButtonModalText}>
                    {task.assigned ? 'Re-assign Helper' : 'Assign Helper'}
                  </ThemedText>
                </LinearGradient>
              </Pressable>
            </View>
          </TouchableOpacity>
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
    marginBottom: 24,
  },
  titleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    flex: 1,
    marginRight: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    backgroundColor: '#ffffff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deleteButton: {
    backgroundColor: '#ffffff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  descriptionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  descriptionText: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
  },
  addressCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  addressText: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 12,
    flex: 1,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  imageCard: {
    width: '48%',
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  taskImage: {
    width: '100%',
    height: '100%',
  },
  assigneeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  assigneeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profilePicText: {
    fontSize: 28,
  },
  assigneeDetails: {
    flex: 1,
  },
  assigneeName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  assigneeStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: '#ff8c1a',
    marginRight: 8,
  },
  reviews: {
    fontSize: 14,
    color: '#666666',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
  },
  contactButton: {
    position: 'absolute',
    top: 30,
    right: 21,
    backgroundColor: '#ff7c3a',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  metaCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
  },
  assignmentButtonsContainer: {
    alignItems: 'center',
  },
  smallReassignButton: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  smallReassignButtonGradient: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  smallReassignButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  assignButton: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  assignButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  assignButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  reassignButton: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  reassignButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  reassignButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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
  closeButton: {
    fontSize: 24,
    color: '#666666',
    fontWeight: '600',
  },
  helpersList: {
    maxHeight: 400,
  },
  helperItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  helperProfilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  helperProfilePicText: {
    fontSize: 24,
  },
  helperInfo: {
    flex: 1,
  },
  helperName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  helperStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helperRating: {
    fontSize: 16,
    color: '#ff8c1a',
    marginLeft: 4,
    marginRight: 8,
  },
  helperReviews: {
    fontSize: 14,
    color: '#666666',
  },
  helperItemSelected: {
    backgroundColor: '#fff0e6',
    borderColor: '#ff6333',
    borderWidth: 2,
  },
  selectedIndicator: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  selectedCheckmark: {
    fontSize: 20,
    color: '#ff6333',
    fontWeight: '700',
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  assignButtonModal: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  assignButtonModalDisabled: {
    shadowOpacity: 0.05,
    elevation: 2,
  },
  assignButtonModalGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  assignButtonModalText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  editDescriptionInput: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minHeight: 120,
  },
  editAddressInput: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 12,
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minHeight: 80,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 12,
    borderWidth: 2,
    borderColor: '#ff6333',
    borderStyle: 'dashed',
  },
  addImageButtonText: {
    color: '#ff6333',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomActionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 16,
  },
  cancelButtonBottom: {

    flex: 1,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cancelButtonTextBottom: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonBottom: {
    flex: 1,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonTextBottom: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonGradient: {
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
