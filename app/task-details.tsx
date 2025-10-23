import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, ArrowLeft, Edit, Trash2, MapPin, Clock, User, Star, Send } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function TaskDetailsScreen() {
  // Mock task data - in real app this would come from navigation params or API
  const [task] = useState({
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

  const handleBack = () => {
    router.back();
  };

  const handleNotificationPress = () => {
    // TODO: Navigate to notifications
    console.log('Notifications pressed');
  };

  const handleEdit = () => {
    Alert.alert('Edit Task', 'Edit functionality coming soon!');
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => router.back() }
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
              <Pressable style={styles.editButton} onPress={handleEdit}>
                <Edit size={20} color="#ff6333" />
              </Pressable>
              <Pressable style={styles.deleteButton} onPress={handleDelete}>
                <Trash2 size={20} color="#ff0000" />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Status */}
        <View style={styles.section}>
          <View style={styles.statusContainer}>
            <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(task.status) }]}>
              <ThemedText style={styles.statusText}>{getStatusText(task.status)}</ThemedText>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Description</ThemedText>
          <View style={styles.descriptionCard}>
            <ThemedText style={styles.descriptionText}>{task.description}</ThemedText>
          </View>
        </View>

        {/* Address */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Location</ThemedText>
          <View style={styles.addressCard}>
            <MapPin size={20} color="#ff6333" />
            <ThemedText style={styles.addressText}>{task.address}</ThemedText>
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
                </View>
              ))}
            </View>
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
    alignItems: 'flex-start',
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
});
