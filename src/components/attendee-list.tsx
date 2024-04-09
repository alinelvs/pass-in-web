import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'
import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableCell } from './table/table-cell'
import { TableRow } from './table/table-row'
import { ChangeEvent, useState } from 'react'
import { attendees } from '../data/attendees'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList() {
    //o estado do react nada mais é que uma forma de observar, monitorar, assistir a mudança de uma variável
    //em tempo real, toda a vez que essa variável mudar, teremos o valor 
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(attendees.length / 10);

    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
    }

    function goToNextPage() {
        setPage(page === totalPages ? totalPages : page + 1)
    }

    function goPreviousPage() {
        setPage(page == 1 ? page : page - 1)
    }

    function goToLastPage() {
        setPage(totalPages)
    }

    function goToFirstPage() {
        setPage(1)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Lista de Participantes</h1>
                <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
                    <Search className="size-4 text-emerald-300" />
                    <input onChange={onSearchInputChanged} className="flex-1 bg-transparent outline-none border-0 p-0 text-sm" placeholder="Buscar participante..." />
                </div>
                {search}
            </div>
            <Table>
                <thead>
                    <tr className="border-b border-white/10">
                        <TableHeader style={{ width: 48 }}>
                            <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10 checked:bg-orange-400" />
                        </TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participante</TableHeader>
                        <TableHeader> Data da Inscrição</TableHeader>
                        <TableHeader> Data do check-in</TableHeader>
                        <TableHeader></TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {attendees.slice((page - 1) * 10, page * 10).map((attendee, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell style={{ width: 48 }}>
                                    <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10 " />
                                </TableCell>
                                <TableCell>{ attendee.id }</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap">
                                        <span className="font-semibold text-white">{ attendee.name }</span>
                                        <span>{ attendee.email }</span>
                                    </div>
                                </TableCell>
                                <TableCell>{ dayjs().to(attendee.createdAt) }</TableCell>
                                <TableCell>{ dayjs().to(attendee.checkedInAt) }</TableCell>
                                <TableCell style={{ width: 48 }}>
                                    <IconButton transparent>
                                        <MoreHorizontal className="size-4" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <TableCell colSpan={3}>
                        Mostrando { page } de { attendees.length} itens
                        </TableCell>
                        <TableCell className="text-right" colSpan={3}>
                            <div className="inline-flex items-center gap-8">
                                <span>Página { page } de { totalPages }</span>

                                <div className="flex gap-1.5">
                                    <IconButton onClick={goToFirstPage} disabled={page === 1 }>
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goPreviousPage} disabled={page === 1 }>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                                        <ChevronRight className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                                        <ChevronsRight className="size-4" />
                                    </IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </tr>
                </tfoot>
            </Table>
        </div>
    )
}