(function () {
var player = document.getElementById("movie_player");
if (player) {
    const relativePlaybackRate = (level) => {
        const playbackRate = player.getPlaybackRate();
        if (level == 0) {
            return playbackRate;
        }
        const playbackRates = player.getAvailablePlaybackRates();
        const playbackRateIndex = playbackRates.indexOf(playbackRate);
        let newPlaybackRateIndex = playbackRateIndex + level;
        if (newPlaybackRateIndex < 0) {
            newPlaybackRateIndex = 0;
        } 
        if (newPlaybackRateIndex >= playbackRates.length) {
            newPlaybackRateIndex = playbackRates.length - 1;
        }
        const newPlaybackRate = playbackRates[newPlaybackRateIndex];
        return newPlaybackRate;
    }
    const describePlaybackRate = pr => 'x' + pr;
    const changePlaybackRate = pr => player.setPlaybackRate(pr);
    
    const relativePlaybackQuality = (level) => {
        const playbackQuality = player.getPlaybackQuality();
        if (level == 0) {
            return playbackQuality;
        }
        const playbackQualities = player.getAvailableQualityLevels().reverse();
        const playbackQualityIndex = playbackQualities.indexOf(playbackQuality);
        let newPlaybackQualityIndex = playbackQualityIndex + level;
        if (newPlaybackQualityIndex < 0) {
            newPlaybackQualityIndex = 0;
        } 
        if (newPlaybackQualityIndex >= playbackQualities.length) {
            newPlaybackQualityIndex = playbackQualities.length - 1;
        }
        const newPlaybackQuality = playbackQualities[newPlaybackQualityIndex];
        return newPlaybackQuality;
    }
    const describePlaybackQuality = pr => pr;
    //WARNING setPlaybackQuality does NOT work (11 feb 2018)
    const changePlaybackQuality = pr => player.setPlaybackQuality(pr);

    const show = (msg) => {
        console.log(msg);//TODO
    }

    player.addEventListener("onPlaybackRateChange", e => show(describePlaybackRate(e)));
    player.addEventListener("onPlayerPlaybackQualityChange", e => show(describePlaybackQuality(e)));

    const scrollEnabled = true;//TODO
    if (scrollEnabled) {
        const settingsButton = player.querySelector('.ytp-settings-button');
        settingsButton.addEventListener("wheel", function (e) {
            if (e.deltaX == 0 && e.deltaY == 0) {
                return;
            }
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                changePlaybackRate(relativePlaybackRate(-Math.sign(e.deltaX)));
            } else {
                changePlaybackQuality(relativePlaybackRate(-Math.sign(e.deltaY)));
            }
    
            e.preventDefault();
        });
    }

    const dragEnabled = true;//TODO
    if (dragEnabled) {
        const settingsButton = player.querySelector('.ytp-settings-button');        
        let downCoordinates = null;
        settingsButton.addEventListener("mousedown", function (e) {
            downCoordinates = {
                x: e.clientX,
                y: e.clientY
            }
        });
        document.addEventListener("mousemove", function (e) {
            if (downCoordinates != null) {
                const deltaX = downCoordinates.x - e.clientX;
                const deltaY = downCoordinates.y - e.clientY;
                if (deltaX != 0 || deltaY != 0) {
                    if (Math.abs(deltaX) > Math.abs(deltaY)) {
                        const levelSize = settingsButton.offsetWidth;
                        const level = -Math.round(deltaX / levelSize);
                        show(describePlaybackRate(relativePlaybackRate(level)));
                    } else {
                        const levelSize = settingsButton.offsetHeight;
                        const level = -Math.round(deltaY / levelSize);
                        show(describePlaybackQuality(relativePlaybackQuality(level)));
                    }
                }
            }
        });
        document.addEventListener("mouseup", function (e) {
            if (downCoordinates != null) {
                const deltaX = downCoordinates.x - e.clientX;
                const deltaY = downCoordinates.y - e.clientY;
                if (deltaX != 0 || deltaY != 0) {
                    if (Math.abs(deltaX) > Math.abs(deltaY)) {
                        const levelSize = settingsButton.offsetWidth;
                        const level = -Math.round(deltaX / levelSize);
                        changePlaybackRate(relativePlaybackRate(level));
                    } else {
                        const levelSize = settingsButton.offsetHeight;
                        const level = -Math.round(deltaY / levelSize);
                        changePlaybackQuality(relativePlaybackQuality(level));
                    }
                }
            }
            downCoordinates = null;
        });
    }
}
}());
