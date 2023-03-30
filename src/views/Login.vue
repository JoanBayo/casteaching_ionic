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
          <ion-card-subtitle>Please login</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>

          <ion-item>
            <ion-label>Email</ion-label>
            <ion-input v-model="email" placeholder="email" type="text"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label>Password</ion-label>
            <ion-input v-model="password" placeholder="password" type="password"></ion-input>
          </ion-item>

          <ion-button @click="login">Login</ion-button>

        </ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonButtons,
  IonContent,
  IonCardContent,
  IonCardSubtitle,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonCard,
  IonCardHeader,
  IonTitle,
  IonToolbar,
  IonInput, loadingController,
  IonButton, IonLabel, IonItem
} from "@ionic/vue";
import { Device } from '@capacitor/device';
import store from "@/store";


export default {
  name: "LoginBayo.vue",
  components: {
    IonMenuButton,
    IonContent,
    IonPage,
    IonButtons,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonToolbar,
    IonHeader,
    IonCardContent,
    IonCardSubtitle,
    IonInput,
    IonButton,
    IonLabel,
    IonItem,

  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {

      const loading = await loadingController.create({
        message: "Charging User",
        duration: 1000
      });
      await loading.present();

      const info = await Device.getInfo();

      let token = null
      const device_name = (info && info.name) || 'TokenCasteachingIonic'
      try {
        token = await this.casteaching.login(this.email, this.password, device_name)
        this.casteaching.setToken(token)
      } catch (error){
        console.log(error);
      }

      let user
      try {
        user = await this.casteaching.user()
      }catch (error){
        console.log(error);
      }

      //GUARDAR
      await store.set('token', token)
      await store.set('user', user)

      this.emitter.emit('login', user)

      //REIDRECT
      let path = '/user'

      if (this.$route.params && this.$route.params.wantedRoute) path = this.$route.params.wantedRoute
      await this.$router.push({path})

    }
  }
}
</script>

<style scoped>

</style>