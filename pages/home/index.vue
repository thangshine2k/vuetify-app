<script setup lang="ts">
import { ref, computed } from 'vue';

const search = ref('');
const isDialog = ref(false);
const dialog = ref(false);
const isFormValid = ref(false);
const closeItem = ref(false)
const enableItem = ref(true)
const isOn = ref(false)

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

const toggle = () => {
    isOn.value = !isOn.value; // Chuyển đổi trạng thái giữa true và false
}
const toggleContainer = () => {
    isOn.value = !isOn.value; // Chuyển đổi trạng thái giữa true và false
}

const openDialog = () => {
    dialog.value = true;
}

const headersGoal = [
    { title: 'targetList', key: 'targetList' },
    { title: 'reach', key: 'reach' },
    { title: 'code', key: 'code' },
    { title: 'sePeriod', key: 'sePeriod' },
    { title: 'sRating', key: 'sRating' },
    { title: 'targetTitle', key: 'targetTitle' },
    { title: 'targetDetail', key: 'targetDetail' },
];

const listGoal = ref([
    { id: 1, targetList: 'List 1', reach: '50%', code: 'A101', sePeriod: '2025-Q1', sRating: 'Good', targetTitle: 'Title 1', targetDetail: 'Detail 1' },
    { id: 2, targetList: 'List 2', reach: '60%', code: 'A102', sePeriod: '2025-Q2', sRating: 'Very Good', targetTitle: 'Title 2', targetDetail: 'Detail 2' },
    { id: 3, targetList: 'List 3', reach: '70%', code: 'A103', sePeriod: '2025-Q3', sRating: 'Excellent', targetTitle: 'Title 3', targetDetail: 'Detail 3' },
    { id: 4, targetList: 'List 4', reach: '80%', code: 'A104', sePeriod: '2025-Q4', sRating: 'Good', targetTitle: 'Title 4', targetDetail: 'Detail 4' },
    { id: 5, targetList: 'List 5', reach: '85%', code: 'A105', sePeriod: '2026-Q1', sRating: 'Very Good', targetTitle: 'Title 5', targetDetail: 'Detail 5' },
    { id: 6, targetList: 'List 6', reach: '65%', code: 'A106', sePeriod: '2026-Q2', sRating: 'Good', targetTitle: 'Title 6', targetDetail: 'Detail 6' },
    { id: 7, targetList: 'List 7', reach: '75%', code: 'A107', sePeriod: '2026-Q3', sRating: 'Excellent', targetTitle: 'Title 7', targetDetail: 'Detail 7' },
    { id: 8, targetList: 'List 8', reach: '90%', code: 'A108', sePeriod: '2026-Q4', sRating: 'Good', targetTitle: 'Title 8', targetDetail: 'Detail 8' },
    { id: 9, targetList: 'List 9', reach: '55%', code: 'A109', sePeriod: '2027-Q1', sRating: 'Very Good', targetTitle: 'Title 9', targetDetail: 'Detail 9' },
    { id: 10, targetList: 'List 10', reach: '95%', code: 'A110', sePeriod: '2027-Q2', sRating: 'Excellent', targetTitle: 'Title 10', targetDetail: 'Detail 10' },
]);

const newList = ref({ id: 0, targetList: '', targetList1: '', reach: '', code: '', sePeriod: '', sRating: '', targetTitle: '', targetDetail: '' })

const newProduct = ref({
    id: 0,
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
            String(product[key as keyof typeof product]).toLowerCase().includes(search.value.toLowerCase())
        )
    );
});

const addProduct = () => {
    isDialog.value = true; // Mở dialog nếu newProduct hợp lệ 
    resetForm()
};

const editProduct = (item: { id: number; }) => {
    const product = products.value.find((product) => product.id === item.id);
    if (product) {
        isDialog.value = true; // Properly open the dialog
        newProduct.value = { ...product, year: String(product.year) }; // Populate the form with the selected product data
    }
};

const saveProduct = () => {
    if (newProduct.value.id) {
        // Update existing product
        const index = products.value.findIndex((product) => product.id === newProduct.value.id);
        if (index !== -1) {
            products.value[index] = { ...newProduct.value, year: Number(newProduct.value.year) };
        }
    } else {
        // Add new product
        newProduct.value.id = products.value.length + 1; // Generate new ID
        products.value.push({ ...newProduct.value, year: Number(newProduct.value.year) });
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

const deleteProduct = (item: { id: number; }) => {
    products.value = products.value.filter((product) => product.id !== item.id);
};

const resetForm = () => {
    newProduct.value = { id: 0, name: '', price: '', brand: '', year: '', topSpeed: '' };
};

const activateItem1 = () => {
    closeItem.value = false;
    enableItem.value = true; // Đảm bảo item-text2 trở về mặc định
};

const activateItem2 = () => {
    enableItem.value = false;
    closeItem.value = true; // Đảm bảo item-text1 trở về mặc định
};
const demo = () => {
    closeItem.value = true; // Đảm bảo item-text1 trở về mặc định
}

</script>

<template>
    <div style="position: relative; background-color: white; width: 100%;">
        <div style="width: 50%;">
            <v-text-field style="position: relative; left: 70px; top: 12px;" v-model="search" label="Search" clearable
                hint="Enter your name product to access this website" rounded variant="outlined">
                <template #append-inner>
                    <v-icon icon="fa-solid fa-magnifying-glass"></v-icon>
                </template>
            </v-text-field>
        </div>
    </div>
    <v-container class="h-100 w-100">

        <div class="icon-container">
            <div class="icon-group">
                <v-icon icon="fa-solid fa-bell" class="icon1"></v-icon>
                <v-icon icon="fa-solid fa-clipboard" class="icon2"></v-icon>
                <v-icon icon="fa-solid fa-circle-user" class="icon3"></v-icon>
                <v-text class="text1">管理者ユーザー</v-text>
                <v-icon icon="fa-solid fa-circle-question" class="icon4"></v-icon>
                <v-text class="text2">ヘルプ</v-text>
            </div>
        </div>

        <div class="container-aligned">
            <v-text class="aligned-field">
                <div class="aligned-field-item1">
                    ダッシュボード/閲覧可能なシート
                </div>
                <div class="aligned-btn-header">
                    <v-btn class="aligned-btn">
                        <v-icon icon="fa-solid fa-download"></v-icon>
                        Excel一括登録
                    </v-btn>
                </div>
            </v-text>
        </div>
        <div>
            <v-card>
                <div class="text-item2">
                    <div class="item2-text">
                        <v-text :class="{ 'active-text1': enableItem }" class="item-text1"
                            @click="activateItem1">評価・承認シート</v-text>
                        <v-text :class="{ 'active-text2': closeItem }" class="item-text2"
                            @click="activateItem2">閲覧可能なシート</v-text>
                    </div>

                    <v-btn @click="openDialog" class="item2-end-text">
                        <v-text>2020年下半期進行中</v-text>
                    </v-btn>
                </div>

                <div class="container-item3-card1">

                    <v-card class="item3-card1">
                        <div class="svg-icon-fly">
                            <svg style="position: relative; top: 4px;" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 10 24" width="20" height="20" fill="none">
                                <!-- Thân máy bay giấy -->
                                <path d="M2 12L22 2 16 22 12 14 2 12z" fill="#FFD700"></path>
                                <path d="M12 14L22 2 12 11V14z" fill="#FFC107"></path>

                                <!-- Đường gạch ở giữa -->
                            </svg>

                        </div>
                        <div style="position: relative; left: 62px; bottom: 20px;">
                            <v-text>未提出 </v-text>
                            <v-icon icon="fa-solid fa-circle-question"></v-icon>
                        </div>
                        <div style="position: relative; left: 62px; bottom: 30px;">
                            <v-text style="font-weight: bold; font-size: 24px;">
                                48
                            </v-text>
                            <v-text style="font-size: 14px; font-weight: 600;">
                                枚
                            </v-text>
                        </div>
                    </v-card>

                    <v-card class="item3-card1">
                        <div class="svg-icon-fly">
                            <svg style="position: relative; top: 4px;" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 10 24" width="20" height="20" fill="none">
                                <!-- Thân máy bay giấy -->
                                <path d="M2 12L22 2 16 22 12 14 2 12z" fill="#FFD700"></path>
                                <path d="M12 14L22 2 12 11V14z" fill="#FFC107"></path>

                                <!-- Đường gạch ở giữa -->
                            </svg>

                        </div>
                        <div style="position: relative; left: 62px; bottom: 20px;">
                            <v-text>未提出 </v-text>
                            <v-icon icon="fa-solid fa-circle-question"></v-icon>
                        </div>
                        <div style="position: relative; left: 62px; bottom: 30px;">
                            <v-text style="font-weight: bold; font-size: 24px;">
                                48
                            </v-text>
                            <v-text style="font-size: 14px; font-weight: 600;">
                                枚
                            </v-text>
                        </div>
                    </v-card>

                    <v-card class="item3-card1">
                        <div class="svg-icon-fly">
                            <svg style="position: relative; top: 4px;" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 10 24" width="20" height="20" fill="none">
                                <!-- Thân máy bay giấy -->
                                <path d="M2 12L22 2 16 22 12 14 2 12z" fill="#FFD700"></path>
                                <path d="M12 14L22 2 12 11V14z" fill="#FFC107"></path>

                                <!-- Đường gạch ở giữa -->
                            </svg>

                        </div>
                        <div style="position: relative; left: 62px; bottom: 20px;">
                            <v-text>未提出 </v-text>
                            <v-icon icon="fa-solid fa-circle-question"></v-icon>
                        </div>
                        <div style="position: relative; left: 62px; bottom: 30px;">
                            <v-text style="font-weight: bold; font-size: 24px;">
                                48
                            </v-text>
                            <v-text style="font-size: 14px; font-weight: 600;">
                                枚
                            </v-text>
                        </div>
                    </v-card>

                    <v-card class="item3-card1">
                        <div class="svg-icon-fly">
                            <svg style="position: relative; top: 4px;" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 10 24" width="20" height="20" fill="none">
                                <!-- Thân máy bay giấy -->
                                <path d="M2 12L22 2 16 22 12 14 2 12z" fill="#FFD700"></path>
                                <path d="M12 14L22 2 12 11V14z" fill="#FFC107"></path>

                                <!-- Đường gạch ở giữa -->
                            </svg>

                        </div>
                        <div style="position: relative; left: 62px; bottom: 20px;">
                            <v-text>未提出 </v-text>
                            <v-icon icon="fa-solid fa-circle-question"></v-icon>
                        </div>
                        <div style="position: relative; left: 62px; bottom: 30px;">
                            <v-text style="font-weight: bold; font-size: 24px;">
                                48
                            </v-text>
                            <v-text style="font-size: 14px; font-weight: 600;">
                                枚
                            </v-text>
                        </div>
                    </v-card>

                    <v-card class="item3-card1">
                        <div class="svg-icon-fly">
                            <svg style="position: relative; top: 4px;" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 10 24" width="20" height="20" fill="none">
                                <path d="M2 12L22 2 16 22 12 14 2 12z" fill="#FFD700"></path>
                                <path d="M12 14L22 2 12 11V14z" fill="#FFC107"></path>
                            </svg>

                        </div>
                        <div style="position: relative; left: 62px; bottom: 20px;">
                            <v-text>未提出 </v-text>
                            <v-icon icon="fa-solid fa-circle-question"></v-icon>
                        </div>
                        <div style="position: relative; left: 62px; bottom: 30px;">
                            <v-text style="font-weight: bold; font-size: 24px;">
                                48
                            </v-text>
                            <v-text style="font-size: 14px; font-weight: 600;">
                                枚
                            </v-text>
                        </div>
                    </v-card>
                </div>
            </v-card>

        </div>

        <v-card class="card-item2">
            <v-dialog v-model="isDialog" max-width="600px">
                <v-card>
                    <v-form ref="form" v-model="isFormValid" class="mt-8">
                        <v-text-field v-model="newProduct.name" :rules="[v => !!v || 'Required']"
                            label="Product Name"></v-text-field>
                        <v-text-field v-model="newProduct.price" :rules="[v => !!v || 'Required']"
                            label="Price"></v-text-field>
                        <v-text-field v-model="newProduct.brand" :rules="[v => !!v || 'Required']"
                            label="Brand"></v-text-field>
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

            <v-card class="d-sm-flex">
                <v-text class="text-header">
                    全104件中1~20件表示
                </v-text>
                <v-spacer></v-spacer>
                <v-btn class="btn-header">
                    三目標・評価の一覧
                </v-btn>
                <v-btn class="btn-header">
                    <v-icon icon="fa-solid fa-envelope"></v-icon>
                    目標・評価の一覧
                </v-btn>
                <v-btn class="btn-icon-list">
                    <v-icon icon="fa-solid fa-list"></v-icon>
                </v-btn>
                <v-btn class="btn-icon-grid">
                    <v-icon>mdi-grid</v-icon>
                </v-btn>
            </v-card>

            <!-- dialog demo target goal -->
            <v-dialog v-model="dialog" max-width="600px" fullscreen>
                <div class="container-dialog">
                    <v-card style="height: 98.8vh;">
                        <v-form class="ma-6">
                            <v-card-title class="card-title-dialog">全社目標を設定</v-card-title>
                            <div>
                                <v-icon @click="dialog = false"
                                    style="position: fixed;font-size: 20px; color: black; left: 97%; top: 3.2%; background-color: #f1eeee; width: 26px; height: 26px; border-radius: 12px; cursor: pointer;"
                                    icon="fa fa-times"></v-icon>
                            </div>
                            <v-spacer />
                            <v-text-title class="text-item1-dialog">目標のカテゴリ</v-text-title>
                            <v-text-title class="text-item2-dialog">目標のカテゴリ</v-text-title>

                            <v-icon class="icon1-down-dialog" icon="fa fa-chevron-down"></v-icon>
                            <v-icon class="icon2-down-dialog" icon="fa fa-chevron-down"></v-icon>

                            <v-card-list class="list-item1-dialog">
                                <v-text-field class="item1-dialog" v-model="newList.targetList" rounded
                                    variant="outlined" label="目標のカテゴリ"></v-text-field>
                                <v-text-field class="item2-dialog" v-model="newList.targetList" label="目標のカテゴリ" rounded
                                    variant="outlined"></v-text-field>

                            </v-card-list>

                            <v-text-title class="text-item3-dialog">達成数字</v-text-title>
                            <v-text class="text-item4-dialog">
                                <v-text-title>目標コード</v-text-title>
                            </v-text>
                            <div style="display: flex;">
                                <div style="width: 25%;">
                                    <v-text-field class="item3-dialog" style="opacity: 0.7;" v-model="newList.reach"
                                        label="1.000.000" rounded variant="outlined"><v-text
                                            style="position: relative; left: 90%; font-weight: bold; color: black;">円</v-text></v-text-field>
                                </div>
                                <v-text
                                    style="position: relative; font-size: 18px; color: black; font-weight: 500; right: 8px; top: 16px;">~</v-text>
                                <div style="width: 25%;">
                                    <v-text-field class="item4-dialog" style="opacity: 0.7" v-model="newList.reach"
                                        label="2.000.000" rounded variant="outlined"><v-text
                                            style="position: relative; left: 90%; font-weight: bold; color: black; ">円</v-text></v-text-field>
                                </div>
                                <v-text-field class="item5-dialog" v-model="newList.sRating" label="評価サイクルを選択"
                                    type="year" rounded variant="outlined"></v-text-field>
                            </div>

                            <v-text-title class="text-item5-dialog">評価サイクルを選択</v-text-title>
                            <v-text-title class="text-item6-dialog">紐づける評価シートを選択</v-text-title>
                            <v-icon class="icon3-down-dialog" icon="fa fa-chevron-down"></v-icon>
                            <v-text-list class="list-item6-dialog">
                                <v-text-field class="item6-dialog" v-model="newList.targetTitle" label="評価サイクルを選択"
                                    rounded variant="outlined"></v-text-field>
                                <v-text-field class="item7-dialog" v-model="newList.targetTitle" label="紐づける評価シートを選択"
                                    rounded variant="outlined"></v-text-field>
                            </v-text-list>
                            <v-text-title class="text-item7-dialog">目標タイトル</v-text-title>

                            <v-text-field class="item7-dialog" v-model="newList.targetDetail" label="目標タイトル" rounded
                                variant="outlined"></v-text-field>
                            <v-text-title class="text-item8-dialog">目標の詳細</v-text-title>

                            <v-textarea class="item8-dialog" v-model="newList.targetDetail" label="目標の詳細" rounded
                                variant="outlined"></v-textarea>
                            <div style="display: flex; width: 100%;">
                                <v-text class="text-item9-dialog">評価シートでの表示設定</v-text>
                                <div class="toggle-container" :class="{ active: isOn, inative: !isOn }" @click="toggleContainer">
                                    <v-text-list class="text-list">
                                        <v-text class="text-off" >OFF</v-text>
                                        <v-text class="text-on" >ON</v-text>
                                    </v-text-list>
                                    <div class="toggle-switch" :class="{ on: isOn, off: !isOn }" @click="toggle"></div>
                                </div>
                            </div>
                        </v-form>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="validateAndSave">Save</v-btn>
                            <v-btn color="error" @click="dialog = false">Cancel</v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </v-dialog>

            <v-data-table :headers="headersGoal" :items:="listGoal" hover>
            </v-data-table>

            <v-data-table :headers="headers" :items="filteredProducts" class="elevation-1" hover>
                <template v-slot:top>
                    <v-card class="">
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

<style scoped>
.container-dialog {
    position: fixed;
    width: 50%;
    /* Chiều rộng đầy đủ của viewport */
    height: 98.5vh;
    background-color: #f1f1f1;
    top: 0.8%;
    right: 0.5%;
    background-color: #f1f1f1;
}

.card-title-dialog {
    position: relative;
    font-weight: bold;
    right: 16px;
    bottom: 12px;
    color: black;
}

.list-item1-dialog {
    display: flex;
}

.item1-dialog {
    margin-right: 20px;
}

.text-item1-dialog {
    position: relative;
    font-weight: bold;
    font-size: 16px;
    bottom: 4px;
}

.text-item3-dialog {
    position: relative;
    font-weight: bold;
    font-size: 16px;
    bottom: 4px;
}

.text-item5-dialog {
    position: relative;
    font-weight: bold;
    font-size: 16px;
    bottom: 4px;
}

.text-item7-dialog {
    position: relative;
    font-weight: bold;
    font-size: 16px;
    bottom: 4px;
}

.text-item8-dialog {
    position: relative;
    font-weight: bold;
    font-size: 16px;
    bottom: 4px;
}

.text-item9-dialog {
    position: relative;
    font-weight: bold;
    font-size: 16px;
    top: 18px;
}

.toggle-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    width: 68px;
    height: 28px;
    background-color: #e0e0e0;
    border-radius: 20px;
    padding: 5px;
    left: 70px;
    top: 16px;
}
.toggle-container.active{
    color: #ff9800;
    background-color: #ff9800;
}
.toggle-container.inative{
    background-color: #e0e0e0;
}

/* Text list */
.text-list {
    position: absolute;
    display: flex;
    justify-content: space-between;
}

v-text {
    font-size: 12px;
    color: black;
    transition: color 0.3s ease-in-out;
}

.text-off {
    position: relative;
    right: 44px;
    color: black;
    font-size: 16px;
    cursor: pointer;
}
.text-on {
    position: relative;
    left: 40px;
    color: black;
    font-size: 16px;
    cursor: pointer;
}

.toggle-switch.active {
    color: #ff9800;;
    background-color: #ff9800;
}

/* Toggle switch (nút tròn) */
.toggle-switch {
    position: relative;
    width: 24px;
    height: 24px;
    background-color: gray;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

/* Khi bật (ON) */
.toggle-switch.on {
    background-color: #ff9800;
    /* Màu cam khi bật */
    transform: translateX(32px);
    /* Di chuyển sang phải */
}

/* Khi tắt (OFF) */
.toggle-switch.off {
    background-color: gray;
    /* Màu xám khi tắt */
    transform: translateX(0);
    /* Vị trí mặc định */
    transition: all 0.3s ease-in-out;
    /* Animation mượt */
}

/* Khi tắt (OFF) */
.toggle-switch {
    transform: translateX(0);
    /* Vị trí mặc định */
}


.icon1-down-dialog {
    position: relative;
    font-size: 12px;
    top: 42px;
    left: 19%;
    cursor: pointer;
}

.icon2-down-dialog {
    position: relative;
    font-size: 12px;
    top: 42px;
    left: 69%;
    cursor: pointer;
}

.icon3-down-dialog {
    position: relative;
    font-size: 12px;
    top: 42px;
    left: 57.5%;
    cursor: pointer;
}

.text-item2-dialog {
    position: relative;
    left: 39%;
    font-weight: bold;
    font-size: 16px;
    bottom: 4px;
}

.item3-dialog {
    margin-right: 20px;
}

.item4-dialog {
    margin-right: 20px;
}

.text-item4-dialog {
    position: relative;
    left: 44%;
    font-weight: bold;
    font-size: 16px;
    bottom: 4px;
}

.text-item6-dialog {
    position: relative;
    left: 35%;
    font-weight: bold;
    font-size: 16px;
    bottom: 4px;
}

.list-item6-dialog {
    display: flex;
}

.item6-dialog {
    margin-right: 20px;
}

.v-card {
    color: #505050;
}

.icon-container {
    position: relative;
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
    bottom: 73px;
    left: 50%;
    width: 50%;
}

.icon-group {
    cursor: pointer;
}

.icon1 {
    font-size: 24px;
    /* Adjust icon size */
    color: black;
    margin: 10px;
    cursor: pointer;
}

.icon2 {
    font-size: 24px;
    /* Adjust icon size */
    color: black;
    margin: 10px;
}

.icon3 {
    font-size: 24px;
    /* Adjust icon size */
    color: black;
    margin: 10px;
}

.icon4 {
    font-size: 24px;
    /* Adjust icon size */
    color: black;
    margin: 10px;
}

.text1 {
    font-size: 14px;
    /* Adjust text size */
    color: black;
}

.text2 {
    font-size: 14px;
    /* Adjust text size */
    color: black;
}

.container-aligned {
    width: 100%;
    position: relative;
}

/* Field on the Left */
.aligned-field {
    position: relative;
    height: 80px;
}

.aligned-field-item1 {
    font-weight: bold;
    position: relative;
    bottom: 20px;
}

.aligned-btn-header {
    position: absolute;
    display: flex;
    left: 90%;
    padding-right: 20px;
    width: 10%;
    bottom: 20px;
}

/* Button on the Right */
.aligned-btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border: 2px solid white;
    border-radius: 8px;
    color: black;
    background-color: white;
    font-size: 14px;
    font-weight: 700;
}

.icon-wrapper {
    display: flex;
    align-items: center;
    font-size: 18px;
    /* Adjust icon size */
}

.text-item2 {
    display: flex;
    margin: 20px 12px;
}

.item2-text {
    position: relative;
    display: flex;
    border-radius: 16px;
    background-color: #f1eeee;
    height: 52px;
    width: 360px;
}

.active-text1 {
    background-color: white;
}

.item-text1 {
    display: flex;
    height: 36px;
    width: 180px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    margin: 8px 6px;
    color: black;
    border: #505050;
    font-weight: bold;
    cursor: pointer;
}

.item-text2 {
    display: flex;
    height: 36px;
    width: 180px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    margin: 8px 6px;
    color: black;
    background-color: #f1eeee;
    border: #505050;
    font-weight: bold;
    cursor: pointer;
}

.active-text2 {
    background-color: white;
}

.item2-end-text {
    display: flex;
    position: absolute;
    left: 88.8%;
    font-weight: bold;
}

.container-item3-card1 {
    display: flex;
}

.item3-card1 {
    width: 360px;
    height: 80px;
    background-color: white;
    border: 1px solid rgb(243, 243, 234);
    border-radius: 12px;
    margin: 18px 12px;
}

.svg-icon-fly {
    position: relative;
    top: 16px;
    left: 18px;
    width: 30px;
    height: 30px;
    background-color: rgb(243, 243, 234);
    border-radius: 4px;
}

.card-item2 {
    margin-top: 12px;
}

.text-header {
    margin: 16px 16px;
}

.btn-header {
    margin: 16px;
}

.btn-icon-list {
    margin: 16px 0 0 0;
}

.btn-icon-grid {
    margin: 16px 16px 0 0;
    background-color: #fbf5f5;
}
</style>