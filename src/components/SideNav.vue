<template>
        <v-navigation-drawer>
      <v-list nav>
        <v-list-item to="/place" router>
            <v-list-item-title>Places</v-list-item-title>
        </v-list-item>

        <v-list-item to="/users">
          <v-list-item-title>Users</v-list-item-title>
        </v-list-item>
        
        <v-list-item link title="List Item 3"></v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>