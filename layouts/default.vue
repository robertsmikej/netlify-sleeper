<template>
    <div>
        <nuxt/>
    </div>
</template>

<style>
*,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
}

html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    line-height: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    color: var(--dark-blue);
    background-color: var(--light-orange);
    background-color: var(--dark-blue);
}
main {
    width: 100%;
    background-color: #FFF;
    margin: -60px 0 0;
}
.container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: center;
    flex-wrap: wrap;
    opacity: 1; 
}
.containerShow {
    opacity: 0;
}
h1 {
    font-size: 1.6em;
    line-height: 1em;
    font-weight: 400;
    margin: 10px 0;
    text-align: center;
    text-shadow: 1px 1px 1px var(--dark-grey);
}
h2 {
    font-size: 1.4em;
    line-height: 1em;
    font-weight: 500;
    margin: 10px 0;
}
h3 {
    font-size: 1.2em;
    line-height: 1.2em;
    font-weight: 400;
    margin: 10px auto 0;
}
h4 {
    font-size: 1.1em;
    line-height: 1.2em;
    font-weight: 400;
    margin: 10px auto 0;
}
h5 {
    font-size: 1em;
    line-height: 1.2em;
    font-weight: 400;
    margin: 10px auto 0;
}
h5 {
    font-size: 1em;
    line-height: 1.2em;
    font-weight: 300;
    margin: 10px auto 0;
}
p {
    font-size: 1em;
    line-height: 1.3em;
    font-weight: 300;
    margin: 14px 0 0;
}
ul, li {
    font-size: 1.1em;
    line-height: 1.4em;
    font-weight: 500;
}
a {
    color: var(--dark-grey);
    font-size: 1em;
    line-height: 1em;
    font-weight: 400;
}
</style>
