<template>
  <section>
    <PackageForm />
  </section>
</template>
<script>
import PackageForm from '@/components/package/PackageForm'
export default {
  middleware: 'auth',
  components: {
    PackageForm,
  },
}
</script>
<style scoped></style>
