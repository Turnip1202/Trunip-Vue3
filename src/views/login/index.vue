<script setup lang="ts">
import LoginPanel from "./cpns/login-panel.vue";
import { loginConfig } from "./config";

</script>
<template>
    <div class="login">
        <LoginPanel :config="loginConfig"></LoginPanel>
    </div>
</template>

<style scoped lang="scss">
.login {
    display: grid;
    place-items: center;
    align-content: center;
    margin-top: -10vh;
    width: 100%;
    height: 100vh;
    background-image: url("@/assets/images/login-bg.svg");
}
</style>

