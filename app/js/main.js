(function() {
    var mobileToggle = document.getElementById('mobile-toggle');
    var overlayBackground = document.getElementById('overlay-background');
    var pageTitleInContent = document.getElementById('page--title-inside-content');
    var bottomOfPageTitleInContent = pageTitleInContent.offsetTop + pageTitleInContent.clientHeight - 76;

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

        var scrollState = window.scrollY > bottomOfPageTitleInContent ? 'below-page-title' : 'above-page-title';
        document.body.setAttribute('data-scroll-header', scrollState);
    });

})();