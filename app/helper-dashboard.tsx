import React from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Clock, Star, CheckCircle, Eye } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HelperDashboard() {
  const handleLogout = () => {
    router.replace('/login');
  };

  const handleAcceptTask = (taskId: string) => {
    // TODO: Handle task acceptance
    console.log('Accept task:', taskId);
  };

  const handleViewTask = (taskId: string) => {
    // TODO: Navigate to task details
    console.log('View task:', taskId);
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={['#ff6333', '#ff8c5a']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <ThemedText style={styles.welcomeText}>Welcome back!</ThemedText>
            <ThemedText style={styles.userName}>Helper User</ThemedText>
            <View style={styles.locationContainer}>
              <MapPin size={16} color="#ffffff" />
              <ThemedText style={styles.locationText}>New York, NY</ThemedText>
            </View>
          </View>
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <ThemedText style={styles.logoutText}>Logout</ThemedText>
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Your Stats</ThemedText>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <ThemedText style={styles.statNumber}>12</ThemedText>
              <ThemedText style={styles.statLabel}>Tasks Completed</ThemedText>
            </View>
            <View style={styles.statCard}>
              <ThemedText style={styles.statNumber}>4.8</ThemedText>
              <ThemedText style={styles.statLabel}>Average Rating</ThemedText>
            </View>
          </View>
        </View>

        {/* Available Tasks */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Available Tasks</ThemedText>
          <View style={styles.taskCard}>
            <ThemedText style={styles.taskTitle}>Help moving furniture</ThemedText>
            <View style={styles.taskDetails}>
              <View style={styles.taskDetailItem}>
                <Clock size={16} color="#666666" />
                <ThemedText style={styles.taskDetailText}>Posted 2 hours ago</ThemedText>
              </View>
              <View style={styles.taskDetailItem}>
                <MapPin size={16} color="#666666" />
                <ThemedText style={styles.taskDetailText}>0.5 miles away</ThemedText>
              </View>
            </View>
            <View style={styles.taskActions}>
              <Pressable style={styles.viewButton} onPress={() => handleViewTask('1')}>
                <Eye size={16} color="#ff6333" />
                <ThemedText style={styles.viewButtonText}>View Details</ThemedText>
              </Pressable>
              <Pressable style={styles.acceptButton} onPress={() => handleAcceptTask('1')}>
                <CheckCircle size={16} color="#ffffff" />
                <ThemedText style={styles.acceptButtonText}>Accept</ThemedText>
              </Pressable>
            </View>
          </View>

          <View style={styles.taskCard}>
            <ThemedText style={styles.taskTitle}>Grocery shopping assistance</ThemedText>
            <View style={styles.taskDetails}>
              <View style={styles.taskDetailItem}>
                <Clock size={16} color="#666666" />
                <ThemedText style={styles.taskDetailText}>Posted 4 hours ago</ThemedText>
              </View>
              <View style={styles.taskDetailItem}>
                <MapPin size={16} color="#666666" />
                <ThemedText style={styles.taskDetailText}>1.2 miles away</ThemedText>
              </View>
            </View>
            <View style={styles.taskActions}>
              <Pressable style={styles.viewButton} onPress={() => handleViewTask('2')}>
                <Eye size={16} color="#ff6333" />
                <ThemedText style={styles.viewButtonText}>View Details</ThemedText>
              </Pressable>
              <Pressable style={styles.acceptButton} onPress={() => handleAcceptTask('2')}>
                <CheckCircle size={16} color="#ffffff" />
                <ThemedText style={styles.acceptButtonText}>Accept</ThemedText>
              </Pressable>
            </View>
          </View>
        </View>

        {/* My Accepted Tasks */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>My Accepted Tasks</ThemedText>
          <View style={styles.taskCard}>
            <ThemedText style={styles.taskTitle}>Pet sitting for weekend</ThemedText>
            <View style={styles.taskDetails}>
              <View style={styles.taskDetailItem}>
                <Clock size={16} color="#666666" />
                <ThemedText style={styles.taskDetailText}>Due tomorrow</ThemedText>
              </View>
              <View style={styles.taskDetailItem}>
                <MapPin size={16} color="#666666" />
                <ThemedText style={styles.taskDetailText}>0.8 miles away</ThemedText>
              </View>
            </View>
            <View style={styles.taskStatus}>
              <ThemedText style={styles.statusText}>Status: In Progress</ThemedText>
            </View>
          </View>
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
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
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
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ff6333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  taskCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  taskDetails: {
    marginBottom: 16,
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
  taskActions: {
    flexDirection: 'row',
    gap: 12,
  },
  viewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ff6333',
  },
  viewButtonText: {
    color: '#ff6333',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  acceptButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff6333',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  acceptButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  taskStatus: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 12,
  },
  statusText: {
    fontSize: 14,
    color: '#ff6333',
    fontWeight: '600',
  },
});
