import React, {FC, useState, useMemo} from "react";
import {Pagination,Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";

interface Props {    
   rows:any[];
   columns:any[];
   title:string;
   headerComponent?: React.ReactNode | React.ReactNode[];
   pagination?:Boolean;
   totalRows?:any;
   pagePagination?:number;   
   onChangePage?:any;
   onChangeRowPerPage?:any;
   onSortPagination?:any;   
}

const TableUI: FC<Props>=({rows,columns,title,headerComponent,pagination,totalRows,pagePagination,onChangePage,onChangeRowPerPage,onSortPagination})=> {       
    const [page, setPage] = useState<any>(pagination?pagePagination:1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const pages = pagination?Math.ceil(totalRows / rowsPerPage):Math.ceil(rows.length / rowsPerPage);
  
    const items:any = useMemo(() => {
        if(!pagination){
            const start = (page - 1) * rowsPerPage;
            const end = start + rowsPerPage;    
            return rows.slice(start, end);
        }
    }, [page, rows,rowsPerPage]);

    const getValue=(row:any,keyColumn:any)=>{
        const column=columns.filter((col:any)=>col.name===keyColumn)[0]    
        if(column.format)        
            return column.format(row)
        else
            return column.selector(row)
    }
    const onRowsPerPageChange = React.useCallback((e:any) => {
        const rpp=Number(e.target.value)
        setRowsPerPage(rpp);
        setPage(1);
        if(pagination){
            onChangeRowPerPage(rpp)
        }
    }, []);
    const onChange = (page:number) => {
        setPage(page)
        if(pagination){
            onChangePage(page)
        }
    }
    const onSort=(sortDescriptor:any)=>{                
        if(onSortPagination){
            onSortPagination(sortDescriptor)
        }
    }
    return (
        <div className="my-10">
            <h1 className="text-inherit font-bold">{title}</h1>
            {            
                <Table 
                removeWrapper 
                aria-label="dynamic table"
                topContentPlacement="inside"
                onSortChange={onSort}     
                topContent={
                    <div className="relative flex justify-between items-end">                        
                        {headerComponent}
                    </div>                      
                }
                bottomContent={
                    <div className="flex w-full items-center justify-center gap-3">                        
                        <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        onChange={onRowsPerPageChange}
                        >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        </select>
                    </label>                   
                        <span className="text-default-400 text-small">Total: {pagination?totalRows:rows.length}</span>                        
                        <Pagination                        
                        variant="light"
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={pages}
                        onChange={onChange}
                        />
                    </div>
                }
                >
                <TableHeader>
                    {columns.map((column:any) =>
                        <TableColumn key={column.name} allowsSorting={column.sortable}>{column.name}</TableColumn>
                    )}
                </TableHeader>
                <TableBody 
                emptyContent={"No rows to display."}
                >
                    {pagination?
                    rows.map((row:any,index:number)=>(
                        <TableRow key={index}>
                            {(columnKey) => 
                                <TableCell>{getValue(row,columnKey)}</TableCell>
                            }
                        </TableRow>
                    )):
                    items.map((row:any,index:number)=>(
                        <TableRow key={index}>
                            {(columnKey) => 
                                <TableCell>{getValue(row,columnKey)}</TableCell>
                            }
                        </TableRow>
                    ))
                    }                
                </TableBody>
                </Table>               
            }
        </div>
    );
}

export default TableUI;
