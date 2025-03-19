<template>
  <v-container>
    <v-text-field v-model="search" placeholder="Enter permission..." prepend-inner-icon="mdi-magnify" clearable
      class="custom-search" variant="solo">
      <template #append-inner>
        <div class="search-list" @click="menu = true">
          <v-text>Permissions</v-text>
          <v-icon>mdi-chevron-down</v-icon>
        </div>
      </template>
    </v-text-field>
    <v-menu class="menu-permissions" v-model="menu" width="180px">
      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-title>Reviewer Manager</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Editor</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>


    <v-data-table v-model:selected="selected" :headers="headers" :items="filteredPermissions" class="custom-table"
      show-select hover @click:row="handleRowClick" @update:selected="handleSelection">
      <template v-slot:item.actions="{ item }">
        <v-icon color="black" @click="editPermission(item)">mdi-pencil</v-icon>
      </template>
      <template v-slot:item.sort="{ item }">
        <v-icon color="black" @click="exportPermission(item)">mdi-dots-vertical </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from "vue";
const search = ref("");
const selected = ref([]); // Danh sách các dòng được chọn
const menu = ref(false)

watch(selected, (newSelected) => {
  if (newSelected.length > 0) {
    console.log("Dòng đã chọn:", newSelected);
  }
});

const handleSelection = (newSelection) => {
  selected.value = newSelection;
  console.log("Dòng đã chọn:", newSelection);
};
// Lấy vị trí dòng được click
const handleRowClick = ({ item, index }) => {
  selected.value = [item]; // Cập nhật thành mảng chứa item
  console.log("Bạn vừa click vào dòng:", index, "Dữ liệu:", item);
};


const permissions = ref([
  { id: 1, effectiveFrom: "2025/12/21", permission: "Reviewer Manager", scope: "View permission scope.", members: "View 32 members", actions: false, sort: false },
  { id: 2, effectiveFrom: "2025/11/15", permission: "Admin", scope: "Full access", members: "View 50 members", actions: false, sort: false },
  { id: 3, effectiveFrom: "2025/10/10", permission: "Editor", scope: "Edit content", members: "View 20 members", actions: false, sort: false },
  { id: 4, effectiveFrom: "2025/09/30", permission: "Viewer", scope: "Read-only", members: "View 100 members", actions: false, sort: false },
  { id: 5, effectiveFrom: "2025/08/25", permission: "HR Manager", scope: "Manage employee records", members: "View 15 members", actions: false, sort: false },
  { id: 6, effectiveFrom: "2025/07/15", permission: "Finance", scope: "View financial reports", members: "View 10 members", actions: false, sort: false },
  { id: 7, effectiveFrom: "2025/06/10", permission: "IT Support", scope: "Manage system settings", members: "View 5 members", actions: false, sort: false },
  { id: 8, effectiveFrom: "2025/05/05", permission: "Project Manager", scope: "Oversee projects", members: "View 8 members", actions: false, sort: false },
  { id: 9, effectiveFrom: "2025/04/01", permission: "Sales Lead", scope: "Manage sales data", members: "View 25 members", actions: false, sort: false },
  { id: 10, effectiveFrom: "2025/03/15", permission: "Marketing", scope: "Manage campaigns", members: "View 18 members", actions: false, sort: false },
  { id: 11, effectiveFrom: "2025/02/20", permission: "Security Admin", scope: "Control access", members: "View 12 members", actions: false, sort: false },
  { id: 12, effectiveFrom: "2025/01/10", permission: "Support", scope: "Assist customers", members: "View 40 members", actions: false, sort: false },
]);

const headers = [
  { title: "Effective From", key: "effectiveFrom", width: "300px" },
  { title: "Permission", key: "permission", width: "250px" },
  { title: "Permission Scope", key: "scope", width: "450px" },
  { title: "Members", key: "members", width: "450px" },
  { key: "actions", width: "1px" },
  { key: "sort", width: "1px" }

];

const filteredPermissions = computed(() => {
  if (!search.value) return permissions.value;
  return permissions.value.filter(p =>
    p.permission.toLowerCase().includes(search.value.toLowerCase())
  );
});

const editPermission = (item) => {
  console.log("Editing:", item);
};

const exportPermission = (item) => {
  console.log("Exporting:", item);
};

</script>



<style scoped lang="scss">
.custom-search :deep(.v-field) {
  z-index: 10000;
  border: none !important;
  /* Xóa viền */
  box-shadow: none !important;
  /* Xóa hiệu ứng bóng */
  background: white !important;
  position: relative;
}

.menu-permissions {
  position: fixed;
  left: 87%;
  top: 14%;
}

.search-list {
  display: flex;
  margin-bottom: 4px;
  cursor: pointer;
}

.custom-search {
  width: 30vw;
  margin-left: auto;
}

.custom-table th:nth-child(1) {
  width: 200px;
}

.custom-table th:nth-child(2) {
  width: 200px;
}

.custom-table th:nth-child(3) {
  width: 300px;
}

.custom-table th:nth-child(5) {
  width: 1px;
}

.custom-table th:nth-child(6) {
  width: 1px;
}
</style>