<script>
</script>

<style>
  .global-header {
    *zoom: 1;
    border-bottom: 1px #ccc solid;
    background: #eee;
    height: 100%;
    line-height: 1.925em;
    min-height: 1.6em;
    padding: 0.3125em 0;
    width: 100%;
    z-index: 1003;
  }
  .header-logo {
    -webkit-border-radius: 1em;
    -moz-border-radius: 1em;
    border-radius: 1em;
    background-color: #fff;
    border: 1px solid #ccc;
    float: left;
    line-height: 1;
    margin: 0 5px;
    padding: 0.25em;
    text-decoration: none;
  }

  main {
    background: white;
    color: #222;
    font-family: "Arial", sans-serif;
  }
  .breadcrumbs-container {
    float: left;
    font-size: 0.9375em;
    min-height: 1.3em;
    position: relative;
  }

  .user-actions {
    float: right;
    list-style: none;
    margin: 0;
    display: flex;
    margin-right: 10px;
  }

  .userlinks .user:first-child {
    padding-left: 0;
    padding-right: 0.5em;
  }

  .userlinks {
    float: right;
    padding: 0;
    position: absolute;
    *position: static;
    right: 0;
  }

  ul.breadcrumbs {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    line-height: 0;
  }
</style>

<main>
  <header class="global-header">
    <a class="header-logo" name="logoLink" href="/">AE</a>

    <div class="userlinks">
      <ul class="user-actions">
        <li class="user post"><a href="/make">post</a></li>
        |&nbsp;
        <li class="user account"><a href="/account">account</a></li>
      </ul>
    </div>
  </header>
  <slot />
</main>
