<?php
function createRandomPassword() {
	$chars = "003232303232023232023456789";
	srand((double)microtime()*1000000);
	$i = 0;
	$pass = '' ;
	while ($i <= 7) {

		$num = rand() % 33;

		$tmp = substr($chars, $num, 1);

		$pass = $pass . $tmp;

		$i++;

	}
	return $pass;
}
$finalcode='IN-'.createRandomPassword();
?>
<link href="../style.css" media="screen" rel="stylesheet" type="text/css" />
<form action="saveledger.php" method="post">
<input type="hidden" name="name" value="<?php echo $_GET['invoice']; ?>" />
<input type="hidden" name="invoice" value="<?php echo $finalcode; ?>" />
<input type="hidden" name="tot" value="<?php echo $_GET['amount']; ?>" />
<div id="ac">
<span>Cantidad : </span><input type="text" style="width:265px; height:30px;" name="amount" /><br>
<span>Observaciones : </span><input type="text" style="width:265px; height:30px;" name="remarks" /><br>
<span>&nbsp;</span><input id="btn" type="submit" value="save" />
</div>
</form>