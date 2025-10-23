import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, ArrowLeft, Clock, MapPin, ChevronRight } from 'lucide-react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function AllTasksScreen() {
  // Mock data for all tasks - in real app this would come from API
  const [allTasks] = useState([
    { id: 1, title: 'Need help moving furniture', status: 'pending', assigned: true, completed: false, postedDate: '2 hours ago', location: 'Downtown' },
    { id: 2, title: 'Grocery shopping assistance', status: 'completed', assigned: true, completed: true, postedDate: '1 day ago', location: 'Midtown' },
    { id: 3, title: 'Pet sitting for weekend', status: 'pending', assigned: false, completed: false, postedDate: '3 days ago', location: 'Uptown' },
    { id: 4, title: 'Garden maintenance help', status: 'assigned', assigned: true, completed: false, postedDate: '1 week ago', location: 'Westside' },
    { id: 5, title: 'House cleaning service', status: 'completed', assigned: true, completed: true, postedDate: '2 weeks ago', location: 'Eastside' },
    { id: 6, title: 'Car wash and detailing', status: 'pending', assigned: false, completed: false, postedDate: '3 weeks ago', location: 'Downtown' },
    { id: 7, title: 'Moving boxes organization', status: 'assigned', assigned: true, completed: false, postedDate: '1 month ago', location: 'Northside' },
    { id: 8, title: 'Dog walking service', status: 'completed', assigned: true, completed: true, postedDate: '1 month ago', location: 'Southside' },
  ]);

  const [visibleTasks, setVisibleTasks] = useState<number[]>([]);

  useEffect(() => {
    // Animate tasks in sequence
    allTasks.forEach((_, index) => {
      setTimeout(() => {
        setVisibleTasks(prev => [...prev, index]);
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

  const handleTaskPress = (taskId: number) => {
    router.push('/task-details');
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
          <ThemedText style={styles.headerTitle}>All Tasks</ThemedText>
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
            <ThemedText style={styles.sectionTitle}>All Tasks ({allTasks.length})</ThemedText>
          </View>
          
          {allTasks.map((task, index) => (
            <View key={task.id} style={[styles.taskCard, { 
              opacity: visibleTasks.includes(index) ? 1 : 0,
              transform: [{ translateY: visibleTasks.includes(index) ? 0 : 50 }]
            }]}>
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
                        <ThemedText style={styles.taskDetailTextWhite}>Posted {task.postedDate}</ThemedText>
                      </View>
                      <View style={styles.taskDetailItem}>
                        <MapPin size={18} color="#ffffff" />
                        <ThemedText style={styles.taskDetailTextWhite}>{task.location}</ThemedText>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              </View>
            </View>
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
  taskDetailTextWhite: {
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 8,
    opacity: 0.9,
  },
});
