<template>
        <div class="columns">
            <div class="column is-6">
                <span class="tag is-success is-large"> Conectado como {{ user }}</span>
            </div>
            <div class="column is-6">
                <span class="tag is-warning is-large"> Conversando con {{ userTalk }}</span>
            </div>
        </div>
</template>

<script>
export default {
    name: "BarTop",

    data: function() {
        return { 
            user: this.$store.getters.getUserName, 
            userTalk: this.$store.getters.getUserTalkUserName,
        };
    },

    computed: {
        testUserTalk() {
            return this.$store.getters.getUserTalk;
        }
    },

    watch: {
        testUserTalk: { 
            immediate: true, deep: false, handler(newValue) {
            this.userTalk = newValue.user;
                }
            },
        }
}
</script>

<style scoped>
</style>
