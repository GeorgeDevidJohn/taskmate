import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, ArrowLeft, Clock, CheckCircle, AlertCircle, Info } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function NotificationsScreen() {
  // Mock data for notifications - in real app this would come from API
  const [notifications] = useState([
    {
      id: 1,
      type: 'task_completed',
      title: 'Task Completed',
      message: 'Your furniture moving task has been completed by John Smith',
      timestamp: '2 hours ago',
      read: false,
      icon: 'success'
    },
    {
      id: 2,
      type: 'new_message',
      title: 'New Message',
      message: 'You have a new message from Sarah Johnson',
      timestamp: '4 hours ago',
      read: false,
      icon: 'message'
    },
    {
      id: 3,
      type: 'task_assigned',
      title: 'Task Assigned',
      message: 'Mike Wilson has accepted your garden maintenance task',
      timestamp: '1 day ago',
      read: true,
      icon: 'info'
    },
    {
      id: 4,
      type: 'payment_received',
      title: 'Payment Received',
      message: 'Payment of $50 has been received for your cleaning task',
      timestamp: '2 days ago',
      read: true,
      icon: 'success'
    },
    {
      id: 5,
      type: 'task_reminder',
      title: 'Task Reminder',
      message: 'Your pet sitting task starts tomorrow at 9 AM',
      timestamp: '3 days ago',
      read: true,
      icon: 'alert'
    },
    {
      id: 6,
      type: 'new_offer',
      title: 'New Offer',
      message: 'Emily Davis has made an offer for your car wash task',
      timestamp: '1 week ago',
      read: true,
      icon: 'info'
    }
  ]);

  const [visibleNotifications, setVisibleNotifications] = useState<number[]>([]);

  useEffect(() => {
    // Animate notifications in sequence
    notifications.forEach((_, index) => {
      setTimeout(() => {
        setVisibleNotifications(prev => [...prev, index]);
      }, index * 100); // Staggered animation
    });
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleNotificationPress = (notificationId: number) => {
    // TODO: Handle notification press - mark as read, navigate to relevant screen
    console.log('Notification pressed:', notificationId);
  };

  const getNotificationIcon = (iconType: string) => {
    switch (iconType) {
      case 'success':
        return <CheckCircle size={24} color="#4CAF50" />;
      case 'message':
        return <Bell size={24} color="#2196F3" />;
      case 'info':
        return <Info size={24} color="#FF9800" />;
      case 'alert':
        return <AlertCircle size={24} color="#F44336" />;
      default:
        return <Bell size={24} color="#666666" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
          <ThemedText style={styles.headerTitle}>Notifications</ThemedText>
          <View style={styles.headerRight}>
            {unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <ThemedText style={styles.unreadBadgeText}>{unreadCount}</ThemedText>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>All Notifications ({notifications.length})</ThemedText>
            {unreadCount > 0 && (
              <ThemedText style={styles.unreadCountText}>{unreadCount} unread</ThemedText>
            )}
          </View>
          
          {notifications.map((notification, index) => (
            <Pressable 
              key={notification.id} 
              style={[
                styles.notificationCard,
                { 
                  opacity: visibleNotifications.includes(index) ? 1 : 0,
                  transform: [{ translateY: visibleNotifications.includes(index) ? 0 : 50 }]
                },
                !notification.read && styles.unreadCard
              ]}
              onPress={() => handleNotificationPress(notification.id)}
            >
              <View style={styles.notificationContent}>
                <View style={styles.notificationLeft}>
                  <View style={styles.iconContainer}>
                    {getNotificationIcon(notification.icon)}
                  </View>
                  
                  <View style={styles.notificationInfo}>
                    <View style={styles.titleRow}>
                      <ThemedText style={[
                        styles.notificationTitle,
                        !notification.read && styles.unreadTitle
                      ]}>
                        {notification.title}
                      </ThemedText>
                      {!notification.read && <View style={styles.unreadDot} />}
                    </View>
                    
                    <ThemedText style={styles.notificationMessage} numberOfLines={2}>
                      {notification.message}
                    </ThemedText>
                    
                    <View style={styles.timestampRow}>
                      <Clock size={14} color="#666666" />
                      <ThemedText style={styles.timestamp}>{notification.timestamp}</ThemedText>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
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
    width: 40,
    alignItems: 'flex-end',
  },
  unreadBadge: {
    backgroundColor: '#ff0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadBadgeText: {
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
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  unreadCountText: {
    fontSize: 16,
    color: '#ff6333',
    fontWeight: '600',
  },
  notificationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#ff6333',
  },
  notificationContent: {
    padding: 16,
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: 16,
    marginTop: 2,
  },
  notificationInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  unreadTitle: {
    fontWeight: '700',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff6333',
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 8,
  },
  timestampRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#999999',
    marginLeft: 4,
  },
});
