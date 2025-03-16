<template>
  <v-container>
    <v-card>
      <v-text-field class="w-50" v-model="search" label="Search" clearable
                hint="Enter your name product to access this website" rounded>
                <template #append-inner>
                    <v-icon icon="fa-solid fa-magnifying-glass"></v-icon>
                </template>
            </v-text-field>
      <!-- Dialog for adding products -->
      <v-dialog v-model="isDialog" max-width="600px">
        <v-card>
          <v-form ref="form" v-model="isFormValid" class="mt-8">
            <v-text-field v-model="newProduct.name" :rules="[v => !!v || 'Required']"
              label="Product Name"></v-text-field>
            <v-text-field v-model="newProduct.price" :rules="[v => !!v || 'Required']" label="Price"></v-text-field>
            <v-text-field v-model="newProduct.brand" :rules="[v => !!v || 'Required']" label="Brand"></v-text-field>
            <v-text-field v-model="newProduct.year" :rules="[v => !!v || 'Required']" label="Year"
              type="number"></v-text-field>
            <v-text-field v-model="newProduct.topSpeed" :rules="[v => !!v || 'Required']"
              label="Top Speed"></v-text-field>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="validateAndSave">Save</v-btn>
            <v-btn color="error" @click="isDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Data Table -->
      <v-data-table :headers="headers" :items="filteredProducts" class="elevation-1" hover>
        <template v-slot:top>
          <v-card class="mt-4">
            <v-btn color="success" @click="addProduct">Add Product</v-btn>
          </v-card>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn color="primary" @click="editProduct(item)">Edit</v-btn>
          <v-btn color="error" @click="deleteProduct(item)">Delete</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';

const search = ref('');
const isDialog = ref(false); // Correct usage with reactive ref
const isFormValid = ref(false);

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Price', key: 'price' },
  { title: 'Brand', key: 'brand' },
  { title: 'Year', key: 'year' },
  { title: 'Top Speed', key: 'topSpeed' },
  { title: 'Actions', key: 'actions' },
];

const products = ref([
  { id: 1, name: 'Ferrari SF90', price: '$500,000', brand: 'Ferrari', year: 2023, topSpeed: '211 mph' },
  { id: 2, name: 'Lamborghini Aventador', price: '$393,695', brand: 'Lamborghini', year: 2022, topSpeed: '217 mph' },
  { id: 3, name: 'Bugatti Chiron', price: '$3,000,000', brand: 'Bugatti', year: 2023, topSpeed: '261 mph' },
  { id: 4, name: 'McLaren P1', price: '$1,150,000', brand: 'McLaren', year: 2025, topSpeed: '217 mph' },
]);

const newProduct = ref({
  id: null,
  name: '',
  price: '',
  brand: '',
  year: '',
  topSpeed: '',
});

const filteredProducts = computed(() => {
  if (!search.value) {
    return products.value;
  }
  return products.value.filter((product) =>
    ['name', 'brand'].some((key) =>
      String(product[key]).toLowerCase().includes(search.value.toLowerCase())
    )
  );
});

const addProduct = () => {
  isDialog.value = true; // Mở dialog nếu newProduct hợp lệ 
  isFormValid = true
};

const editProduct = (item) => {
  const product = products.value.find((product) => product.id === item.id);
  if (product) {
    isDialog.value = true; // Properly open the dialog
    newProduct.value = { ...product }; // Populate the form with the selected product data
  }
};

const saveProduct = () => {
  if (newProduct.value.id) {
    // Update existing product
    const index = products.value.findIndex((product) => product.id === newProduct.value.id);
    if (index !== -1) {
      products.value[index] = { ...newProduct.value };
    }
  } else {
    // Add new product
    newProduct.value.id = products.value.length + 1; // Generate new ID
    products.value.push({ ...newProduct.value });
  }
  resetForm(); // Clear the form
  isDialog.value = false; // Close the dialog after saving
};

const validateAndSave = () => {
  // const form = document.querySelector('form'); // Access the form element
  if (isFormValid.value) {
    saveProduct();
  } else {
    alert("Please fill all fields")
  }
};

const deleteProduct = (item) => {
  products.value = products.value.filter((product) => product.id !== item.id);
};

const resetForm = () => {
  newProduct.value = { id: null, name: '', price: '', brand: '', year: '', topSpeed: '' };
};

</script>


<style scoped>
.v-card {
  color: #505050;
}
</style>