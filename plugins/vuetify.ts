import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure your project is capable of handling css files
import '@fortawesome/fontawesome-free/css/all.css' // Ensure your project is capable of handling css files

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'customTheme',
      themes: {
        customTheme: {
          dark: true, // Set to true if you want a dark theme
          colors: {
            secondary: '#8BC34A', // Light green for secondary
            background: '#F5F5F5', // Light background
            surface: '#FFFFFF', // White surface
            error: '#FF5252',
            info: '#2196F3',
            // success: '#4CAF50',
            // warning: '#FFC107',
          },
        },
      },
    },
    icons: {
      defaultSet: 'mdi',

  },
  })
  app.vueApp.use(vuetify)
})