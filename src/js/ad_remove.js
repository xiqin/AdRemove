;(function(){
	var AdRemove = {
		init : function(){
			var self = {
            	doms : [],
                iframeConf : [
                    'div iframe',
                ],
                classOrIdConf : [
                    '^ad_',
                    '_ad_',
                    'lbd',
					'r300',
                    'main mb\\d',   //mb+数字
                    'QM_Container_10000',
                    'f-single-biz'
                ],
			};

            /**
             * build regular experssion
             * @returns {RegExp}
             */
			self.getReg = function(){
				var regStr = '';
				regStr = self.classOrIdConf.join('|');
				return new RegExp('(' + regStr + ')', "gim");
			};

            /**
             * filter all doms who may be advertisement
             * @returns {boolean}
             */
			self.filterDoms = function(){
                var reg = self.getReg();
                var doms = document.getElementsByTagName('*');
                if(doms.length <= 0) return false;
                for (var i in doms){
                    try{
                        if((doms[i].id && reg.test(doms[i].id)) || (doms[i].className && reg.test(doms[i].className))){
                            self.doms.push(doms[i]);
                        }
                    }catch(err){}
                }

                self.doms.forEach(function (element) {
                    try {
                        $(element).remove();
                    }catch (err){}
                })
			};

            /**
             * filter advertisement which is created by iframe
             * @returns {boolean}
             */
			self.filterIframe = function(){
			    if(self.iframeConf.length <= 0) return false;
			    self.iframeConf.forEach(function (element) {
                    try {
                        $(element).remove()
                    }catch (err){}
                })
            }

            /**
             * clear operation
             */
			self.clear = function(){
                self.filterIframe();
                self.filterDoms();
                var times = 0;
				var interval = setInterval(function(){
                    times ++;
                    times > 10 && clearInterval(interval);
                    self.filterIframe();
                    self.filterDoms();
				}, 1000);
			}

			return self;
		}
	}


	AdRemove.init().clear();
})()