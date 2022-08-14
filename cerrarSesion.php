<?php


session_start();
  unset($_SESSION["usr_session"]);   
  session_destroy();
  header("Location: index.php");
  exit;


?>


