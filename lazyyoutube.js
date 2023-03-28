(function (window, undefined) {

    /**

    Initializes lazy loading for YouTube videos.
    @function
    @name initialize
    @description
    This function selects all elements with class 'youtube-player' and 'video-hero-container', adds a click event listener to each element, and assigns a value of 'true' to its dataset property 'clickHandler'.
    When the element is clicked, it triggers the 'triggerVideoPlayer' function to replace the element with a player container and load the YouTube API script, allowing for lazy loading of YouTube videos.
    */
    function initialize() {

        let n,
            v = document.querySelectorAll(".youtube-player, .video-hero-container");

        for (n = 0; n < v.length; n++) {

            if (!v[n].dataset.clickHandler || v[n].dataset.clickHandler !== "true") {

                v[n].dataset.clickHandler = "true";

                v[n].addEventListener("click", triggerVideoPlayer);

            }

        }

    }

    /**
     * Trigger YouTube video player with lazy loading and responsive dimensions
     * @function
     * @param {Object} e - Event object
     * @returns {boolean} - Returns false to prevent default event behavior
     */
    function triggerVideoPlayer(e) {

        e.preventDefault();

        let videoId = e.currentTarget.dataset.id;

        // load YouTube API script
        let tag = document.createElement('script');

        tag.src = 'https://www.youtube.com/iframe_api';

        let firstScriptTag = document.getElementsByTagName('script')[0];

        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // create container element for player
        let playerContainer = document.createElement('div');

        playerContainer.className = 'player-container';
        e.currentTarget.parentNode.replaceChild(playerContainer, e.currentTarget);

        // get dimensions of the container
        let containerWidth = playerContainer.offsetWidth;
        let containerHeight = containerWidth * 0.5625; // 9/16

        // initialize player
        let player;


        window.onYouTubeIframeAPIReady = function () {

            player = new YT.Player(playerContainer, {
                height: containerHeight,
                width: containerWidth,
                videoId: videoId,
                events: {
                    'onReady': onPlayerReady
                }
            });

        }

        // start playing when player is ready
        function onPlayerReady(event) {
            event.target.playVideo();
        }

        return false;

    }

    initialize();

    window.lazyYT = {
        initialize: initialize
    };


})(window);
