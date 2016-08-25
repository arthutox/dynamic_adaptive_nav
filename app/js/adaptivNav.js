(function($){
    jQuery.fn.adaptiveNav = function(options){

        options = $.extend({
            defColor: "white"
        }, options);

        function NavAdaptive($obj) {
            this.obj = $obj;
        }
        // методы в прототипе
        NavAdaptive.prototype.widthWrap = function() {
            var navWrapWidth = this.obj.width();
            return navWrapWidth;
        };
        NavAdaptive.prototype.widthNavItemAll = function() {
            var navItem = this.obj.children('li').not('.sub-nav'),
                widthAllItems = 0;

            navItem.each(function(){
                widthAllItems += $(this).width();
            });
            console.log(widthAllItems)
            return widthAllItems;
        };
        NavAdaptive.prototype.navItemMove = function() {
            var item = this.obj.children('.sub-nav').prev();
            this.obj.find('.sub-nav').children('ul').prepend(item.clone());
            item.remove();
        };
        NavAdaptive.prototype.widthCheck = function() {

            if ( this.widthWrap() < this.widthNavItemAll() ){
                return true;
            } else {
                return false;
            }

        };
        NavAdaptive.prototype.navAction = function() {

            if ( this.widthCheck() ){

                if ( this.obj.children('.sub-nav').length == 0 ){
                    this.obj.append('<li class="sub-nav"><a>...</a><ul></ul></li>');
                }

                while ( this.widthCheck() ) {
                    this.navItemMove();
                }

            } else {
                //this.obj.find('.sub-nav').remove();
                console.log('Menu false')
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