<template>
  <ion-list>
    <ion-list-header>
      Videos
    </ion-list-header>
    <ion-item v-for="video in videos" :key="video.id">
      <ion-avatar slot="start">
        <ion-skeleton-text></ion-skeleton-text>
      </ion-avatar>
      <ion-label>
        <h2>{{ video.title }}</h2>
        <p>{{ video.description }}</p>
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script>
import {IonAvatar, IonItem, IonLabel, IonList, IonListHeader} from "@ionic/vue";
import casteaching from "@acacha/casteaching";
const api = casteaching({baseUrl: 'http://casteachingbayo.test/api/'})

export default {
  name: "VideosBayo",
  components: {
    IonList,
    IonItem,
    IonListHeader,
    IonAvatar,
    IonLabel
  },
  data() {
    return {
      videos: [
        {
          id: 1,
          title: "Ubuntu 101",
          description: "Here description",
          url: "https://www.youtube.com/embed/a4ez0CcEHV4",
        },
        {
          id: 2,
          title: "Ubuntu 102",
          description: "Here description",
          url: "https://www.youtube.com/embed/a4ez0CcEHV4",
        },
        {
          id: 3,
          title: "Ubuntu 103",
          description: "Here description",
          url: "https://www.youtube.com/embed/a4ez0CcEHV4",
        }
      ]
    }
  },
  async created() {
    this.videos = await api.videos()
  }
}
</script>

<style scoped>

</style>