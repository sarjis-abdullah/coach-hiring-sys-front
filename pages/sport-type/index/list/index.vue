<template>
  <div>
    <SportTypeList />
  </div>
</template>

<script>
import SportTypeList from '@/components/sport-type/SportTypeList'
export default {
  middleware: 'auth',
  components: {
    SportTypeList,
  },
}
</script>

<style></style>
