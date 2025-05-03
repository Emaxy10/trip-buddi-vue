<template>
    <v-container class="fill-height" fluid>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card elevation="4" class="pa-4 rounded-xl">
            <v-card-title class="text-h5 text-center">User Profile</v-card-title>
  
            <v-card-text>
              <div class="text-center">
                <v-avatar size="100" class="mx-auto mb-4">
                  <v-img src="https://randomuser.me/api/portraits/men/85.jpg" alt="User avatar" />
                </v-avatar>
                <div class="text-h6 font-weight-medium">{{ user.name }}</div>
                <div class="text-subtitle-2 grey--text">{{ user.email }}</div>
                <div class="mt-3">{{ user.bio }}</div>
              </div>
            </v-card-text>
  
            <v-card-actions class="justify-center">
              <v-btn color="primary" @click="editProfile">Edit Profile</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const user = ref({
    name: 'Emmanuel Iroawula',
    email: 'emmanuel@example.com',
    bio: 'Server Administrator at MDS Logistics. Passionate about technology and systems efficiency.',
  })
  
  const editProfile = () => {
    alert('Edit profile clicked')
  }
  </script>
  
  <style scoped>
  .fill-height {
    min-height: 100vh;
  }
  </style>
  