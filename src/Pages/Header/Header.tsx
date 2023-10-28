import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Header.module.scss'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import { Popup } from 'semantic-ui-react'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind';

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.linksContainer}>
                <Popup content='Source code'
                    trigger={
                        <a href='https://github.com/zzergy/pixel-craft-studio' className={styles.link}>
                            <FontAwesomeIcon icon={faCodeBranch} className={styles.small} />
                        </a>
                    }
                    position='bottom right'
                    size='small'
                    // offset={[8, 0]}
                    style={{ padding: '4px 6px' }}
                />

                <Popup content='GitHub Account 👩‍💻'
                    trigger={
                        <a href='https://github.com/zzergy' className={styles.link}>
                            <FontAwesomeIcon icon={faGithubAlt} className={styles.medium} />
                        </a>
                    }
                    position='bottom right'
                    size='small'
                    offset={[8, 0]}
                    style={{ padding: '4px 6px' }}
                />
            </div>
        </div>
    )
}

export default Header