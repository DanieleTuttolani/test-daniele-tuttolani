<script setup>
import { ref } from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonModal, IonDatetime, IonBackButton } from '@ionic/vue';
import { useRoute } from 'vue-router';

const props = defineProps({ filterData: String });

// console.log(JSON.parse(props.filterData));
const results = JSON.parse(props.filterData)

</script>
<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                    <ion-back-button defaultHref='/' v-if="useRoute() != 'Home'">Indietro</ion-back-button>
                </ion-buttons>
                <ion-title>Risultati Filtro</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="false" class="ion-padding">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large"></ion-title>
                </ion-toolbar>
            </ion-header>

            <div id="container">
                PAGINA RISULTATI
                <div class="card" v-html="results.data">
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
    display: flex;
    flex-direction: column;
    align-items: center;
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

ion-toolbar {
    --background: #eba807;
    color: white;
}
</style>
