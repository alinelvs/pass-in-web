import { ComponentProps } from "react";

interface INavLink extends ComponentProps<'a'> {
    children: string;
}


export function NavLink(props: INavLink) {
    return(
        <a {...props} className="font-medium text-sm">
            { props.children }
        </a>
    )
}