<?php
session_start();
include('../connect.php');
$a = $_POST['iv'];
$b = $_POST['date'];
$c = $_POST['supplier'];
$d = $_POST['remarks'];
// query
$sql = "INSERT INTO purchases (invoice_number,date,suplier,remarks) VALUES (:a,:b,:c,:d)";
$q = $db->prepare($sql);
$q->execute(array(':a'=>$a,':b'=>$b,':c'=>$c,':d'=>$d));
header("location: purchasesportal.php?iv=$a");


?>