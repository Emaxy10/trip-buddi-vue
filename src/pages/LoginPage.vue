<template>
    <v-sheet class="mx-auto">
        <v-form >
            <v-text-field
                v-model="email"
                label="Email"
            ></v-text-field>

            <v-text-field
                v-model="password"
                label="password"
                type="password"
            ></v-text-field>
            
                <v-btn
                    :loading="loading"
                    class="mt-2"
                    text="Submit"
                    type="submit"
                    block
                ></v-btn>
        </v-form>
    </v-sheet>
</template>

<script setup>
</script>