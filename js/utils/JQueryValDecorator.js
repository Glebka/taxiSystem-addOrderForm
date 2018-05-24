class JQueryValDecorator {
    constructor() {        
        var self = this;
        $.fn.Value = function() {
            if (arguments.length === 0) {
                if (this.is('[data-class]')) {
                    var className = this.attr('data-class');
                    var groupName = this.attr('data-group');
                    var group = $('[data-group="' + groupName +'"]');
                    var args = [];
                    group.each(function() {                        
                        var value = $(this).val();
                        args.push(value);
                    });
                    if (window[className]) {
                        var obj = new window[className](...args);
                        console.log(obj);
                        return obj;
                    }
                }                
            }            
            return self._origVal.apply(this, arguments);
        }
    }
}