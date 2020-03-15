<template>
    <div>
        <h1>Admin</h1>
        <h4><a to="/logout">Logout</a></h4>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
}
</script>

<style scoped>

</style>
