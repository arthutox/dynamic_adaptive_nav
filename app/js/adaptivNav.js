(function($){
    jQuery.fn.adaptiveNav = function(options){

        options = $.extend({
            errorEstimation: 35,
            subNavControlTitle: '...'
        }, options);

        function NavAdaptive($obj) {
            this.obj = $obj;
            this.subItem = 0;
            this.errorEstimation = options.errorEstimation;
            this.subNavControlTitlt = options.subNavControlTitle;
        }
        // методы в прототипе
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

            var $estimatedWidthNavItemAll = this.widthNavItemAll() + $('.sub-nav')
                                                .children('ul')
                                                .children('li')
                                                .first()
                                                .outerWidth(true);

            return $estimatedWidthNavItemAll + this.errorEstimation;
        };
        NavAdaptive.prototype.navItemMove = function() {
            var item = this.obj.children('.sub-nav').prev();
            this.obj.find('.sub-nav').children('ul').prepend(item.clone());
            item.remove();
        };
        NavAdaptive.prototype.reNavItemMove = function() {
            var item = this.obj.children('.sub-nav').children('ul').children('li').first();
            this.obj.children('.sub-nav').before(item.clone());
            item.remove();
        };
        NavAdaptive.prototype.widthCheck = function() {

            if ( this.widthWrap() < (this.widthNavItemAll() + this.subItem) ){
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

                if ( this.obj.children('.sub-nav').length == 0 ){
                    this.obj.append('<li class="sub-nav"><span>' + this.subNavControlTitlt + '</span><ul></ul></li>');
                    this.subItem = $('.sub-nav').outerWidth(true);
                }

                while ( this.widthCheck() ) {
                    this.navItemMove();
                }

            } else {

                if ( this.reWidthCheck() ) {

                    this.reNavItemMove();

                    if ( $('.sub-nav').children('ul').find('li').length == 0 ){
                        $('.sub-nav').remove();
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
            navAdaptive.resizeAction();

        };

    return this.each(make);

};
})(jQuery);