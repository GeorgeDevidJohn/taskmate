import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Alert, Linking, Animated } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Clock, Star, Plus, Bell, Menu, MessageCircle, User, Send, ChevronRight, LogOut, HelpCircle, Lock } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function CustomerDashboard() {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const slideAnim = useState(new Animated.Value(-300))[0]; // Start off-screen
  
  const ads = [
    { id: 1, image: require('@/assets/images/ad1.jpg'), title: 'Get 20% off your first task!' },
    { id: 2, image: require('@/assets/images/ad2.jpg'), title: 'Premium helpers available now' },
    { id: 3, image: require('@/assets/images/ad3.jpg'), title: 'New features coming soon!' },
  ];

  const recentTasks = [
    { id: 1, title: 'Need help moving furniture', status: 'pending', assigned: true, completed: false },
    { id: 2, title: 'Grocery shopping assistance', status: 'completed', assigned: true, completed: true },
    { id: 3, title: 'Pet sitting for weekend', status: 'pending', assigned: false, completed: false },
  ];

  const nearbyHelpers = [
    { id: 1, name: 'John Smith', address: '123 Main St, Downtown', location: '0.5 km away', reviews: 24, rating: 4.8, profilePic: '👨‍💼' },
    { id: 2, name: 'Sarah Johnson', address: '456 Oak Ave, Midtown', location: '1.2 km away', reviews: 18, rating: 4.6, profilePic: '👩‍💻' },
    { id: 3, name: 'Mike Wilson', address: '789 Pine Rd, Uptown', location: '2.1 km away', reviews: 32, rating: 4.9, profilePic: '👨‍🔧' },
    { id: 4, name: 'Emily Davis', address: '321 Elm St, Westside', location: '3.5 km away', reviews: 15, rating: 4.7, profilePic: '👩‍🎨' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [ads.length]);

  const handlePostTask = () => {
    router.push('/post-task');
  };

  const handleMenuPress = () => {
    setShowMenu(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowMenu(false);
    });
  };

  const handleLogout = () => {
    console.log('Logout button pressed');
    closeMenu();
    
    setTimeout(() => {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Logout', 
            style: 'destructive', 
            onPress: () => {
              console.log('Logout confirmed');
              router.replace('/login');
            }
          }
        ]
      );
    }, 100); // Small delay to ensure menu closes first
  };

  const handleHelp = () => {
    closeMenu();
    Linking.openURL('https://help.taskmate.com');
  };

  const handleResetPassword = () => {
    closeMenu();
    router.push('/reset-password');
  };

  const handleNotificationPress = () => {
    router.push('/notifications');
  };

  const handleMessagePress = () => {
    router.push('/messages');
  };

  const handleSeeMoreTasks = () => {
    router.push('/all-tasks');
  };

  const handleTaskPress = (taskId: number) => {
    router.push('/task-details');
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const handleContactHelper = (helper: any) => {
    // Navigate to chat with the specific helper
    // In a real app, you would pass the helper data as navigation params
    router.push('/chat');
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={['#ff8c1a','#ff6333']}
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
          <Pressable style={styles.profileIcon} onPress={handleProfilePress}>
            <User size={20} color="#ffffff" />
          </Pressable>
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
              colors={['#ff8c1a','#ff6333']}
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
              <View style={styles.taskCardBackground}>
                <Image
                  source={require('@/assets/images/bg2.png')}
                  style={styles.taskBackgroundImage}
                  
                />
                <View style={styles.taskOverlay}>
                  <LinearGradient
                    colors={['#ff8c1a', '#ff6333']}
                    style={styles.taskCardGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                <View style={styles.taskHeader}>
                  <ThemedText style={styles.taskTitleWhite}>{task.title}</ThemedText>
                  <View style={styles.taskRightSection}>
                    <Pressable style={styles.arrowButton} onPress={() => handleTaskPress(task.id)}>
                      <ChevronRight size={20} color="#ffffff" />
                    </Pressable>
                  </View>
                </View>
                <View style={styles.taskDetails}>
                  <View style={styles.taskDetailItem}>
                    <Clock size={18} color="#ffffff" />
                    <ThemedText style={styles.taskDetailTextWhite}>Posted 2 hours ago</ThemedText>
                  </View>
                  <View style={styles.taskDetailItem}>
                    <MapPin size={18} color="#ffffff" />
                    <ThemedText style={styles.taskDetailTextWhite}>Downtown</ThemedText>
                  </View>
                </View>
                  </LinearGradient>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Available Helpers */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Available Nearby Helpers</ThemedText>
          {nearbyHelpers.map((helper) => (
            <View key={helper.id} style={styles.helperCard}>
              <View style={styles.helperProfileContainer}>
                <View style={styles.helperProfilePic}>
                  <ThemedText style={styles.profilePicText}>{helper.profilePic}</ThemedText>
                </View>
                <View style={styles.helperInfo}>
                  <ThemedText style={styles.helperName}>{helper.name}</ThemedText>
                  <View style={styles.helperStats}>
                    <Star size={16} color="#ff8c1a" />
                    <ThemedText style={styles.rating}>{helper.rating}</ThemedText>
                    <ThemedText style={styles.reviews}>({helper.reviews} reviews)</ThemedText>
                  </View>
                  <View style={styles.helperDetails}>
                    <View style={styles.helperAddress}>
                      <MapPin size={14} color="#666666" />
                      <ThemedText style={styles.addressText}>{helper.address}</ThemedText>
                    </View>
                    <View style={styles.helperLocation}>
                      <ThemedText style={styles.locationText}>{helper.location}</ThemedText>
                    </View>
                  </View>
                </View>
              </View>
              <Pressable style={styles.contactButton} onPress={() => handleContactHelper(helper)}>
                <Send size={16} color="#ffffff" />
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

      {/* Side Navigation Drawer */}
      {showMenu && (
        <>
          <Pressable style={styles.overlay} onPress={closeMenu} />
          <Animated.View style={[styles.sideNav, { transform: [{ translateX: slideAnim }] }]}>
            <View style={styles.sideNavHeader}>
              <ThemedText style={styles.sideNavTitle}>Menu</ThemedText>
              <Pressable style={styles.closeButton} onPress={closeMenu}>
                <ThemedText style={styles.closeButtonText}>×</ThemedText>
              </Pressable>
            </View>
            
            <View style={styles.sideNavContent}>
              <Pressable style={styles.sideNavItem} onPress={handleLogout}>
                <LogOut size={24} color="#ff6333" />
                <ThemedText style={styles.sideNavItemText}>Logout</ThemedText>
              </Pressable>
              
              <Pressable style={styles.sideNavItem} onPress={handleHelp}>
                <HelpCircle size={24} color="#ff6333" />
                <ThemedText style={styles.sideNavItemText}>Help</ThemedText>
              </Pressable>
              
              <Pressable style={styles.sideNavItem} onPress={handleResetPassword}>
                <Lock size={24} color="#ff6333" />
                <ThemedText style={styles.sideNavItemText}>Reset Password</ThemedText>
              </Pressable>
            </View>
          </Animated.View>
        </>
      )}
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
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  taskCardBackground: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
  },
  taskBackgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: "cover",
    right: 0,
    bottom: 0,
    
  },
  taskOverlay: {
    position: 'relative',
    zIndex: 1,
  },
  taskCardGradient: {
    padding: 20,
    borderRadius: 16,
    opacity: 0.8,
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
  taskTitleWhite: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    flex: 1,
  },
  taskRightSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
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
  taskDetailTextWhite: {
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 8,
    opacity: 0.9,
  },
  helperCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  contactButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#ff6333',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  helperProfileContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
  profilePicText: {
    fontSize: 24,
  },
  helperInfo: {
    flex: 1,
  },
  helperName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  helperDetails: {
    gap: 2,
  },
  helperStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: '#ff8c1a',
    marginLeft: 4,
    marginRight: 8,
  },
  reviews: {
    fontSize: 14,
    color: '#666666',
  },
  helperAddress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
    flex: 1,
  },
  helperLocation: {
    flexDirection: 'row',
    alignItems: 'center',
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  sideNav: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#ffffff',
    zIndex: 1001,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  sideNavHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 60, // Account for status bar
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sideNavTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666666',
  },
  sideNavContent: {
    flex: 1,
    paddingTop: 20,
  },
  sideNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sideNavItemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 16,
  },
});
