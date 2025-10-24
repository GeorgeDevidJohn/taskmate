import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, ArrowLeft, ChevronRight, MapPin } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function MessagesScreen() {
  // Mock data for message conversations - in real app this would come from API
  const [conversations] = useState([
    {
      id: 1,
      name: 'John Smith',
      location: 'Downtown',
      profilePic: '👨‍💼',
      lastMessage: 'I can help you with moving furniture tomorrow at 2 PM',
      unreadCount: 2,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      location: 'Midtown',
      profilePic: '👩‍💻',
      lastMessage: 'Thank you for choosing me for your cleaning task!',
      unreadCount: 0,

    },
    {
      id: 3,
      name: 'Mike Wilson',
      location: 'Uptown',
      profilePic: '👨‍🔧',
      lastMessage: 'I\'ll be there in 30 minutes for the garden work',
      unreadCount: 1,
    },
    {
      id: 4,
      name: 'Emily Davis',
      location: 'Westside',
      profilePic: '👩‍🎨',
      lastMessage: 'The pet sitting went great! Your dog is so well behaved',
      unreadCount: 0,
    },
    {
      id: 5,
      name: 'David Brown',
      location: 'Eastside',
      profilePic: '👨‍🎓',
      lastMessage: 'I can start the tutoring session next week',
      unreadCount: 0,
     
    },
  ]);

  const [visibleConversations, setVisibleConversations] = useState<number[]>([]);

  useEffect(() => {
    // Animate conversations in sequence
    conversations.forEach((_, index) => {
      setTimeout(() => {
        setVisibleConversations(prev => [...prev, index]);
      }, index * 100); // Staggered animation
    });
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleNotificationPress = () => {
    // TODO: Navigate to notifications
    console.log('Notifications pressed');
  };

  const handleConversationPress = (conversationId: number) => {
    router.push('/chat');
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
          <ThemedText style={styles.headerTitle}>Messages</ThemedText>
          <Pressable style={styles.notificationButton} onPress={handleNotificationPress}>
            <Bell size={24} color="#ffffff" />
            <View style={styles.notificationBadge}>
              <ThemedText style={styles.badgeText}>3</ThemedText>
            </View>
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Conversations ({conversations.length})</ThemedText>
          </View>
          
          {conversations.map((conversation, index) => (
            <Pressable 
              key={conversation.id} 
              style={[
                styles.conversationCard,
                { 
                  opacity: visibleConversations.includes(index) ? 1 : 0,
                  transform: [{ translateY: visibleConversations.includes(index) ? 0 : 50 }]
                }
              ]}
              onPress={() => handleConversationPress(conversation.id)}
            >
              <View style={styles.conversationContent}>
                <View style={styles.profileSection}>
                  <View style={styles.profilePicContainer}>
                    <View style={styles.profilePic}>
                      <ThemedText style={styles.profilePicText}>{conversation.profilePic}</ThemedText>
                    </View>
                  </View>
                  
                  <View style={styles.conversationInfo}>
                    <View style={styles.nameRow}>
                      <ThemedText style={styles.conversationName}>{conversation.name}</ThemedText>
                      {conversation.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                          <ThemedText style={styles.unreadText}>{conversation.unreadCount}</ThemedText>
                        </View>
                      )}
                    </View>
                    
                    <View style={styles.locationRow}>
                      <MapPin size={14} color="#666666" />
                      <ThemedText style={styles.locationText}>{conversation.location}</ThemedText>
                    </View>
                    
                 
                    
                  </View>
                </View>
                
                <View style={styles.arrowSection}>
                  <ChevronRight size={20} color="#666666" />
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
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
  },
  conversationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  conversationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileSection: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  profilePicContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicText: {
    fontSize: 24,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  conversationInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  unreadBadge: {
    backgroundColor: '#ff6333',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999999',
  },
  arrowSection: {
    marginLeft: 12,
  },
});
