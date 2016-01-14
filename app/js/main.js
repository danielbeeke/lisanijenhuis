(function() {
    var mobileToggle = document.getElementById('mobile-toggle');
    var overlayBackground = document.getElementById('overlay-background');
    var pageTitleInContent = document.getElementById('page--title-inside-content');
    var menuMain = document.getElementById('menu-main');

    var bottomOfPageTitleInContent;
    if (pageTitleInContent !== null) {
        bottomOfPageTitleInContent = pageTitleInContent.offsetTop + pageTitleInContent.clientHeight - 26;
    }

    menuMain.addEventListener("click", function(e) {
        var currentMenuState = document.body.getAttribute('data-mobile-menu');

        if (currentMenuState == 'collapsed' && e.target == menuMain) {
            scrollTo(document.documentElement, 0, 600);
        }
    }, false);

    function scrollTo(element, to, duration) {
        if (duration <= 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop == to) return;
            scrollTo(element, to, duration - 10);
        }, 10);
    }

    mobileToggle.addEventListener("click", function(e) {
        var currentMenuState = document.body.getAttribute('data-mobile-menu');
        var newMenuState = currentMenuState == 'expanded' ? 'collapsed' : 'expanded';
        document.body.setAttribute('data-mobile-menu', newMenuState);

        if (newMenuState == 'expanded') {
            document.body.setAttribute('data-mobile-header', 'collapsed');
        }
        else if (window.scrollY == 0) {
            overlayBackground.addEventListener("transitionend", expandHeader)
        }

        e.preventDefault();
    }, false);

    function expandHeader(e) {
        document.body.setAttribute('data-mobile-header', 'expanded');
        overlayBackground.removeEventListener("transitionend", expandHeader);
    }

    window.addEventListener('scroll', function (e) {
        var newMenuState = window.scrollY > 0 ? 'collapsed' : 'expanded';
        document.body.setAttribute('data-mobile-header', newMenuState);

        if (pageTitleInContent !== null) {
            var scrollState = window.scrollY > bottomOfPageTitleInContent ? 'below-page-title' : 'above-page-title';
            document.body.setAttribute('data-scroll-header', scrollState);
        }
        });

})();