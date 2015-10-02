/* 
    Created on : 1.10.2015, 14:18:40
    Author     : tvaliasek
*/
window.EUNotice = (function(){
    //get base url for cookie marking
    var baseUrl = encodeURIComponent(window.location.origin);
    
    var notice = {
        //texts and links
        messageText: 'Tento web používá k poskytování služeb, personalizaci reklam a analýze návštěvnosti soubory cookie. Používáním tohoto webu s tím souhlasíte.',
        googleLinkText: 'Více informací zde.',
        googleLinkHref: 'https://www.google.com/intl/cs/policies/technologies/cookies/',
        okBtnText: 'Souhlasím',  
        
        //test function for testing aggreement
        wasAgreed: function(){
            var cookieVal = document.cookie.replace(/(?:(?:^|.*;\s*)__EUNotice\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            return (cookieVal === baseUrl) ? true : false;
        },
        //sets cookie with agreement info
        setAgreed: function(){
            var expiration = new Date();
            expiration.setDate(expiration.getDate()+365);
            document.cookie = ("__EUNotice="+baseUrl+"; expires="+expiration.toUTCString()+";");
            return false;
        },
        //cancel agreement cookie
        cancelAgreed: function(){
            document.cookie = ("__EUNotice="+baseUrl+"; expires=Thu, 01 Jan 1970 00:00:01 GMT;");
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
            console.log('hide');
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


//init -- delete it if you want custom display behavior
var euNotice = window.EUNotice();

if(euNotice.wasAgreed() !== true){
    euNotice.displayMessage();
}
//init END