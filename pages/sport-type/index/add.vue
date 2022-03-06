<template>
  <section>
    <SportTypeForm />
  </section>
</template>
<script>
import SportTypeForm from '@/components/sport-type/SportTypeForm'
export default {
  middleware: 'auth',
  components: {
    SportTypeForm,
  },
}
</script>
<style scoped></style>
