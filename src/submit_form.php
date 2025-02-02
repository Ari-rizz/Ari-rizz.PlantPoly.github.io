<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']); 
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    $contact_reason = htmlspecialchars($_POST['contact-reason']);


   
    $to = "post.aissistant@gmail.com"; 
    $subject = "Ny melding fra kontaktskjema";
    $body = "Navn: $name\nE-post: $email\nMelding:\n$message"; 
    $headers = "From: no-reply@ai-assistant.com" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Send e-posten
    if (mail($to, $subject, $body, $headers)) { 
        header("Location: /comfirmation.html"); 
        exit;
    } else {
        echo "Beklager, meldingen din kunne ikke sendes. Prøv igjen senere."; 
    }
}
?>
