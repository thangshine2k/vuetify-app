<script setup lang="ts">

const headers = ref([
  { title: "Title", key: "title" },
  { title: "目標", key: "target" },
  { title: "目標2", key: "target2" },
  { title: "目標3", key: "target3" },
  { title: "Weight", key: "weight" },
  { title: "Coefficient", key: "coefficient" },
  { title: "Status", key: "status" },
  { title: "Display Order", key: "displayOrder" },
]);

// Dữ liệu mẫu (Items)
const items = ref([
  {
    title: "Goal for the second half of 2025",
    target: "Achieved sales of 10 million yen in department",
    target2: "Expand customer base by 20%",
    target3: "Increase brand awareness",
    weight: "50%",
    coefficient: 1,
    status: "Active",
    displayOrder: 10,
    edit: true,
    export: true,
  },
  {
    title: "Improve customer retention",
    target: "Reduce churn rate by 5%",
    target2: "Increase customer satisfaction to 90%",
    target3: "Enhance support response time",
    weight: "40%",
    coefficient: 1.2,
    status: "Pending",
    displayOrder: 9,
    edit: true,
    export: true,
  },
  {
    title: "Optimize supply chain",
    target: "Reduce logistics cost by 8%",
    target2: "Increase efficiency by 15%",
    target3: "Enhance vendor relations",
    weight: "45%",
    coefficient: 1,
    status: "Active",
    displayOrder: 8,
    edit: true,
    export: true,
  },
  {
    title: "Increase online engagement",
    target: "Grow website traffic by 30%",
    target2: "Boost social media interactions",
    target3: "Improve SEO ranking",
    weight: "35%",
    coefficient: 1.1,
    status: "Inactive",
    displayOrder: 7,
    edit: true,
    export: true,
  },
  {
    title: "Expand global market",
    target: "Enter 3 new international markets",
    target2: "Build partnerships with global brands",
    target3: "Localize products for international users",
    weight: "50%",
    coefficient: 1.3,
    status: "Active",
    displayOrder: 6,
    edit: true,
    export: true,
  },
  {
    title: "Enhance employee training",
    target: "Implement monthly training programs",
    target2: "Improve skill assessment system",
    target3: "Increase employee engagement",
    weight: "40%",
    coefficient: 1.1,
    status: "Pending",
    displayOrder: 5,
    edit: true,
    export: true,
  },
  {
    title: "Boost R&D Innovation",
    target: "Launch 2 new product prototypes",
    target2: "Increase R&D budget by 15%",
    target3: "Collaborate with universities",
    weight: "55%",
    coefficient: 1.2,
    status: "Active",
    displayOrder: 4,
    edit: true,
    export: true,
  },
  {
    title: "Enhance cybersecurity",
    target: "Reduce security breaches by 20%",
    target2: "Improve system audit processes",
    target3: "Ensure regulatory compliance",
    weight: "50%",
    coefficient: 1,
    status: "Inactive",
    displayOrder: 3,
    edit: true,
    export: true,
  },
  {
    title: "Optimize digital marketing",
    target: "Increase PPC campaign ROI by 25%",
    target2: "Improve email open rates",
    target3: "Enhance lead conversion strategy",
    weight: "45%",
    coefficient: 1.1,
    status: "Active",
    displayOrder: 2,
    edit: true,
    export: true,
  },
  {
    title: "Strengthen corporate culture",
    target: "Host annual company retreat",
    target2: "Improve work-life balance policies",
    target3: "Enhance internal communication",
    weight: "35%",
    coefficient: 1.1,
    status: "Pending",
    displayOrder: 1,
    edit: true,
    export: true,
  },
]);

const groupBy = ref([{ key: "status" }]);
</script>

<template>
  <v-container>
    <v-card-title class="d-sm-flex color-black font-weight-bold font-size-20">
      部署 goal
    </v-card-title>
    <v-list class="d-sm-flex align-center justify-space-between" height="120px">
      <v-list-item>
        <v-list-item-title>評価サイクル</v-list-item-title>
        <v-list-item-subtitle class="color-black">(2025年度)</v-list-item-subtitle>
      </v-list-item>

      <v-text-field readonly variant="outlined" class="d-sm-flex" density="compact" hide-details>
        <template #append-inner>
          <v-icon class="pr-2 cursor-pointer" icon="mdi-chevron-down" />
        </template>
        <template #prepend-inner>
          <v-list-item-title class="cursor-pointer">2025年度評価</v-list-item-title>
        </template>
      </v-text-field>

      <v-text-field clearable bg-color="white" class="position-absolute justify-end align-center right-0 w-25"
        hide-details variant="filled" prepend-inner-icon="mdi-magnify" placeholder="検索" density="compact">
        <template #append-inner>
          <v-list-item-subtitle class="color-black">Title</v-list-item-subtitle>
          <v-icon icon="mdi-chevron-down" />
        </template>
        <template #append>
          <div class="underline"></div>
        </template>
      </v-text-field>
    </v-list>

    <v-data-table :group-by="groupBy" :items="items" item-value="title" hide-default-footer hide-default-header>
      <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
        <tr>
          <td :colspan="columns.length">
            <div class="d-flex align-center">
              <v-checkbox class="mt-5" density="compact"></v-checkbox>
              <v-icon :icon="isGroupOpen(item) ? '$expand' : '$next'" color="medium-emphasis" density="comfortable"
                size="24" @click="toggleGroup(item)"></v-icon>
              <span>ステータス: {{ item.value }}</span>
              <v-list class="d-sm-flex justify-end ml-auto">
                <v-icon class="mr-4" icon="mdi-pencil"></v-icon>
                <v-icon icon="mdi-dots-horizontal"></v-icon>
              </v-list>
            </div>
          </td>
        </tr>
        <!-- Headers hiển thị trong nhóm khi mở -->
        <tr v-if="isGroupOpen(item)" class="custom-cell">
          <th v-for="header in headers" :key="header.key">
            <div class="d-flex align-center ml-2">
              <v-checkbox v-if="header.key === 'title'" class="mt-5" density="compact"></v-checkbox>
              {{ header.title }}

            </div>
          </th>
        </tr>
      </template>

      <template v-slot:item="{ item }">
        <tr class="z-index-50 bg-grey-lighten-5">
          <td v-for="header in headers" :key="header.key">
            <div class="flex align-center ml-4">
              <v-avatar v-if="header.key === 'status'" size="10" color="green"></v-avatar>
              {{ (item as any)[header.key] }}
            </div>
          </td>
        </tr>
      </template>

    </v-data-table>
  </v-container>
</template>

<style scoped lang="scss">
// .custom-search {
//   display: block !important;
//   background-color: white !important;
//   width: 400px;
// }

</style>