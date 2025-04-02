<template>
    <div id="app">
        <v-app>
            <v-container fluid>
                <v-app-bar app color="primary" dark>
                    <v-toolbar-title>Trip Buddi</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn text>Login</v-btn>
                    <v-btn text>Register</v-btn>
                </v-app-bar>
                
                <v-main>
                    <v-container fluid>
                        <v-row>
                            <v-col cols="3">
                                <v-navigation-drawer app permanent>
                                    <v-list>
                                        <v-list-item-group>
                                            <v-list-item link>
                                                <v-list-item-content>
                                                    <v-list-item-title>Dashboard</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item link>
                                                <v-list-item-content>
                                                    <v-list-item-title>Destinations</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item link>
                                                <v-list-item-content>
                                                    <v-list-item-title>Trips</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item link>
                                                <v-list-item-content>
                                                    <v-list-item-title>Settings</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list-item-group>
                                    </v-list>
                                </v-navigation-drawer>
                            </v-col>
                            <v-col>
                                <v-container class="pa-4 text-center">
                                    <h2>Welcome to Trip Buddi</h2>
                                    <p>Your travel companion for amazing trips!</p>
                                    <v-row justify="center">
                                        <v-col cols="12" sm="4">
                                            <v-card>
                                                <v-card-title>Hotels</v-card-title>
                                                <v-card-text>Find the best hotels for your trip.</v-card-text>
                                            </v-card>
                                        </v-col>
                                        <v-col cols="12" sm="4">
                                            <v-card>
                                                <v-card-title>Restaurants</v-card-title>
                                                <v-card-text>Explore top dining options.</v-card-text>
                                            </v-card>
                                        </v-col>
                                        <v-col cols="12" sm="4">
                                            <v-card>
                                                <v-card-title>Hangouts</v-card-title>
                                                <v-card-text>Discover fun places to hang out.</v-card-text>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-main>
            </v-container>
        </v-app>
    </div>
    
</template>