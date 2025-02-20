import { ComponentProps } from "react";

interface ITableHeader extends ComponentProps<'th'> {}


export function TableHeader(props: ITableHeader) {
    return (
        <th 
            {...props}
            className="py-3 px-4 text-sm font-semibold text-left" 
        />
    )
}