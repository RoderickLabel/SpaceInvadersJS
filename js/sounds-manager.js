/**
 * @author Rodrigo Ruotolo Barbosa <roderickruotolo@gmail.com>
 */
var SoundsManager = {
    sounds : {
        shoot : "shoot.wav",
        explosion : "explosion.wav",
        ufoLowpitch : "ufo_lowpitch.wav",
        ufoHighpitch : "ufo_highpitch.wav",
        fastInvader1 : "fastinvader1.wav",
        fastInvader2 : "fastinvader2.wav",
        fastInvader3 : "fastinvader3.wav",
        fastInvader4 : "fastinvader4.wav",
        invaderKilled : "invaderkilled.wav"
    },
    loadSounds : function () {
        for (soundId in this.sounds) {
            createjs.Sound.registerSound('sounds/' + this.sounds[soundId], soundId);
        }
    },
    playSound: function (soundId) {
        createjs.Sound.play(soundId);
    },
    backgroundSounds: [
        'fastInvader4',
        'fastInvader1',
        'fastInvader2',
        'fastInvader3'
    ],
    currentSoundTrack : 0,
    nexSoundTrack : function () {
        if (this.currentSoundTrack >= this.backgroundSounds.length - 1) {
            this.currentSoundTrack = 0; 
        } else {
            this.currentSoundTrack++;
        }
    },
    playSoundTrack : function () {
        console.log(this.backgroundSounds[this.currentSoundTrack]);
        this.playSound(this.backgroundSounds[this.currentSoundTrack]);
        this.nexSoundTrack();
    }
};