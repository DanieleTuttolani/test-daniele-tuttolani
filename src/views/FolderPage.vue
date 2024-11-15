<script setup>
import { ref } from 'vue';
import {
  IonButtons, IonContent, IonHeader,
  IonMenuButton, IonPage, IonTitle, IonToolbar, IonModal, IonDatetime,
  loadingController, IonLoading
} from '@ionic/vue';
import { IonDatetimeButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import router from '@/router';
import { filter } from 'ionicons/icons';


const hotel_codes = ['POL', 'MON', 'ALE'];

const hotel_code = ref(null);
const date_start = ref();
const days = ref(1);

const isLoading = ref(false)
// https://test.appazzurroclub.it/serveracv/public/api/Api3/offers?hotel_code=POL&date_start=2024-10-01&days=6&rooms%5B0%5D%5Bpeoples%5D=3&rooms%5B0%5D%5Broom_type_id%5D=37&lang=it&flexible_dates=true
const primaProva = () => {
  if (hotel_code.value && date_start.value && days.value) {

    isLoading.value = true
    const apiBase = `https://test.appazzurroclub.it/serveracv/public/api/Api3/offers?hotel_code=${hotel_code.value}&date_start=${date_start.value}&days=${days.value}&rooms%5B0%5D%5Bpeoples%5D=3&rooms%5B0%5D%5Broom_type_id%5D=37&lang=it&flexible_dates=true `

    fetch(apiBase, {
      method: 'GET'
    })
      .then(x => x.json())
      .then(filterData => {
        let result = JSON.stringify(filterData);
        router.push({ name: 'filterResults', params: { filterData: result } })
        isLoading.value = false
      })


  } else {
    //todo inserire validazione migliore ? 
    alert('Non hai inserito tutti i dati')
  }

}
</script>
<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="warning"></ion-menu-button>
        </ion-buttons>
        <ion-title>Test Ionic Daniele Tuttolani</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <strong class="capitalize title">CERCA LA TUA PROSSIMA ESPERIENZA!</strong>
        <div class="card">
          <!-- titolo -->
          <!-- contenuto card -->
          <div class="card-flex">

            <div class="label">
              <p class="label-title">Codice Hotel</p>
              <select v-model="hotel_code">
                <option v-for="code in hotel_codes">{{ code }}</option>
              </select>
            </div>
            <div class="label">
              <p class="label-title">Data d'inizio</p>
              <input type="date" v-model="date_start">
            </div>
            <div class="label">
              <p class="label-title">Numero Giorni</p>
              <input type="number" min="0" max="365" v-model="days">
            </div>
            <ion-modal :keep-contents-mounted="true">
              <ion-datetime id="datetime"></ion-datetime>
            </ion-modal>
          </div>

          <button id="fetchFilterResultButton" @click="primaProva" class="prim-button">Cerca</button>
          <ion-loading :is-open="isLoading" trigger="fetchFilterResultButton" :duration="1500"
            message="Attendere"></ion-loading>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>


<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.prim-button {
  border-radius: 10px;
  border: 2px solid #eb7207;
  background-color: #1d99c8;
  padding: 15px;
  color: white;
  font-size: 15px;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

.title {
  color: #11568c;
  text-align: center;
  padding: 10px 0 10px 0;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  margin: 0;
}

#container a {
  text-decoration: none;
}

.card {
  background-color: #11568c;
  border-radius: 20px;
  width: 90%;
  padding: 10px;
}

.card-flex {
  display: flex;
  padding: 10px;
  flex-wrap: nowrap;
  flex-direction: column;
}

.label {
  border: 1px solid #eb7207;
  padding: 10px;
  border-radius: 10px;
  position: relative;
  margin: 10px 0 10px 0;
}

.label>select,
.label>input {
  border-radius: 10px;
  padding: 10px;
  width: -webkit-fill-available;
}

.label-title {
  top: -14px;
  position: absolute;
  color: #eb7207;
  background-color: #11568c;
}


:root {
  --ion-color-bar: #eba807;
  --ion-color-bar-rgb: 235, 168, 7;
  --ion-color-bar-contrast: #000000;
  --ion-color-bar-contrast-rgb: 0, 0, 0;
  --ion-color-bar-shade: #cf9406;
  --ion-color-bar-tint: #edb120;
}

.ion-color-bar {
  --ion-color-base: var(--ion-color-bar);
  --ion-color-base-rgb: var(--ion-color-bar-rgb);
  --ion-color-contrast: var(--ion-color-bar-contrast);
  --ion-color-contrast-rgb: var(--ion-color-bar-contrast-rgb);
  --ion-color-shade: var(--ion-color-bar-shade);
  --ion-color-tint: var(--ion-color-bar-tint);
}

ion-toolbar {
  --background: #eba807;
  color: white;
}
</style>
