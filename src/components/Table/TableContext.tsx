import React from "react"

export interface TableOptions {
    filter:{
        selectedFilter:string;
        setFilter:(event: string) => void;
    },
    dialog:{
        open:boolean;
        handleToggle:() => void
    },
    pagination: {
        page: number;
        setPage: (evt: unknown, newPage: number) => void;
        rowsPerPage: number;
        setRowPerPage: (evt: React.ChangeEvent<HTMLInputElement>) => void
    }
}

const createGenericContext = <T extends unknown>() => {
    // Create a context with a generic parameter or undefined
    const genericContext = React.createContext<T | undefined>(undefined)
  
    // Check if the value provided to the context is defined or throw an error
    const useGenericContext = () => {
      const contextIsDefined = React.useContext(genericContext)
      if (!contextIsDefined) {
        throw new Error("useGenericContext must be used within a Provider")
      }
      return contextIsDefined
    }
  
    return [useGenericContext, genericContext.Provider] as const
  }

const [useTableService,TableServiceContextProvider] = createGenericContext<TableOptions>()

interface IProps {}

export const TableContextProvider:React.FC<IProps> = ({children}) => {
    const [input,setInput] = React.useState("")
    const [open,setOpen] = React.useState(false)
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    const handleInputChange = (e:string) => {
        setInput(e)
    }
    const handleToggle = () => {
        setOpen(!open)
    }

    
    return(
        <TableServiceContextProvider
            value={{
                filter:{
                    selectedFilter:input,
                    setFilter:handleInputChange
                },
                dialog:{
                    open,
                    handleToggle
                },
                pagination:{
                    page,
                    rowsPerPage,
                    setPage:handleChangePage,
                    setRowPerPage:handleChangeRowsPerPage
                }
            }}
        >
            {children}
        </TableServiceContextProvider>
    )
}

export default useTableService

export type tableServiceType = ReturnType<typeof useTableService>