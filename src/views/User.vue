<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>User</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Video {{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-card>

          <ion-card-header>
            <ion-avatar >
              <img alt="Silhouette of a person's head"
                   :src="this.user.profile_photo_url"/>
            </ion-avatar>
            <ion-card-subtitle>{{ this.user && this.user.name }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            {{ this.user && this.user.email }}

          </ion-card-content>
          <ion-card-content>
            <ion-button @click="login">Refresh</ion-button>
          </ion-card-content>

        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonAvatar, IonButton,
  IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
  IonContent, IonHeader,
  IonMenuButton,
  IonPage, IonTitle, IonToolbar,

} from "@ionic/vue";

import store from "../store";
import axios from 'axios'
import { loadingController } from '@ionic/vue';

export default {
  name: "UserBayo.vue",
  components:{
    IonButtons, IonAvatar, IonButton, IonCard,
    IonContent, IonHeader, IonCardHeader, IonCardSubtitle,
    IonMenuButton, IonCardContent,
    IonPage, IonTitle, IonToolbar,

  },
  data(){
    return{
      user: {}
    }
  },
  async mounted() {
    this.user = await store.get('user')
  },
  methods: {
    async login() {

      const loading = await loadingController.create({
        message: "Refreshing User",
        duration: 3000
      });

      await loading.present();
      let response2 = null
      let token = await store.get('token')

      const axiosClient = axios.create({
        baseURL: "https://casteaching.joanbayo.me/api",
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      })
      try {
        response2 = await axiosClient.get('user')
      } catch (error) {
        console.log(error);
      }
      const user = response2.data
      await store.set('user', user)
    }
  },
}
</script>

<style scoped>

</style>