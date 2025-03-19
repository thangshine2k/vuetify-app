<script setup lang="ts">
import { ref } from "vue";

interface Header {
    title: string;
    key: keyof Item;
    sortable: boolean;
    width: string;
}

interface Item {
    id: number;
    goalVerification: string;
    midTermInterview: string;
    setting: Array<{ text: string; icon: string }>; // Đổi thành mảng
    evaluator1: string;
    evaluator2: string;
    evaluator3: string;
    evaluationAdjustment: string;
}

const headers = ref<Header[]>([
    { title: "", key: "id", sortable: false, width: "10px" },
    { title: "C", key: "goalVerification", sortable: false, width: "230px" },
    { title: "D", key: "midTermInterview", sortable: false, width: "230px" },
    { title: "E", key: "setting", sortable: false, width: "430px" },
    { title: "F", key: "evaluator1", sortable: false, width: "130px" },
    { title: "G", key: "evaluator2", sortable: false, width: "230px" },
    { title: "H", key: "evaluator3", sortable: false, width: "230px" },
    { title: "K", key: "evaluationAdjustment", sortable: false, width: "230px" }
]);

const items = ref<Item[]>([
    { id: 1, goalVerification: "Completed", midTermInterview: "Pending", setting: [], evaluator1: "John", evaluator2: "Doe", evaluator3: "Smith", evaluationAdjustment: "Reviewed" },
    { id: 2, goalVerification: "Pending", midTermInterview: "Scheduled", setting: [], evaluator1: "Alice", evaluator2: "Bob", evaluator3: "Charlie", evaluationAdjustment: "In Progress" }
]);

const setting = ref([
    { text: "Numerical value", icon: "mdi-numeric" },
    { text: "Link", icon: "mdi-link" },
    { text: "Date", icon: "mdi-calendar" },
    { text: "Date of birth", icon: "mdi-calendar-account" },
    { text: "Line text", icon: "mdi-format-text" },
    { text: "Multiline text", icon: "mdi-text-box-multiple" },
    { text: "Choice", icon: "mdi-checkbox-marked" },
    { text: "Upload", icon: "mdi-cloud-upload" },
    { text: "Currency", icon: "mdi-currency-usd" },
    { text: "Email address", icon: "mdi-email" },
    { text: "Telephone number", icon: "mdi-phone" },
    { text: "Period", icon: "mdi-clock-outline" },
    { text: "Calculation formula (date)", icon: "mdi-calendar-clock" },
    { text: "Calculation formula (number)", icon: "mdi-calculator" },
    { text: "Text", icon: "mdi-text" },
    { text: "File DL", icon: "mdi-file-download" },
    { text: "Link", icon: "mdi-link" },
    { text: "Period", icon: "mdi-clock-outline" },
    { text: "Label", icon: "mdi-label" },
    { text: "Separator", icon: "mdi-minus" },
    { text: "Height adjustment", icon: "mdi-arrow-expand-vertical" }
]);

const startDrag = (event: DragEvent, item: { text: string; icon: string }) => {
    if (event.dataTransfer) {
        event.dataTransfer.setData("text/plain", JSON.stringify(item));
    }   
};


const onDrop = (event: DragEvent, employee: { criteria: any[]; }) => {
  if (event.dataTransfer) {
    const data = event.dataTransfer.getData('text/plain');
    console.log('Data received:', data);
    const item = JSON.parse(data);
    console.log('Parsed item:', item);

    if (!employee.criteria.some(c => c.name === item.name)) {
      employee.criteria.push(item);
    }
  }
};



const removeCriteria = (employee: { setting: any[]; }, index: any) => {
    employee.setting.splice(index, 1);
};

</script>

<template>
    <v-container>
        <v-card-title>
            Setup cell value
        </v-card-title>
        <v-card-item>
            Set data types and data aggregation rules for each cell
        </v-card-item>
        <v-card-text>
            <v-row>
                <v-col v-for="(item, index) in setting" :key="index" class="custom-col">
                    <v-btn block style="text-transform: none; justify-content: flex-start; white-space: nowrap"
                        draggable="true" @dragstart="startDrag($event, item)">
                        {{ item.text }}
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-text class="text-center">Drag and drop the formula to the cell below and set the value</v-card-text>
        <v-card-text class="text-center">
            <div>
                <v-icon style="bottom: 28px;" color="blue">
                    mdi-chevron-down
                </v-icon>
            </div>
            <div>
                <v-icon style="bottom: 44px;" color="blue">
                    mdi-chevron-down
                </v-icon>
            </div>
        </v-card-text>
        <v-divider style="position: relative; bottom: 48px;" thickness="4"></v-divider>
        <v-card style="position: relative; bottom: 24px;">
            <v-list class="d-sm-flex">
                <v-card-title>Sheet form settings</v-card-title>
                <v-list-item style="position: relative; left: 68%;">
                    <v-btn style="border: 1px solid #f9f9f9;">NEW BLOCK</v-btn>
                    <v-btn color="blue">SETUP CELL VALUE</v-btn>
                </v-list-item>
            </v-list>
        </v-card>
        <v-divider style="margin-top: 10px;" color="black"></v-divider>

        <v-card-text style="position: relative;color: black; font-size: 12px; opacity: 0.6; top: 6px;">Sheet
            name</v-card-text>
        <div class="d-sm-flex">
            <v-card-text style="position: relative;color: black; font-size: 20px; bottom: 20px;">Sheet 001</v-card-text>
            <v-card-text style="position: relative;color: red; bottom: 14px; left: 43.7%;">Delete sheet</v-card-text>
        </div>

        <v-divider style="position: relative; bottom: 24px;" thickness="2" width="28%"></v-divider>
        <v-data-table :headers="headers" :items="items" class="bordered-table" hide-default-footer>
    <template v-slot:headers>
        <tr>
            <th v-for="(header, index) in headers" :key="index" class="custom-cell">
                {{ header.title }}
            </th>
        </tr>
    </template>

    <template v-slot:item="{ item, index }">
        <tr :class="{ 'first-row': index === 0 }">
            <td v-for="(header, idx) in headers" :key="idx" class="custom-cell">
                <template v-if="header.key === 'setting'">
                    <div class="drop-zone" @dragover.prevent @drop="onDrop($event, item)">
                        <v-chip v-for="(c, i) in item.setting" :key="i" class="ma-1"
                            @click:close="removeCriteria(item, i)">
                            {{ c.text }}
                            <v-icon>{{ c.icon }}</v-icon>
                        </v-chip>
                    </div>
                </template>
                <template v-else>
                    {{ item[header.key] }}
                </template>
            </td>
        </tr>
    </template>
</v-data-table>


    </v-container>
</template>

<style scoped lang="scss">
.custom-col {
    flex: 0 0 calc(100% / 9) !important;
    max-width: calc(100% / 9) !important;
    padding: 4px !important;
}

// .v-data-table-footer {
//   display: none !important;
// }

.bordered-table {
    border-collapse: collapse !important;
    width: 100%;
}

/* Custom từng ô có viền 4 chiều */
.custom-cell {
    border: 1px solid #e7e1e1 !important;
    padding: 8px !important;
    text-align: left !important;
}

/* Thêm viền đen rõ ràng cho tiêu đề */
.bordered-table thead th {
    text-align: left !important;
    padding: 10px !important;
}

.first-row {
    background-color: #f9f9f9 !important;
    /* Màu xám nhạt */
}
</style>