import React from 'react';
import { NavLink } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__row">
                <div className="footer__current-song">
                    <div className="footer_current-song-image">
                        <img src="resources/common.blocks/footer/current-song-image.png" alt="song-img"/>
                    </div>
                    <div className="footer__current-song-desc">
                        <div className="footer__current-song-name">Role Model</div>
                        <div className="footer__current-song-author">daysormay, Tessa Violet</div> 
                    </div>                         
                </div>
                <div className="footer__player">
                    <div className="footer__control">
                        <div className="footer__prev-song">
                            <div className="footer__prev-song-image">
                                <img src="resources/common.blocks/footer/prev-song-image.png" alt="prev-song-img"/>
                            </div>
                        </div>
                        <div className="footer__pause">
                            <div className="footer__pause-image">
                                <img src="resources/common.blocks/footer/pause-image.png" alt="pause-img"/>
                            </div>
                        </div>
                        <div className="footer__next-song">
                            <div className="footer__next-song-image">
                                <img src="resources/common.blocks/footer/next-song-image.png" alt="next-song-img"/>
                            </div>
                        </div>
                    </div>
                    <div className="footer__progress">
                        <div className="footer__timer">0:14</div>
                        <div className="footer__music-bar">
                            <div className="footer__music-bar-image">
                                <img src="resources/common.blocks/footer/music-bar-image.png" alt="music-bar-img"/>
                            </div>
                        </div>
                        <div className="footer__timer">6:54</div>
                    </div>
                </div>
                <div className="footer__volume">
                    <div className="footer__volume-image">
                        <img src="resources/common.blocks/footer/volume-image.png" alt="volume-img"/>
                    </div>
                    <div className="footer__volume-bar-image">
                        <img src="resources/common.blocks/footer/volume-bar-image.png" alt="volume-bar-img"/>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;