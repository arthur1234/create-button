<?php

include_once('./class.phpmailer.php');


if (isset($_POST))
{

	$mail             = new PHPMailer(); // defaults to using php "mail()"

	$body             = "Hello dear user ".$_POST["email"]." <br><br>";
	$body             .= "CSS:<br>";
	$body 			  .= htmlspecialchars($_POST["cssString"], ENT_QUOTES, 'UTF-8')." <br><br> HTML:<br>";
	$body             .= htmlspecialchars($_POST["htmlString"], ENT_QUOTES, 'UTF-8');


	$mail->FromName   = "Web developer";

	$mail->Subject    = "Generated css and html button";

	$mail->AltBody    = ""; // optional, comment out and test

	$mail->MsgHTML($body);

	$mail->AddAddress($_POST["email"], "Ar te");

	$mail->AddBCC("arthur.pissakov@gmail.com", "gh ");

	if(!$mail->Send()) {
	  echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
	  echo "Email sended!";
	}
}
else 
{
	echo "Please enter your email";
}
?>



