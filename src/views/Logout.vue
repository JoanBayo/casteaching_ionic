<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Video {{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Logout here</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>

          <ion-button @click="logout">LogOut</ion-button>

        </ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script>
import store from "@/store";

import {
  IonButtons,
  IonContent,
  IonCardContent,
  IonCardSubtitle,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonCard, loadingController,
  IonCardHeader,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/vue";


export default {
  name: "LogoutBayo.vue",
  components: {
    IonMenuButton,
    IonContent,
    IonPage,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardSubtitle,
    IonButton
  },

  methods: {
    async logout(){
      const loading = await loadingController.create({
        message: "LoginOut User",
        duration: 1000
      });
      await loading.present();
      await store.set('token', null)
      await store.set('user', null)
      await this.$router.push('login')
    }
  }
}

</script>