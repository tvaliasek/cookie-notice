# EU cookie notice
Simple javascript library for integration of EU cookie notice, just link the JS and CSS files from build folder. Agreement information is saved in cookie with expiration after one year.

## Usage
Simply link needed files:
```html
<!DOCTYPE html>
<html>
    <head>
        <title>EU Cookie Notice Demo</title>
        <!-- link stylesheet for message in head section -->
        <link href="/build/eu-notice.min.css" rel="stylesheet" />
    </head>
    <body>
        <!-- link main script before end of body -->
        <script type="text/javascript" src="/build/eu-notice.min.js"></script>
    </body>
</html>
```

## Build process
Build process is based on standart Gruntfile.js, 

### HTML structure of displayed message
All texts can be customized directly in source on line 11 - 14, or by assigning string value to object property before the display of message. 
```html
<div id="__EUNotice">
    <div class="__EUNotice--inner">
        <p>
            <!-- Text of message: notice.messageText --> 
            notice.messageText
            <!-- More Info link: notice.googleLinkText, notice.googleLinkHref -->
            <a class="__EUNotice--glink" target="_blank" title="notice.googleLinkText" href="notice.googleLinkHref">notice.googleLinkText</a>
        </p>
        <!-- Agree button: notice.okBtnText -->
        <a class="__EUNotice--okBtn" target="_self" title="notice.okBtnText" href="javascript:void(0);">notice.okBtnText</a>
    </div>
</div>
```