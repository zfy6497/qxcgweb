<template>
<div id="App">
    <h1>首页</h1>
    <p><router-link :to="{name:'login'}">登录</router-link></p>
    <p><router-link :to="{name:'error-403'}">403</router-link></p>
</div>
</template><script>
export default {
  name: 'App'
}
</script>
