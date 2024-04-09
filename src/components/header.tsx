import UniteIcon from "../assets/unite-icon.svg"
import { NavLink } from "./nav-link"

export function Header() {
    return (
        <div className="flex items-center gap-5">
            <img src={UniteIcon} />
            <nav className="flex items-center gap-5 py-2">
                <NavLink href="/eventos">Eventos</NavLink>
                <NavLink href="/participantes">Participantes</NavLink>
                <NavLink href="/link3">Link 3</NavLink>              
            </nav>           
        </div>
    )
}