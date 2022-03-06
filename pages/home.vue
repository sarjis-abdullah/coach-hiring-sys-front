<template>
  <AthletePackages/>
</template>

<script>
import AthletePackages from '@/components/athlete/AthletePackages.vue';
  export default {
    middleware: 'auth',
    components: {
      AthletePackages,
    },
  }
</script>

<style scoped>

</style>