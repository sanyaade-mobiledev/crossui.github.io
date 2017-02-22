/* ========================================================================
 * Bootstrap: collapse.js v3.3.0
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
    'use strict';

    // COLLAPSE PUBLIC CLASS DEFINITION
    // ================================

    var Collapse = function (element, options) {
        this.$element      = $(element);
        this.options       = $.extend({}, Collapse.DEFAULTS, options);
        this.$trigger      = $(this.options.trigger).filter('[href="#' + element.id + '"], [data-target="#' + element.id + '"]');
        this.transitioning = null;

        if (this.options.parent) {
            this.$parent = this.getParent()
        } else {
            this.addAriaAndCollapsedClass(this.$element, this.$trigger)
        }

        if (this.options.toggle) this.toggle()
    };

    Collapse.VERSION  = '3.3.0';

    Collapse.TRANSITION_DURATION = 350;

    Collapse.DEFAULTS = {
        toggle: true,
        trigger: '[data-toggle="collapse"]'
    };

    Collapse.prototype.dimension = function () {
        var hasWidth = this.$element.hasClass('width');
        return hasWidth ? 'width' : 'height'
    };

    Collapse.prototype.show = function () {
        if (this.transitioning || this.$element.hasClass('in')) return;

        var activesData;
        var actives = this.$parent && this.$parent.find('> .panel').children('.in, .c-panel-collapsing');

        if (actives && actives.length) {
            activesData = actives.data('collapse');
            if (activesData && activesData.transitioning) return
        }

        var startEvent = $.Event('show.collapse');
        this.$element.trigger(startEvent);
        if (startEvent.isDefaultPrevented()) return;

        if (actives && actives.length) {
            Plugin.call(actives, 'hide');
            activesData || actives.data('collapse', null);
        }

        var dimension = this.dimension();

        this.$element
            .removeClass('c-panel-collapse')
            .addClass('c-panel-collapsing')[dimension](0)
            .attr('aria-expanded', true);

        this.$trigger
            .removeClass('c-panel-collapsed')
            .attr('aria-expanded', true);

        this.transitioning = 1;

        var complete = function () {
            this.$element
                .removeClass('c-panel-collapsing')
                .addClass('c-panel-collapse in')[dimension]('');
            this.transitioning = 0;
            this.$element
                .trigger('shown.collapse');
        };

        if (!$.support.transition) return complete.call(this);

        var scrollSize = $.camelCase(['scroll', dimension].join('-'));

        this.$element
            .one('cTransitionEnd', $.proxy(complete, this))
            .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
    }

    Collapse.prototype.hide = function () {
        if (this.transitioning || !this.$element.hasClass('in')) return;

        var startEvent = $.Event('hide.collapse');
        this.$element.trigger(startEvent);
        if (startEvent.isDefaultPrevented()) return;

        var dimension = this.dimension();

        this.$element[dimension](this.$element[dimension]())[0].offsetHeight;

        this.$element
            .addClass('c-panel-collapsing')
            .removeClass('c-panel-collapse in')
            .attr('aria-expanded', false);

        this.$trigger
            .addClass('c-panel-collapsed')
            .attr('aria-expanded', false);

        this.transitioning = 1;

        var complete = function () {
            this.transitioning = 0;
            this.$element
                .removeClass('c-panel-collapsing')
                .addClass('c-panel-collapse')
                .trigger('hidden.collapse');
        };

        if (!$.support.transition) return complete.call(this);

        this.$element
            [dimension](0)
            .one('cTransitionEnd', $.proxy(complete, this))
            .emulateTransitionEnd(Collapse.TRANSITION_DURATION);
    };

    Collapse.prototype.toggle = function () {
        this[this.$element.hasClass('in') ? 'hide' : 'show']();
    };

    Collapse.prototype.getParent = function () {
        return $(this.options.parent)
            .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
            .each($.proxy(function (i, element) {
                var $element = $(element);
                this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
            }, this))
            .end()
    };

    Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
        var isOpen = $element.hasClass('in');

        $element.attr('aria-expanded', isOpen);
        $trigger
            .toggleClass('c-panel-collapsed', !isOpen)
            .attr('aria-expanded', isOpen)
    };

    function getTargetFromTrigger($trigger) {
        var href;
        var target = $trigger.attr('data-target')
            || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); // strip for ie7

        return $(target);
    }


    // COLLAPSE PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('collapse');
            var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option);

            if (!data && options.toggle && option == 'show') options.toggle = false;
            if (!data) $this.data('collapse', (data = new Collapse(this, options)));
            if (typeof option == 'string') data[option]();
        })
    }

    var old = $.fn.collapse;

    $.fn.collapse             = Plugin;
    $.fn.collapse.Constructor = Collapse;


    // COLLAPSE NO CONFLICT
    // ====================

    $.fn.collapse.noConflict = function () {
        $.fn.collapse = old;
        return this
    };


    // COLLAPSE DATA-API
    // =================

    $(document).on('click.collapse.data-api', '[data-toggle="collapse"]', function (e) {
        var $this   = $(this);

        if (!$this.attr('data-target')) e.preventDefault();

        var $target = getTargetFromTrigger($this);
        var data    = $target.data('collapse');
        var option  = data ? 'toggle' : $.extend({}, $this.data(), { trigger: this });

        Plugin.call($target, option);
    })

}(jQuery);