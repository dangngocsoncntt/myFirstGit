function dSCHList(_opts) {
	
	var _user_id=-1;
	var _hospital_id;
	flagLoading = false;
	_param=[];
	_cauhinhId = -1;
	_loainhomId = -1;
	var validator = null;
	var validatorTSGD = null;
	var valid_ar = [];
	var loai_nhom_id =-1;
	var that=this;
	this.load=doLoad;
	var checkRequired;
	
	function doLoad(_hosp_id) {
		$.i18n().load(i18n_his.err_code);
		$.i18n().load(i18n_his.com_msg);
		$.i18n().load(i18n_ngoaitru.com_msg);
		$.i18n().locale = (typeof _opts.lang !== "undefined") ? _opts.lang : "vn";
		validator = new DataValidator("inputForm");
		validatorTSGD = new DataValidator("inputFormTSGD");
		var _options=$.extend({},_opts);
		var uuid = _options._uuid;
		var _param=_options._param;
		_hospital_id = _param[0];
		_user_id = _param[1];
		_initControl();
		_bindEvent();	

	}
	function _initControl(){ 
		
	};
	
	function _bindEvent() {
		$("#btnDOITHANHCHU").on("click", function(){
			var _text = $("#txtGOIBENHNHAN").val(); 
			var _str = DocTienBangChu(_text);
			alert(_str);
		});
		
		$("#btnGOI").on('click', function(){
			var _text = $("#txtGOIBENHNHAN").val().trim(); 
			var _cachgoi = $("#cboCACHGOI").val(); 
			if(_text == ""){
				DlgUtil.showMsg("Yêu cầu nhập thông tin gọi BN"); 
				return
			}
			if(_cachgoi == "1"){
				// GOI KHAM GOOGLE VERSION 1; 
    			var msg = new SpeechSynthesisUtterance();
    	        var voices = window.speechSynthesis.getVoices();
    	        
    	        // SONDN 
    	        var _obj = new Object(); 
//    	        {voiceURI: "Microsoft David Desktop - English (United States)", name: "Microsoft David Desktop - English (United States)", lang: "en-US", localService: true, default: true}
    	        _obj.voiceURI = "GoogleTranslate Vietnamese"; 
    	        _obj.name = "GoogleTranslate Vietnamese"; 
    	        _obj.lang = "vi-VN"; 
    	        _obj.localService = true; 
    	        _obj.default = true; 
    	        voices.push(_obj); 
    	        
    	        // END SONDN 
    			$('#voices').find('option:contains("OpenFPT Vietnamese (Thu Dung)")').attr("selected",true);	        
    	        msg.voice = voices[$('#voices').val()];
    	        //msg.voice = voices[48];
    	        //msg.rate = $('#rate').val() / 10;
    	        //msg.pitch = $('#pitch').val();
    	        msg.text = _text;

    	        msg.onend = function(e) {
    	          console.log('Finished in ' + event.elapsedTime + ' seconds.');
    	        };
    	        speechSynthesis.speak(msg);
			}else if (_cachgoi == "2"){
				setTimeout(responsiveVoice.speak(_text, "Vietnamese Male"),3000);
			}else if (_cachgoi == "3"){
				setTimeout(responsiveVoice.speak(_text, "Vietnamese Female"), 3000); 
				
			}
		});
	}

	function setEnabled(_ena, _dis) {
		for (var i =0; i<_ena.length; i++) {
			$("#"+_ena[i]).attr('disabled', false);
		}
		for (var i =0; i<_dis.length; i++) {
			$("#"+_dis[i]).attr('disabled', true);
		}
	}
}
