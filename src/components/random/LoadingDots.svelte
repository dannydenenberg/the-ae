<script>
  let loadingTextBase = "Loading";
  let loadingText = loadingTextBase;

  let count = 0;
  setInterval(function () {
    count++;
    loadingText = loadingTextBase + new Array(count % 5).join(".");
  }, 300);
</script>

<div>{loadingText}</div>
