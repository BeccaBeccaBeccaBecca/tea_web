<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Chat - Customer Module</title>
<link type="text/css" rel="stylesheet" href="style.css" />
</head>
 <?php

session_start();

if(isset($_POST['enter'])){
    if($_POST['name'] != ""){
        $_SESSION['name'] = stripslashes(htmlspecialchars($_POST['name']));

        //Simple enter message
        $fp = fopen("log.html", 'a');
        fwrite($fp, "<div class='msgln'><i>User <b>". $_SESSION['name'] ."</b> has entered the chat session.</i><br></div>");
        fclose($fp);
    }
    else{
        echo '<span class="error">Please type in a name</span>';
    }
}
if(!isset($_SESSION['name'])){
    loginForm();
}
else{

?>
<br>
You will now speak with someone about this viewing in the CHAT WINDOW below. <br>Remember, a polite and appropriate conversation avoids these topics: MONEY, POLITICS, GENDER & RACE. Asking questions, expressing generally accepted opinions and discussing the weather are all perfectly respectable options in conversation. <br>Remember, long answers fueled by emotion, strong personal opinions or criticism are discouraged.
<br><br>
<div id="wrapper">
    <div id="menu">
        <p class="welcome">Welcome, <b><?php echo $_SESSION['name']; ?></b></p>
        <p class="logout"><a id="exit" href="#">Exit Chat</a></p>
        <div style="clear:both"></div>
    </div>
     
    <div id="chatbox"><?php
    if(file_exists("log.html") && filesize("log.html") > 0){
        $handle = fopen("log.html", "r");
        $contents = fread($handle, filesize("log.html"));
        fclose($handle);
         
        echo $contents;
    }
    ?></div>
     
    <form name="message" action="">
        <input name="usermsg" type="text" id="usermsg" size="63" />
        <input name="submitmsg" type="submit"  id="submitmsg" value="Send" />
    </form>
</div>
<div class="motherbot" id="bot">
<script src="https://widget.flowxo.com/embed.js" data-fxo-widget="eyJ0aGVtZSI6IiM2N2MxOGUiLCJ3ZWIiOnsiYm90SWQiOiI1ZjE0Yzc5Zjk1Yjc2NTAwMGU4OGFhMDIiLCJ0aGVtZSI6IiM2N2MxOGUiLCJsYWJlbCI6Ik1vdGhlcmJvdCJ9LCJ3ZWxjb21lVGV4dCI6IkhleSB0aGVyZSEifQ==" async defer></script>
<!-- https://code.tutsplus.com/tutorials/how-to-create-a-simple-web-based-chat-application--net-5931 -->
</div>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
<script type="text/javascript">
// jQuery Document
$(document).ready(function(){
    //If user wants to end session
    $("#exit").click(function(){
        var exit = confirm("Are you sure you want to end the session?");
        if(exit==true){window.location = 'index.php?logout=true';}   
    });
    //If user submits the form
    $("#submitmsg").click(function(){   
        var clientmsg = $("#usermsg").val();
        $.post("post.php", {text: clientmsg});              
        $("#usermsg").attr("value", "");
        return false;
    });
    //Load the file containing the chat log
    function loadLog(){     
        var oldscrollHeight = $("#chatbox").attr("scrollHeight") - 20; //Scroll height before the request
        $.ajax({
            url: "log.html",
            cache: false,
            success: function(html){        
                $("#chatbox").html(html); //Insert chat log into the #chatbox div   
                
                //Auto-scroll           
                var newscrollHeight = $("#chatbox").attr("scrollHeight") - 20; //Scroll height after the request
                if(newscrollHeight > oldscrollHeight){
                    $("#chatbox").animate({ scrollTop: newscrollHeight }, 'normal'); //Autoscroll to bottom of div
                }               
            },
        });
    }
    setInterval (loadLog, 2500);
});
</script>
<?php
}

function loginForm(){
    echo'
    <div id="loginform">
    <form action="index.php" method="post">
        <p>Please enter your name to continue:</p>
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" />
        <input type="submit" name="enter" id="enter" value="Enter" />
    </form>
    </div>
    ';
}

if(isset($_GET['logout'])){ 
     
    //Simple exit message
    $fp = fopen("log.html", 'a');
    fwrite($fp, "<div class='msgln'><i>User <b>". $_SESSION['name'] ."</b> has left the chat session.</i><br></div>");
    fclose($fp);
     
    session_destroy();
    header("Location: level5.html"); //Redirect the user
}   
?>
</body>
</html>

