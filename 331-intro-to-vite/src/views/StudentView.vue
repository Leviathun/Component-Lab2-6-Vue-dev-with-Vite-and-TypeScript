<script setup lang="ts">
  import StudentCard from '@/components/StudentCard.vue';
  import Student from '@/types/Student'
  import { ref , onMounted } from 'vue'
  import StudentService from '@/services/StudentService';

  const Students = ref<Student[]>(null)

  onMounted (() => {
    StudentService.getStudent() 
    .then ((response) => {
      //console.log(response.data)
      Students.value = response.data
    })
    .catch((error) => {
      console.error ('There was an error!', error)
    })
  })
</script>

<template>
  <h1>Student Info</h1>
  <!-- new element -->
  <div class="students">
    <StudentCard v-for="student in Students" :key="student.id" :student="student"/>
  </div>
  
</template>

<style scoped>
.students {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
