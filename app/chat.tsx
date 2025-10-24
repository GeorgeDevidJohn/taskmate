import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Pressable, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Send, Eye } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hi! I saw your task about moving furniture. I can help you with that.',
      sender: 'other',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      text: 'Great! When would you be available?',
      sender: 'me',
      timestamp: '10:32 AM'
    },
    {
      id: 3,
      text: 'I can help you tomorrow at 2 PM. Does that work for you?',
      sender: 'other',
      timestamp: '10:35 AM'
    },
    {
      id: 4,
      text: 'Perfect! I\'ll be there at 2 PM.',
      sender: 'me',
      timestamp: '10:36 AM'
    }
  ]);

  const scrollViewRef = useRef<ScrollView>(null);

  // Mock person data - in real app this would come from navigation params
  const person = {
    name: 'John Smith',
    profilePic: '👨‍💼',
    location: 'Downtown',
    rating: 4.8,
    reviews: 24,
    phone: '+1 (555) 123-4567',
    isOnline: true
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleBack = () => {
    router.back();
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message.trim(),
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleViewProfile = () => {
    Alert.alert(
      'Profile Details',
      `Name: ${person.name}\nLocation: ${person.location}\nRating: ${person.rating} ⭐\nReviews: ${person.reviews}\nPhone: ${person.phone}`,
      [{ text: 'OK' }]
    );
  };

  const renderMessage = (msg: any) => (
    <View key={msg.id} style={[styles.messageContainer, msg.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
      <View style={[styles.messageBubble, msg.sender === 'me' ? styles.myBubble : styles.otherBubble]}>
        <ThemedText style={[styles.messageText, msg.sender === 'me' ? styles.myMessageText : styles.otherMessageText]}>
          {msg.text}
        </ThemedText>
        <ThemedText style={[styles.messageTime, msg.sender === 'me' ? styles.myMessageTime : styles.otherMessageTime]}>
          {msg.timestamp}
        </ThemedText>
      </View>
    </View>
  );

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
          
          <View style={styles.personInfo}>
            <View style={styles.profilePic}>
              <ThemedText style={styles.profilePicText}>{person.profilePic}</ThemedText>
            </View>
            <View style={styles.personDetails}>
              <ThemedText style={styles.personName}>{person.name}</ThemedText>
              <ThemedText style={styles.personStatus}>{person.isOnline ? 'Online' : 'Offline'}</ThemedText>
            </View>
          </View>
          
          <Pressable style={styles.viewButton} onPress={handleViewProfile}>
            <Eye size={20} color="#ffffff" />
            <ThemedText style={styles.viewButtonText}>View</ThemedText>
          </Pressable>
        </View>
      </LinearGradient>

      <KeyboardAvoidingView 
        style={styles.chatContainer} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(renderMessage)}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor="#999999"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
          />
          <Pressable 
            style={[styles.sendButton, message.trim() ? styles.sendButtonActive : styles.sendButtonInactive]} 
            onPress={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send size={20} color="#ffffff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
  personInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 16,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profilePicText: {
    fontSize: 20,
  },
  personDetails: {
    flex: 1,
  },
  personName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  personStatus: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.8,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },
  messageContainer: {
    marginBottom: 12,
  },
  myMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  myBubble: {
    backgroundColor: '#ff6333',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#ffffff',
  },
  otherMessageText: {
    color: '#000000',
  },
  messageTime: {
    fontSize: 12,
    marginTop: 4,
  },
  myMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  otherMessageTime: {
    color: '#666666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 16,
    color: '#000000',
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#ff6333',
  },
  sendButtonInactive: {
    backgroundColor: '#cccccc',
  },
});
