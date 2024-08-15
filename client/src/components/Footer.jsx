import githubLogo from '../../../assets/images/github-icon-grey.webp';

const Footer = () => {
    return (
      <div className='App-footer'>
        <h2 className="FooterName">Dogalogue</h2>
        <div className="centered-divs">
        <div className="leftFooterBorder">
            <a href='https://github.com/emulcahey' target="_blank">
                <img className="footerIcon" src={githubLogo} alt="github icon" />
            </a>
            <div>
                Dia Jubara
            </div>
        </div>
        <div className="leftFooterBorder">
            <a href='https://github.com/emulcahey' target="_blank">
                <img className="footerIcon" src={githubLogo} alt="github icon" />
            </a>
            <div>
                Alex Engelsgjerd            
            </div>
        </div>
        <div className="leftFooterBorder">
            <a href='https://github.com/emulcahey' target="_blank">
                <img className="footerIcon" src={githubLogo} alt="github icon" />
            </a>
            <div>
                Davison Hernandez            
            </div>
        </div>
        <div className="leftFooterBorder">
            <a href='https://github.com/emulcahey' target="_blank">
                <img className="footerIcon" src={githubLogo} alt="github icon" />
            </a>
            <div>
                Cole Patterson            
            </div>
        </div>
        <div className="leftFooterBorder right-item-margin">
            <a href='https://github.com/emulcahey' target="_blank">
                <img className="footerIcon" src={githubLogo} alt="github icon" />
            </a>
            <div>
                Erin Mulcahey            
            </div>
        </div>
        </div>
    </div>
    );
  };
  
export default Footer;