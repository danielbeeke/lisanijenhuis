(function() {
    var mobileToggle = document.getElementById('mobile-toggle');
    var overlayBackground = document.getElementById('overlay-background');
    var pageTitleInContent = document.getElementById('page--title-inside-content');
    var menuMain = document.getElementById('menu-main');
    var pageContentBody = document.querySelectorAll('.page-content-body')[0];
    var pageContentBodyOffet = pageContentBody.offsetTop;

    var bottomOfPageTitleInContent;
    if (pageTitleInContent !== null) {
        bottomOfPageTitleInContent = pageTitleInContent.offsetTop + pageTitleInContent.clientHeight - 26;
    }

    menuMain.addEventListener('click', function(e) {
        var currentMenuState = document.body.getAttribute('data-mobile-menu');

        if (currentMenuState === 'collapsed' && e.target === menuMain) {
            scrollTo(document.documentElement, 0, 600);
        }
    }, false);

    function scrollTo(element, to, duration) {
        if (duration <= 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            scrollTo(element, to, duration - 10);
        }, 10);
    }

    mobileToggle.addEventListener('click', function(e) {
        var currentMenuState = document.body.getAttribute('data-mobile-menu');
        var newMenuState = currentMenuState === 'expanded' ? 'collapsed' : 'expanded';
        document.body.setAttribute('data-mobile-menu', newMenuState);

        if (newMenuState === 'expanded') {
            document.body.setAttribute('data-mobile-header', 'collapsed');
        }
        else if (window.scrollY === 0) {
            overlayBackground.addEventListener('transitionend', expandHeader);
        }

        e.preventDefault();
    }, false);

    function expandHeader(e) {
        document.body.setAttribute('data-mobile-header', 'expanded');
        overlayBackground.removeEventListener('transitionend', expandHeader);
    }

    window.addEventListener('scroll', function (e) {
        var newMenuState = window.scrollY > 0 ? 'collapsed' : 'expanded';
        document.body.setAttribute('data-mobile-header', newMenuState);

        if (pageTitleInContent !== null) {
            var scrollState = window.scrollY > bottomOfPageTitleInContent ? 'below-page-title' : 'above-page-title';
            document.body.setAttribute('data-scroll-header', scrollState);
        }


        var scrollStatePager = window.scrollY > pageContentBodyOffet ? 'show' : 'hide';
        document.body.setAttribute('data-scroll-pager', scrollStatePager);

    });

    var pswpElement = document.querySelectorAll('.pswp')[0];

    var items = [];

    var paintingsList = document.querySelectorAll('.painting.teaser');
    if (paintingsList.length) {
        var paintings = Array.prototype.slice.call(paintingsList,0);

        paintings.forEach(function (painting, i) {
            items.push({
                src: painting.src,
                w: painting.dataset.width,
                h: painting.dataset.height,
                el: painting
            });

            painting.addEventListener('click', function(e) {
                var options = {
                    index: i,
                    getThumbBoundsFn: function(index) {
                        var thumbnail = items[index].el,
                            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                            rect = thumbnail.getBoundingClientRect();


                        return {
                            x: rect.left,
                            y: rect.top + pageYScroll,
                            w: rect.width,
                            h: rect.height
                        };
                    }
                };

                var gallery = new window.PhotoSwipe( pswpElement, false, items, options);

                gallery.init();
                e.preventDefault();
            }, false);


        });

    }

})();