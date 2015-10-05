# EU cookie notice
Simple javascript library for integration of EU cookie notice, just link the JS and CSS files from build folder. Agreement information is saved in cookie with expiration after one year.

Demo page: http://cookie-notice.valiasek.cz 

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

## Build process and customization
Build process is based on standard Gruntfile.js, you can watch your changes with `grunt watch` command or build it with `grunt build`. All scss and js files are automaticaly compiled, minified and saved in /build folder. If you want to build this library as Wordpress plugin, use command `grunt build-wp-plugin`. 

### Disabling automatic display
If you want to disable automatic display of message, delete lines 93 - 99 from /js/eu-notice.js.

```javascript
//init -- delete it if you want custom display behavior
var euNotice = window.EUNotice();

if(euNotice.wasAgreed() !== true){
    euNotice.displayMessage();
}
//init END
```

### Canceling approval
Just call `notice.cancelAgreed();`

Example:
```html
<!DOCTYPE html>
<html>
    <head>
        <title>EU Cookie Notice Demo</title>
        <meta charset="UTF-8" />
        <link href="/build/eu-notice.min.css" rel="stylesheet" />
    </head>
    <body>
        <a href="javascript:void(0);" target="_self" title="cancel message approval" id="cancelApproval">Cancel cookie notice approval</a>
        
        <script type="text/javascript" src="/build/eu-notice.min.js"></script>
        <script type="text/javascript">
            //cancel agreement by clicking on link #cancelApproval and reload current page
            var btn = document.getElementById('cancelApproval');
            btn.addEventListener('click', function(e){
                e.preventDefault();
                var notice = window.EUNotice();
                notice.cancelAgreed();
                window.location.reload();
            }, false);
        </script>
    </body>
</html>
```

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