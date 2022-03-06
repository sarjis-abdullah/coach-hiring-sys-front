<template>
  <div>
    <PackageList />
  </div>
</template>

<script>
import PackageList from '@/components/package/PackageList'
export default {
  middleware: 'auth',
  components: {
    PackageList,
  },
}
</script>

<style></style>
