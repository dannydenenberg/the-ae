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

  footer {
    font-family: Arial, Helvetica, sans-serif;
    border-top: 1px solid #ccc;
    background: #eee;
    padding: 5px;
  }

  footer {
    background: #eee;
    border-top: 1px solid #ccc;
    bottom: 0;
    left: 0;
    line-height: 0.5em;
    padding: 0.3em 4em 0.3em 0;
    position: absolute;
    right: 0;
    text-align: center;
  }

  footer ul {
    list-style: none;
    display: flex;
    padding-bottom: 10px;
  }

  footer ul li {
    padding-left: 10px;
    padding-bottom: 2px;
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

<footer>
  <ul class="clfooter">
    <li>© 2020 <span class="desktop">the ae</span></li>
    <li><a href="/help">help</a></li>
    <li><a href="/scams">safety</a></li>
    <li class="desktop"><a href="/privacy">privacy</a></li>
    <li><a href="/terms-of-use">terms</a></li>
    <li><a href="/about/">about</a></li>
  </ul>
</footer>
