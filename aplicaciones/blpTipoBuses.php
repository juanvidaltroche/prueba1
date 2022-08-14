<?php
session_start(); 
include "../constantes.php";
if (!isset($_SESSION['usr_session']))
    header("location:index.php");
?>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="../ext/ext-all.css"/>
    <script src="../ext/ext-base.js" type="text/javascript"></script>
    <script src="../ext/ext-all.js" type="text/javascript"></script>
	<link rel="stylesheet" type="text/css" href="../ext/resources/css/xtheme-blue.css"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" type="text/css" href="../ext/fileuploadfield/css/fileuploadfield.css"/>
     <script type="text/javascript" src="../ext/fileuploadfield/FileUploadField.js"></script>
    <style type=text/css>
        .upload-icon {
            background: url('../shared/icons/fam/image_add.png') no-repeat 0 0 !important;
        }
        #fi-button-msg {
            border: 2px solid #ccc;
            padding: 5px 10px;
            background: #eee;
            margin: 5px;
            float: left;
        }
    </style>
</head>
<body>
	<div id="divMain"></div>
	<script type="text/javascript" src="blpTipoBuses.js"></script>
</body>
</html>