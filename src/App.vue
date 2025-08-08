<template>
  <div class="container">
    <h1>Modern Latina Form</h1>
    <form @submit.prevent="submitForm">
      <div class="input-field">
        <input id="lastname" v-model="form.lastname" type="text" />
        <label for="lastname">Nom</label>
      </div>
      <div class="input-field">
        <input id="firstname" v-model="form.firstname" type="text" />
        <label for="firstname">Prénom</label>
      </div>
      <div class="input-field select">
        <select v-model="form.selected" required>
          <option disabled value="">Choisir...</option>
          <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>
        <label class="active">Type d'exercice</label>
      </div>
      <label>
        <input type="checkbox" v-model="form.checkbox" />
        <span>Plus d'option ?</span>
      </label>
      <div class="input-field" v-if="form.checkbox">
        <input id="email" v-model="form.email" type="email" />
        <label for="email">Adresse électronique</label>
      </div>
      <button class="btn-primary" type="submit">Enregistrer</button>
    </form>
    <pre>{{ form }}</pre>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  lastname: '',
  firstname: '',
  selected: '',
  checkbox: false,
  email: ''
})

const options = [
  { value: 'haut', text: 'Haut' },
  { value: 'bas', text: 'Bas' },
  { value: 'gauche', text: 'Gauche' },
  { value: 'droite', text: 'Droite' },
  { value: 'milieu', text: 'Milieu' }
]

function submitForm() {
  console.log('Form submitted', JSON.stringify(form))
}
</script>
