/* 
    Created on : 1.10.2015, 14:18:40
    Author     : tvaliasek
*/
window.EUNoticeAdmin = (function(){
    //get base url for cookie marking
    var baseUrl = encodeURIComponent(window.location.origin);
    
    var notice = {
        //texts and links
        messageText: (notice_strings.eucn_message_text != null && notice_strings.eucn_message_text != undefined && notice_strings.eucn_message_text != false) ? notice_strings.eucn_message_text : 'This site uses cookies from Google to deliver its services, to personalize ads and to analyze traffic. information about your use of this site is shared with google. By using this site, you agree to its use of cookies.',
        googleLinkText: (notice_strings.eucn_google_link_text != null && notice_strings.eucn_google_link_text != undefined && notice_strings.eucn_google_link_text != false) ? notice_strings.eucn_google_link_text : 'Learn More',
        googleLinkHref: (notice_strings.eucn_google_link_href != null && notice_strings.eucn_google_link_href != undefined && notice_strings.eucn_google_link_href != false) ? notice_strings.eucn_google_link_href :'https://www.google.com/intl/cs/policies/technologies/cookies/',
        okBtnText: (notice_strings.eucn_ok_btn_text != null && notice_strings.eucn_ok_btn_text != undefined && notice_strings.eucn_ok_btn_text != false) ? notice_strings.eucn_ok_btn_text :'Got it',  
        
        //test function for testing aggreement
        wasAgreed: function(){
            var cookieVal = document.cookie.replace(/(?:(?:^|.*;\s*)__EUNotice\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            return (cookieVal === baseUrl) ? true : false;
        },
        //sets cookie with agreement info
        setAgreed: function(){
            var expiration = new Date();
            expiration.setDate(expiration.getDate()+365);
            document.cookie = ("__EUNotice="+baseUrl+"; expires="+expiration.toUTCString()+"; path='/';");
            return false;
        },
        //cancel agreement cookie
        cancelAgreed: function(){
            document.cookie = ("__EUNotice="+baseUrl+"; expires=Thu, 01 Jan 1970 00:00:01 GMT; path='/';");
            return false;
        },
        //gets message element and append it to body
        displayMessage: function(){
            var message = this.getHtmlMessage();
            var body = document.getElementsByTagName('body');
            body[0].appendChild(message);
            return false;
        },
        //set cookie and remove message from DOM
        hideMessage: function(){
            this.setAgreed();
            if(this.wasAgreed()===true){
                var message = document.getElementById('__EUNotice');
                var body = document.getElementsByTagName('body');
                body[0].removeChild(message);
            }
        },
        //builds HTML for message
        getHtmlMessage: function(){
            var wrapper = document.createElement('div');
            var inner = document.createElement('div');
            var message = document.createElement('p');
            var link = document.createElement('a');
            var okBtn = document.createElement('a');
            var _this = this;   
            
            okBtn.setAttribute('href', 'javascript:void(0);');
            okBtn.setAttribute('title', this.okBtnText);
            okBtn.setAttribute('target', '_self');
            okBtn.setAttribute('class', '__EUNotice--okBtn');
            okBtn.appendChild(document.createTextNode(this.okBtnText));
            okBtn.addEventListener('click', function(e){ 
                e.preventDefault();
                _this.hideMessage(); 
            }, false);
            
            link.setAttribute('href', this.googleLinkHref);
            link.setAttribute('title', this.googleLinkText);
            link.setAttribute('target', '_blank');
            link.setAttribute('class', '__EUNotice--glink');
            link.appendChild(document.createTextNode(this.googleLinkText));
            
            message.appendChild(document.createTextNode(this.messageText+' '));
            message.appendChild(link);
            
            inner.appendChild(message);
            inner.appendChild(okBtn);
            inner.setAttribute('class', '__EUNotice--inner');
            
            wrapper.appendChild(inner);
            wrapper.setAttribute('id', '__EUNotice');
            
            return wrapper;
        }
    };
    
    return notice;
});

function bindAdminEvents(){
    var btnCancel = document.getElementById('eucn_btn_cancel');
    var btnTest = document.getElementById('eucn_btn_test');
    var notice = window.EUNoticeAdmin();
    var spanStatus = document.getElementById('eucn_cookie_status');
    btnCancel.addEventListener('click', function(e){
        e.preventDefault();
        notice.cancelAgreed();
        document.cookie = ("__EUNotice="+encodeURIComponent(window.location.origin)+"; expires=Thu, 01 Jan 1970 00:00:01 GMT; path='/';");
    });
    btnTest.addEventListener('click', function(e){
        e.preventDefault();
        notice.displayMessage();
    });
    window.setInterval(function(){
        if(notice.wasAgreed() === true){
            spanStatus.setAttribute('data-status', 1);
            spanStatus.innerHTML = 'Cookie notice was agreed on this device.';
        } else {
            spanStatus.setAttribute('data-status', 0);
            spanStatus.innerHTML = 'Cookie notice was not agreed on this device.';
        }
    }, 500);
}

bindAdminEvents();