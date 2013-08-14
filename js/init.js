$(document).ready(function(){
	//initBrowserCheck();		// browser check
	initListBtn();			// button lists
	initMainTabs();			// main tabs
	initInnerElements();	// inner hidden text (with ios background)
	initChangeType();		// change type of password
	initGeneratePass();		// generate password
	initHelp();				// help for user
});

$(window).load(function(){
	$('#black-box').fadeOut(1000);
});

var chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var length = 10;

var env = $$.environment();	// environment (browser, isMobile ect.)

initBrowserCheck = function(){
	if ((!env.isMobile) || (env.isMobile && env.os.name !== 'ios')){
		$('.wrapper, #footer').remove();
		$.ajax('/inc/desktop.php',{
			success: function(response){
				$('body').addClass('desktop').prepend(response);
			},
			error: function(request, errorType, errorMessage){
				$('body').addClass('desktop');
			},
			timeout: 3000
		});
	}
};

initListBtn = function(){
	$$('.list-btn .btn').tap(function(){
		$(this).parent().parent().find('.btn').removeClass('active');
		$(this).addClass('active');
	});
};

initMainTabs = function(){
	$$('#header .list-btn li').tap(function(){
		var ind = $(this).index();
		var $content = $('.wrapper .content');
		$content.removeClass('active');
		$content.eq(ind).addClass('active');
	});
};

initInnerElements = function(){
	$$('.dashed').tap(function(){
		$(this).parent().next('.inner').slideToggle();
	});
};

initChangeType = function(){
	$$('#hard').tap(function(){
		chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!";%:?*()_+=-~/<>,.[]{}';
		length = 20;
	});
	$$('#web, #simple').tap(function(){
		chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		length = 10;
	});
	$$('#simple').tap(function(){
		length = 6;
	});
	$$('#pin').tap(function(){
		chars = '1234567890';
		length = 4;
	});
};

// function generates password
function GeneratePass(chars,length){
	var res = '';
	var r;
	var i;
	for (i = 1; i <= length; i++) {
		r = Math.floor(Math.random() * chars.length);
		res = res + chars.substring(r,r+1);
	}
	res = res.replace("&","&amp;");
	res = res.replace(">","&gt;");
	res = res.replace("<","&lt;");
	return res;
}

initGeneratePass = function(){
	$$('#generate-btn .btn').tap(function(){
		var compl = $('#compl').find('.btn.active').parent().index();
		if (compl === 0) { $('.password').addClass('small'); }
		else { $('.password').removeClass('small'); }
		$('.password').addClass('selectable').html(GeneratePass(chars, length)).hide().fadeIn();
	});
};

initHelp = function(){
	$$('#help-link').tap(function(){
		$('#help').fadeIn(200);
		$(this).addClass('active');
	});
	$$('#help-close').tap(function(){
		$('#help').fadeOut(200);
		$('#help-link').removeClass('active');
	});
};