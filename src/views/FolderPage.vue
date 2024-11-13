<script setup>
import { ref } from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonModal, IonDatetime } from '@ionic/vue';
import { IonDatetimeButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import router from '@/router';
import { filter } from 'ionicons/icons';


const hotel_codes = ['POL', 'MON', 'ALE'];

const hotel_code = ref(null);
const date_start = ref();
const days = ref(1);


// https://test.appazzurroclub.it/serveracv/public/api/Api3/offers?hotel_code=POL&date_start=2024-10-01&days=6&rooms%5B0%5D%5Bpeoples%5D=3&rooms%5B0%5D%5Broom_type_id%5D=37&lang=it&flexible_dates=true
const primaProva = () => {
  if (hotel_code.value && date_start.value && days.value) {

    const apiBase = `https://test.appazzurroclub.it/serveracv/public/api/Api3/offers?hotel_code=${hotel_code.value}&date_start=${date_start.value}&days=${days.value}&rooms%5B0%5D%5Bpeoples%5D=3&rooms%5B0%5D%5Broom_type_id%5D=37&lang=it&flexible_dates=true `

    fetch(apiBase, {
      method: 'GET'
    })
      .then(x => x.json())
      .then(filterData => {
        let result = JSON.stringify(filterData);
        router.push({ name: 'filterResults', params: { filterData: result } })
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
          <ion-menu-button color="primary"></ion-menu-button>
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
        <div class="card">
          <!-- titolo -->
          <strong class="capitalize">Cerca Hotel</strong>
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

          <button @click="primaProva"
            style="border-radius: 10px; background-color: white; padding: 15px;">Cerca</button>

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
}

#container strong {
  font-size: 20px;
  line-height: 26px;
  color: white;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

.card {
  background-color: #1e1e1e;
  border-radius: 20px;
  width: 50%;
  min-height: 400px;
  transform: translateX(50%);
  padding: 10px;
}

.card-flex {
  display: flex;
  padding: 10px;
  flex-wrap: nowrap;
  flex-direction: column;
}

.label {
  border: 1px solid white;
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
  color: white;
  background-color: #1e1e1e;
}
</style>
