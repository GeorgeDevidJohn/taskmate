import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Clock, Star, Plus, Bell, Menu, MessageCircle } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function CustomerDashboard() {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  
  const ads = [
    { id: 1, image: require('@/assets/images/ad1.jpg'), title: 'Get 20% off your first task!' },
    { id: 2, image: require('@/assets/images/ad2.jpg'), title: 'Premium helpers available now' },
    { id: 3, image: require('@/assets/images/ad3.jpg'), title: 'New features coming soon!' },
  ];

  const recentTasks = [
    { id: 1, title: 'Need help moving furniture', status: 'pending' },
    { id: 2, title: 'Grocery shopping assistance', status: 'completed' },
    { id: 3, title: 'Pet sitting for weekend', status: 'pending' },
  ];

  const nearbyHelpers = [
    { id: 1, name: 'John Smith', rating: 4.8, location: '0.5 km away', reviews: 24 },
    { id: 2, name: 'Sarah Johnson', rating: 4.9, location: '1.2 km away', reviews: 18 },
    { id: 3, name: 'Mike Wilson', rating: 4.7, location: '2.1 km away', reviews: 32 },
    { id: 4, name: 'Emily Davis', rating: 4.6, location: '3.5 km away', reviews: 15 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    router.replace('/login');
  };

  const handlePostTask = () => {
    // TODO: Navigate to post task screen
    console.log('Post new task');
  };

  const handleMenuPress = () => {
    // TODO: Open menu drawer
    console.log('Menu pressed');
  };

  const handleNotificationPress = () => {
    // TODO: Navigate to notifications
    console.log('Notifications pressed');
  };

  const handleMessagePress = () => {
    // TODO: Navigate to messages
    console.log('Messages pressed');
  };

  const handleSeeMoreTasks = () => {
    // TODO: Navigate to all tasks
    console.log('See more tasks');
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={['#ff6333', '#ff8c5a']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerTop}>
          <Pressable style={styles.menuButton} onPress={handleMenuPress}>
            <Menu size={24} color="#ffffff" />
          </Pressable>
          <Pressable style={styles.notificationButton} onPress={handleNotificationPress}>
            <Bell size={24} color="#ffffff" />
            <View style={styles.notificationBadge}>
              <ThemedText style={styles.badgeText}>3</ThemedText>
            </View>
          </Pressable>
        </View>
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <ThemedText style={styles.userName}>Hi! Alex Johnson</ThemedText>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Advertisement Slider */}
        <View style={styles.adSection}>
          <View style={styles.adContainer}>
            <Image
              source={ads[currentAdIndex].image}
              style={styles.adImage}
              contentFit="cover"
            />
            <View style={styles.adOverlay}>
              <ThemedText style={styles.adTitle}>{ads[currentAdIndex].title}</ThemedText>
            </View>
          </View>
          <View style={styles.adDots}>
            {ads.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.adDot,
                  index === currentAdIndex && styles.adDotActive
                ]}
              />
            ))}
          </View>
        </View>

        {/* Post Task Button */}
        <View style={styles.section}>
          <Pressable style={styles.actionButton} onPress={handlePostTask}>
            <LinearGradient
              colors={['#ff6333', '#ff8c5a']}
              style={styles.actionButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Plus size={24} color="#ffffff" />
              <ThemedText style={styles.actionButtonText}>Post New Task</ThemedText>
            </LinearGradient>
          </Pressable>
        </View>

        {/* Recent Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Recent Tasks</ThemedText>
            <Pressable onPress={handleSeeMoreTasks}>
              <ThemedText style={styles.seeMoreText}>See More</ThemedText>
            </Pressable>
          </View>
          {recentTasks.slice(0, 3).map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <View style={styles.taskHeader}>
                <ThemedText style={styles.taskTitle}>{task.title}</ThemedText>
                <View style={[
                  styles.statusIndicator,
                  { backgroundColor: task.status === 'completed' ? '#4CAF50' : '#f44336' }
                ]} />
              </View>
              <View style={styles.taskDetails}>
                <View style={styles.taskDetailItem}>
                  <Clock size={16} color="#666666" />
                  <ThemedText style={styles.taskDetailText}>Posted 2 hours ago</ThemedText>
                </View>
                <View style={styles.taskDetailItem}>
                  <MapPin size={16} color="#666666" />
                  <ThemedText style={styles.taskDetailText}>Downtown</ThemedText>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Available Helpers */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Available Helpers (Under 50km)</ThemedText>
          {nearbyHelpers.map((helper) => (
            <View key={helper.id} style={styles.helperCard}>
              <View style={styles.helperInfo}>
                <ThemedText style={styles.helperName}>{helper.name}</ThemedText>
                <View style={styles.helperDetails}>
                  <View style={styles.helperRating}>
                    <Star size={16} color="#ffd700" />
                    <ThemedText style={styles.ratingText}>{helper.rating} ({helper.reviews} reviews)</ThemedText>
                  </View>
                  <View style={styles.helperLocation}>
                    <MapPin size={16} color="#666666" />
                    <ThemedText style={styles.locationText}>{helper.location}</ThemedText>
                  </View>
                </View>
              </View>
              <Pressable style={styles.contactButton}>
                <ThemedText style={styles.contactButtonText}>Contact</ThemedText>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Message Button */}
      <Pressable style={styles.floatingMessageButton} onPress={handleMessagePress}>
        <MessageCircle size={24} color="#ffffff" />
        <View style={styles.messageBadge}>
          <ThemedText style={styles.messageBadgeText}>2</ThemedText>
        </View>
      </Pressable>
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
    marginBottom: 16,
  },
  menuButton: {
    padding: 8,
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 4,
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 4,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  adSection: {
    marginTop: 20,
    marginBottom: 16,
  },
  adContainer: {
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  adImage: {
    width: '100%',
    height: '100%',
  },
  adOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  adTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  adDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    gap: 8,
  },
  adDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#cccccc',
  },
  adDotActive: {
    backgroundColor: '#ff6333',
  },
  section: {
    zIndex: -10,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 24,
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  seeMoreText: {
    fontSize: 16,
    color: '#ff6333',
    fontWeight: '600',
  },
  actionButton: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  taskCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  taskDetails: {
    marginBottom: 12,
  },
  taskDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  taskDetailText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
  },
  helperCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  helperInfo: {
    flex: 1,
  },
  helperName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  helperDetails: {
    gap: 4,
  },
  helperRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  helperLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactButton: {
    backgroundColor: '#ff6333',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  floatingMessageButton: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    backgroundColor: '#ff6333',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  messageBadge: {
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
  messageBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});
