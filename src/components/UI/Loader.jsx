import { BallTriangle } from 'react-loader-spinner';

export default function Loader() {
    return (
        <div style={styles.overlay}>
            <BallTriangle
                height={80}
                width={80}
                color="blue"
                ariaLabel="ball-triangle-loading"
            />
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
    },
}
