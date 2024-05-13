import { useIdleTimer } from 'react-idle-timer';
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie'
const timeout = 10000 //Activity Timeout in milliseconds.
function SesionExpired(){

    const cookies = new Cookies ();
    const onIdle = () => {
        cookies.remove( "email", {path : "/"})
        window. location.hash = "/login"
        Swal. fire({
            title: "La sesión expiró por inactividad. Inicie sesión de nuevo.", 
            icon: "info"
        })
    }
    // eslint-disable-next-line no-unused-vars
    const getRemainingTime = useIdleTimer({
        onIdle,
        timeout,
        throttle: 1000
    })
    return (
        <div>
        </div>
    )
}
export default SesionExpired;