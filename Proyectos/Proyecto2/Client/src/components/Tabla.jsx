import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from "react";
import Service from '../Service/Service';
const Tabla = () => {
    const columnHelper = createColumnHelper();
    const [data, setData] = useState([]);

    useEffect(() => {
        Service.getData()
        .then((res) => {
            console.log(res);
            setData(res);
        })
    }, [])
    const columns = [
        columnHelper.accessor('', {
            id: "S.No",
            cell: (info) => <span>{info.row.index +1}</span>,
            header: 'No',
        }),
        columnHelper.accessor('carnet', {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'Carnet',
        }),
        columnHelper.accessor('nombre', {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'Nombre',
        }),
        columnHelper.accessor('curso', {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'Curso',
        }),
        columnHelper.accessor('nota', {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'Nota',
        }),
        columnHelper.accessor('semestre', {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'Semestre',
        }),
        columnHelper.accessor('year', {
            cell: (info) => <span>{info.getValue()}</span>,
            header: 'Año',
        }),
    ]

    

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel:getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    return (
        
        <div className="p-2 max-w-5xl mx-auto text-white fill-gray-400">
            <table className='border border-gray-700 w-full text-left'>
                <thead className='bg-blue-700'>
                    {
                        table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {
                                    headerGroup.headers.map((header) => (
                                        <th key={header.id} className='capitalize px-10 py-2'>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row,i)=>(
                                <tr key={row.id} className={`
                                ${i % 2 === 0 ? 'bg-gray-800 border-gray-800' : 'bg-gray-700 border-gray-700'} text-center border-t-8 border-b-8
                                `}>
                                    {
                                        row.getVisibleCells().map((cell)=>(
                                            <td key={cell.id} classNAme="px-3.5 py-2 text-center">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        ) : null
                    }
                </tbody>
            </table>
            {/* Pagination */}
            <div className='flex items-center justify-end mt-2 gap-2'>
                <button 
                    onClick={() => {
                        table.previousPage();
                    }}

                    disabled={!table.getCanPreviousPage()}
                    className='p-1 border border-gray-300 px-2  disabled:opacity-30'
                >
                    {'<'}
                </button>
                <button 
                    onClick={() => {
                        table.nextPage();
                    }}

                    disabled={!table.getCanNextPage()}
                    className='p-1 border border-gray-300 px-2  disabled:opacity-30'
                >
                    {'>'}
                </button>
                <span className='flex items-center gap-1'>
                    <div>Página</div>
                    <strong>{table.getState().pagination.pageIndex + 1} de{" "} {table.getPageCount()}</strong>
                </span>
            </div>
        </div>
    )
}

export default Tabla;