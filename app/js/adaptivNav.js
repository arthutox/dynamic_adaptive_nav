(function($){
    jQuery.fn.adaptiveNav = function(options){

        options = $.extend({
            subNavClassNav: 'sub-nav',
            errorEstimation: 20,
            subNavControlTitle: '...',
            resizeEvent: true,
            mobileNavBreakpoint: 992
        }, options);

        function NavAdaptive($obj) {
            this.obj = $obj;
            this.errorEstimation = options.errorEstimation;
            this.subNavControlTitlt = options.subNavControlTitle;
        }

        NavAdaptive.prototype.widthWrap = function() {
            var navWrapWidth = this.obj.width();
            console.log(navWrapWidth);
            return navWrapWidth;
        };
        NavAdaptive.prototype.widthNavItemAll = function() {
            var navItem = this.obj.children('li'),
                widthAllItems = 0;

            navItem.each(function(){
                var a = $(this).outerWidth(true);
                widthAllItems += a;
            });
            console.log(widthAllItems);
            return widthAllItems;
        };
        NavAdaptive.prototype.estimatedWidthNavItemAll = function() {

            var $estimatedWidthNavItemAll = this.widthNavItemAll() + $('.' + options.subNavClassNav)
                                                .children('ul')
                                                .children('li')
                                                .first()
                                                .outerWidth(true);

            return $estimatedWidthNavItemAll + this.errorEstimation;
        };
        NavAdaptive.prototype.navItemMove = function() {
            var item = this.obj.children('.' + options.subNavClassNav).prev();
            this.obj.find('.' + options.subNavClassNav).children('ul').prepend(item.clone());
            item.remove();
        };
        NavAdaptive.prototype.reNavItemMove = function() {
            var item = this.obj.children('.' + options.subNavClassNav).children('ul').children('li').first();
            this.obj.children('.' + options.subNavClassNav).before(item.clone());
            item.remove();
        };
        NavAdaptive.prototype.widthCheck = function() {

            if ( this.widthWrap() < this.widthNavItemAll() ){
                return true;
            } else {
                return false;
            }

        };
        NavAdaptive.prototype.reWidthCheck = function() {

            if ( this.widthWrap() > ( this.estimatedWidthNavItemAll() ) ){
                return true;
            } else {
                return false;
            }

        };
        NavAdaptive.prototype.navAction = function() {

            if ( this.widthCheck() ){

                if ( this.obj.children('.' + options.subNavClassNav).length == 0 ){
                    this.obj.append('<li class=' + options.subNavClassNav + '><span>' + this.subNavControlTitlt + '</span><ul></ul></li>');
                }

                while ( this.widthCheck() ) {
                    this.navItemMove();
                }

            } else {

                if ( this.reWidthCheck() ) {

                    this.reNavItemMove();

                    if ( $('.' + options.subNavClassNav).children('ul').find('li').length == 0 ){
                        $('.' + options.subNavClassNav).remove();
                    }

                }

            }

        };
        NavAdaptive.prototype.resizeAction = function(){
            var _this = this;
            $(window).resize(function(){
                _this.navAction();
            });

        };

        var make = function(){

            var $this = $(this),
                navAdaptive = new NavAdaptive($this);

            navAdaptive.navAction();
            if ( options.resizeEvent ) {
                navAdaptive.resizeAction();
            }

        };

    return this.each(make);

};
})(jQuery);