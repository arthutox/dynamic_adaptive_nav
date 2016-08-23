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
            var navItem = this.obj.children('li'),
                widthAllItems = 0;
            navItem.each(function(){
                widthAllItems += $(this).width();
            });
            return widthAllItems;
        };
        NavAdaptive.prototype.navItemMove = function() {
            var item = this.obj.find('.sub-nav').prev();
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
                this.obj.append('<li class="sub-nav"><a>...</a><ul></ul></li>');

                while ( this.widthCheck() ) {
                    this.navItemMove();
                }

            } else {
                //this.obj.find('.sub-nav').remove();
                console.log('Menu false')
            }

        };

        var make = function(){

            var $this = $(this),
                navAdaptive = new NavAdaptive($this);

            //navAdaptive.widthWrap();
            //navAdaptive.widthNavItemAll();
            //navAdaptive.widthCheck();
            navAdaptive.navAction();

            $(window).resize(function(){
                navAdaptive.navAction();
            });

        };

    return this.each(make);

};
})(jQuery);